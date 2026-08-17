"use server"

import {db} from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";


export async function createLinkByUser(data:LinkFormData){
    const user=await currentUser();
    if(!user) return {success:false,error:"No authenticated user founde"}
    const link=await db.link.create({
        data:{
            title:data.title,
            url:data.url,
            description:data.description,
            clickCount:0,
            user:{
                connect:{
                    clerkId:user.id
                }
            }
        }
    })
    return{
        success:true,
        message:"Link created successfully",
        data:link
    }
}