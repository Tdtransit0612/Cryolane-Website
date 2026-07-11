/**
 * Loader-per-view data module for the portals. Every loader returns a
 * resilient envelope: if a view is missing (portal migration not yet run in
 * the TMS Supabase project) or errors, pages render a "not provisioned yet"
 * notice instead of crashing.
 */
import { createClient } from '@/lib/supabase/server'
import type {
  PortalProfile,
  CarrierAccount,
  CarrierLoad,
  CarrierSettlement,
  ShipperAccount,
  ShipperLoad,
  ShipperInvoice,
} from './types'

export type Loaded<T> = { data: T; ready: boolean; error: string | null }

function ok<T>(data: T): Loaded<T> {
  return { data, ready: true, error: null }
}
function fail<T>(data: T, error: string | null): Loaded<T> {
  return { data, ready: false, error }
}

async function loadList<T>(view: string, order: string, ascending = false): Promise<Loaded<T[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from(view)
      .select('*')
      .order(order, { ascending, nullsFirst: false })
      .limit(500)
    if (error) return fail([], error.message)
    return ok((data as T[]) ?? [])
  } catch (e) {
    return fail([], e instanceof Error ? e.message : 'unknown error')
  }
}

async function loadOne<T>(view: string): Promise<Loaded<T | null>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from(view).select('*').maybeSingle()
    if (error) return fail(null, error.message)
    return ok((data as T) ?? null)
  } catch (e) {
    return fail(null, e instanceof Error ? e.message : 'unknown error')
  }
}

/** Own profile row (profiles RLS allows id = auth.uid()). */
export async function getPortalProfile(): Promise<Loaded<PortalProfile | null>> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return ok(null)
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, role, carrier_id, customer_id')
      .eq('id', user.id)
      .maybeSingle()
    if (error) {
      // ONLY the "undefined column" error (42703 — link columns don't exist
      // because the portal migration hasn't run) justifies the reduced retry.
      // Any other error (transient/network/RLS) must surface, not silently null
      // the link columns and misroute a real linked user to /portal/no-access.
      if (error.code !== '42703') return fail(null, error.message)
      const { data: basic, error: basicError } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', user.id)
        .maybeSingle()
      if (basicError) return fail(null, basicError.message)
      return ok(basic ? { ...basic, carrier_id: null, customer_id: null } : null)
    }
    return ok((data as PortalProfile) ?? null)
  } catch (e) {
    return fail(null, e instanceof Error ? e.message : 'unknown error')
  }
}

export const getCarrierAccount = () => loadOne<CarrierAccount>('portal_carrier_account')
export const getCarrierLoads = () => loadList<CarrierLoad>('portal_carrier_loads', 'pickup_date')
export const getCarrierSettlements = () => loadList<CarrierSettlement>('portal_carrier_settlements', 'created_at')
export const getShipperAccount = () => loadOne<ShipperAccount>('portal_shipper_account')
export const getShipperLoads = () => loadList<ShipperLoad>('portal_shipper_loads', 'pickup_date')
export const getShipperInvoices = () => loadList<ShipperInvoice>('portal_shipper_invoices', 'created_at')
