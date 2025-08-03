'use client'

import { useState, useEffect } from 'react'
import { useUser, UserButton } from '@clerk/nextjs'
import { Calendar, Users, TrendingUp, Settings } from 'lucide-react'
import { supabase, Event, TierType, canAccessTier } from '@/lib/supabase'
import { capitalizeFirst } from '@/lib/utils'
import EventCard from '@/components/EventCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import TierUpgrade from '@/components/TierUpgrade'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userTier, setUserTier] = useState<TierType>('free')
  const [showUpgrade, setShowUpgrade] = useState(false)

  // Get user tier from Clerk metadata
  useEffect(() => {
    if (user?.publicMetadata?.tier) {
      setUserTier(user.publicMetadata.tier as TierType)
    }
  }, [user])

  // Fetch events from Supabase
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error: supabaseError } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
      
      if (supabaseError) throw supabaseError
      
      setEvents(data || [])
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleTierUpdate = (newTier: TierType) => {
    setUserTier(newTier)
    setShowUpgrade(false)
  }

  const handleUpgradeClick = () => {
    setShowUpgrade(true)
  }

  // Filter events based on user tier
  const accessibleEvents = events.filter(event => canAccessTier(userTier, event.tier))
  const restrictedEvents = events.filter(event => !canAccessTier(userTier, event.tier))

  // Stats
  const stats = {
    totalEvents: events.length,
    accessibleEvents: accessibleEvents.length,
    restrictedEvents: restrictedEvents.length,
    upcomingEvents: accessibleEvents.filter(event => new Date(event.event_date) > new Date()).length
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {user?.firstName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Your tier:</span>
                <span className={`tier-badge ${userTier === 'free' ? 'tier-free' : userTier === 'silver' ? 'tier-silver' : userTier === 'gold' ? 'tier-gold' : 'tier-platinum'}`}>
                  {capitalizeFirst(userTier)}
                </span>
              </div>
              <button
                onClick={() => setShowUpgrade(!showUpgrade)}
                className="btn-secondary text-sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Tier
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accessible</p>
                <p className="text-2xl font-bold text-gray-900">{stats.accessibleEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Restricted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.restrictedEvents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Upgrade Section */}
        {showUpgrade && (
          <div className="mb-8">
            <TierUpgrade 
              currentTier={userTier} 
              onTierUpdate={handleTierUpdate}
            />
          </div>
        )}

        {/* Events Section */}
        <div className="space-y-8">
          {/* Accessible Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Events ({accessibleEvents.length})
              </h2>
              {restrictedEvents.length > 0 && (
                <button
                  onClick={handleUpgradeClick}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Unlock {restrictedEvents.length} more events →
                </button>
              )}
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchEvents} />
            ) : accessibleEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No accessible events found
                </h3>
                <p className="text-gray-600">
                  Check back later for new events or upgrade your tier for more access.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    userTier={userTier}
                    onUpgrade={handleUpgradeClick}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Restricted Events */}
          {restrictedEvents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Premium Events ({restrictedEvents.length})
                </h2>
                <p className="text-sm text-gray-600">
                  Upgrade your tier to access these exclusive events
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restrictedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    userTier={userTier}
                    onUpgrade={handleUpgradeClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}