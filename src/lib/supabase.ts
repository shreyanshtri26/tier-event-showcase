import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export type TierType = 'free' | 'silver' | 'gold' | 'platinum'

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string
  tier: TierType
  created_at: string
  updated_at: string
}

// Utility functions
export const getTierHierarchy = (): Record<TierType, number> => ({
  free: 1,
  silver: 2,
  gold: 3,
  platinum: 4
})

export const getTierColor = (tier: TierType): string => {
  const colors: Record<TierType, string> = {
    free: 'tier-free',
    silver: 'tier-silver',
    gold: 'tier-gold',
    platinum: 'tier-platinum'
  }
  return colors[tier]
}

export const canAccessTier = (userTier: TierType, eventTier: TierType): boolean => {
  const hierarchy = getTierHierarchy()
  return hierarchy[userTier] >= hierarchy[eventTier]
}