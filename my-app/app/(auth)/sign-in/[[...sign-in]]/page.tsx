import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='flex items-center justify-center min-h-screen dark:bg-neutral-800
    text-neutral-900 dark:text-neutral-100'>
      <h1 className='text-2xl font-bold mb-6'>Welcome to TreeBio</h1>
      <p className='text-lg mb-4 font-semibold text-gray-500'>Please sign in to continue if u dont have an account 
        ,you can create one</p>
        <div className='mb-6'>
            <SignIn/>
        </div>
    </div>
  )
}