/**
 * Row types for the portal_* views in the Cryolane TMS Supabase project
 * (cryolane-tms/supabase/migrations/20260710_10_portal.sql). Hand-maintained;
 * columns deliberately EXCLUDED by the views (customer rates & identity on
 * carrier views, carrier cost on shipper views, margin, banking/factoring,
 * credit_limit) must never be added here.
 */

export type PortalRole = 'carrier' | 'shipper'

export type PortalProfile = {
  id: string
  email: string | null
  full_name: string | null
  role: string
  carrier_id: string | null
  customer_id: string | null
}

export type CarrierAccount = {
  id: string
  name: string
  mc_number: string | null
  dot_number: string | null
  status: string
  authority_status: string
  insurance_provider: string | null
  insurance_expiry: string | null
  cargo_insurance_amount: number | null
  auto_liability_amount: number | null
  w9_on_file: boolean
  payment_terms: string | null
}

export type CarrierLoad = {
  id: string
  load_number: string
  status: string
  pickup_city: string | null
  pickup_state: string | null
  pickup_date: string | null
  shipper_name: string | null
  shipper_address: string | null
  delivery_city: string | null
  delivery_state: string | null
  delivery_date: string | null
  consignee_name: string | null
  consignee_address: string | null
  commodity: string | null
  weight: number | null
  temperature: string | null
  equipment_type: string | null
  miles: number | null
  po_number: string | null
  bol_number: string | null
  ref_number: string | null
  carrier_rate: number
  created_at: string
}

export type CarrierSettlement = {
  id: string
  settlement_number: string
  status: string
  gross: number
  deductions: number
  net: number
  quick_pay: boolean
  quick_pay_fee: number | null
  paid_date: string | null
  payment_reference: string | null
  load_ids: string[]
  created_at: string
}

export type ShipperAccount = {
  id: string
  name: string
  payment_terms: string | null
  billing_email: string | null
}

export type ShipperLoad = {
  id: string
  load_number: string
  status: string
  pickup_city: string | null
  pickup_state: string | null
  pickup_date: string | null
  shipper_name: string | null
  delivery_city: string | null
  delivery_state: string | null
  delivery_date: string | null
  consignee_name: string | null
  commodity: string | null
  weight: number | null
  temperature: string | null
  equipment_type: string | null
  po_number: string | null
  ref_number: string | null
  carrier_name: string | null
  total_rate: number
  tracking_token: string | null
  created_at: string
}

export type ShipperInvoice = {
  id: string
  invoice_number: string
  load_id: string | null
  amount: number
  amount_paid: number
  status: string
  due_date: string | null
  sent_date: string | null
  paid_date: string | null
  created_at: string
}
