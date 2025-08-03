import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your tier-based events
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden'
              }
            }}
          />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            New to EventTier?{' '}
            <a href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}