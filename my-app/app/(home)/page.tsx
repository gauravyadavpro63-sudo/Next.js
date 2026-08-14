import React from "react"
import { auth } from '@clerk/nextjs/server'

async function HomePage(){
    await auth.protect()
    return(
        <>
        <div>HomePage</div>
        </>
    )
}

export default HomePage