'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Crown, Star, Shield, Check } from 'lucide-react'
import { TierType } from '@/lib/supabase'
import { capitalizeFirst } from '@/lib/utils'

interface TierUpgradeProps {
  currentTier: TierType
  onTierUpdate: (newTier: TierType) => void
}

const tierInfo = {
  free: {
    icon: Shield,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    features: ['Community events', 'Basic workshops', 'Monthly newsletters']
  },
  silver: {
    icon: Shield,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100',
    features: ['All Free features', 'Advanced workshops', 'Networking events', 'Priority support']
  },
  gold: {
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    features: ['All Silver features', 'Masterclasses', 'VIP networking', 'Expert consultations']
  },
  platinum: {
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    features: ['All Gold features', 'Exclusive galas', 'CEO roundtables', 'Personal concierge']
  }
}

export default function TierUpgrade({ currentTier, onTierUpdate }: TierUpgradeProps) {
  const { user } = useUser()
  const [upgrading, setUpgrading] = useState<TierType | null>(null)

  const handleUpgrade = async (newTier: TierType) => {
    if (!user) return
    
    setUpgrading(newTier)
    
    try {
      // Update user metadata with new tier
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          tier: newTier
        }
      })
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      onTierUpdate(newTier)
      
      // Show success message
      alert(`Successfully upgraded to ${capitalizeFirst(newTier)} tier!`)
    } catch (error) {
      console.error('Error upgrading tier:', error)
      alert('Failed to upgrade tier. Please try again.')
    } finally {
      setUpgrading(null)
    }
  }

  const tiers: TierType[] = ['free', 'silver', 'gold', 'platinum']
  const currentTierIndex = tiers.indexOf(currentTier)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Upgrade Your Tier
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((tier, index) => {
          const info = tierInfo[tier]
          const Icon = info.icon
          const isCurrent = tier === currentTier
          const canUpgrade = index > currentTierIndex
          const isUpgrading = upgrading === tier
          
          return (
            <div 
              key={tier}
              className={`
                relative border-2 rounded-lg p-4 transition-all duration-200
                ${isCurrent 
                  ? 'border-blue-500 bg-blue-50' 
                  : canUpgrade 
                    ? 'border-gray-200 hover:border-gray-300 cursor-pointer' 
                    : 'border-gray-100 opacity-50'
                }
              `}
            >
              {isCurrent && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Current
                </div>
              )}
              
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${info.bgColor} mb-3`}>
                  <Icon className={`h-6 w-6 ${info.color}`} />
                </div>
                <h4 className="font-semibold text-lg text-gray-900">
                  {capitalizeFirst(tier)}
                </h4>
              </div>
              
              <ul className="space-y-2 mb-4">
                {info.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {canUpgrade && (
                <button
                  onClick={() => handleUpgrade(tier)}
                  disabled={isUpgrading}
                  className={`
                    w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200
                    ${isUpgrading 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                  `}
                >
                  {isUpgrading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Upgrading...</span>
                    </div>
                  ) : (
                    `Upgrade to ${capitalizeFirst(tier)}`
                  )}
                </button>
              )}
              
              {isCurrent && (
                <div className="text-center text-blue-600 font-medium">
                  Your Current Tier
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
