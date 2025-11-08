import Link from 'next/link'

 const HomePage =()=> {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to LMS & ERP System
        </h1>
        <p className="text-gray-600 mb-8">
          Integrated Learning Management and Enterprise Resource Planning Solution
        </p>
        <div className="space-x-4">
          <Link 
            href="/login" 
            className="border text-black px-6 py-3 rounded-lg hover:bg-primary-50 shadow-lg"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="border text-black px-6 py-3 rounded-lg hover:bg-primary-50 shadow-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage