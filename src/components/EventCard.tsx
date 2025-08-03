'use client'

import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { Event, TierType, getTierColor, canAccessTier } from '@/lib/supabase'
import { formatDate, getRelativeTime, capitalizeFirst } from '@/lib/utils'

interface EventCardProps {
  event: Event
  userTier: TierType
  onUpgrade?: () => void
}

export default function EventCard({ event, userTier, onUpgrade }: EventCardProps) {
  const canAccess = canAccessTier(userTier, event.tier)
  
  const handleUpgradeClick = () => {
    if (onUpgrade) {
      onUpgrade()
    }
  }

  return (
    <div className={`card ${!canAccess ? 'opacity-75' : ''}`}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image_url}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Tier Badge */}
        <div className="absolute top-4 right-4">
          <span className={`tier-badge ${getTierColor(event.tier)}`}>
            {capitalizeFirst(event.tier)}
          </span>
        </div>
        
        {/* Lock overlay for inaccessible events */}
        {!canAccess && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm font-medium">
                Upgrade to {capitalizeFirst(event.tier)} to access
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
            {event.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        {/* Date and Time */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{getRelativeTime(event.event_date)}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          {canAccess ? (
            <button 
              className="btn-primary w-full"
              onClick={() => {
                // In a real app, this would navigate to event details or registration
                alert(`You can access this ${event.tier} tier event!`)
              }}
            >
              View Event Details
            </button>
          ) : (
            <button 
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              onClick={handleUpgradeClick}
            >
              Upgrade to {capitalizeFirst(event.tier)}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}