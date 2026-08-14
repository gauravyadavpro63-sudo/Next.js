import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  // Redirects to the sign-in route if the user is not signed in
  await auth.protect()

  return <h1>Hello world</h1>
}