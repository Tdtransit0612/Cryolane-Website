/**
 * Icon set for the site, adapted from lucide-react with brand-consistent
 * defaults (1.8 stroke). Named exports keep call sites decoupled from the
 * icon library.
 */
import {
  Thermometer,
  ShieldCheck,
  Radar,
  Headset,
  Leaf,
  Snowflake,
  Milk,
  Package,
  FlaskConical,
  Layers,
  Check,
  Truck,
  type LucideProps,
} from 'lucide-react'

type IconProps = { size?: number }

function withDefaults(Icon: React.ComponentType<LucideProps>, defaultSize: number) {
  function BrandIcon({ size = defaultSize }: IconProps) {
    return <Icon size={size} strokeWidth={1.8} aria-hidden />
  }
  BrandIcon.displayName = `Brand(${Icon.displayName ?? Icon.name ?? 'Icon'})`
  return BrandIcon
}

export const IconThermometer = withDefaults(Thermometer, 22)
export const IconShieldCheck = withDefaults(ShieldCheck, 22)
export const IconRadar = withDefaults(Radar, 22)
export const IconHeadset = withDefaults(Headset, 22)
export const IconLeaf = withDefaults(Leaf, 22)
export const IconSnow = withDefaults(Snowflake, 22)
export const IconMilk = withDefaults(Milk, 22)
export const IconBox = withDefaults(Package, 22)
export const IconFlask = withDefaults(FlaskConical, 22)
export const IconLayers = withDefaults(Layers, 22)
export const IconTruck = withDefaults(Truck, 22)
export const IconCheck = ({ size = 16 }: IconProps) => (
  <Check size={size} strokeWidth={2.4} aria-hidden />
)
