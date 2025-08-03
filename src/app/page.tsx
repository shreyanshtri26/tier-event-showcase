import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { ArrowRight, Calendar, Shield, Star, Crown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">EventTier</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn-primary">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="btn-secondary">
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Exclusive Events Based on
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Your Tier
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover premium events tailored to your membership level. From free community meetups to platinum exclusive galas.
          </p>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-3 inline-flex items-center space-x-2">
              <span>View Events</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </SignedIn>
        </div>

        {/* Tier Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-gray-600" />
              <h3 className="text-lg font-semibold">Free</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Access to community events and basic workshops
            </p>
            <div className="tier-badge tier-free mt-4">
              Free Tier
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-slate-600" />
              <h3 className="text-lg font-semibold">Silver</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Advanced workshops and networking events
            </p>
            <div className="tier-badge tier-silver mt-4">
              Silver Tier
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="h-8 w-8 text-yellow-600" />
              <h3 className="text-lg font-semibold">Gold</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Masterclasses and VIP networking opportunities
            </p>
            <div className="tier-badge tier-gold mt-4">
              Gold Tier
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="h-8 w-8 text-purple-600" />
              <h3 className="text-lg font-semibold">Platinum</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Exclusive galas and CEO roundtables
            </p>
            <div className="tier-badge tier-platinum mt-4">
              Platinum Tier
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose EventTier?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Tier-Based Access</h4>
              <p className="text-gray-600">
                Events curated specifically for your membership level
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Quality Events</h4>
              <p className="text-gray-600">
                Premium events with industry leaders and experts
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Exclusive Access</h4>
              <p className="text-gray-600">
                Higher tiers unlock more exclusive and valuable events
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}