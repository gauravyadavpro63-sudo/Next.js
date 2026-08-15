import React from "react"
import { auth } from '@clerk/nextjs/server'
import onBoardUser from "../modules/auth/actions"

async function HomePage(){
    await auth.protect()
    await onBoardUser()
    return(
        <>
        <div>HomePage</div>
        </>
    )
}

export default HomePage