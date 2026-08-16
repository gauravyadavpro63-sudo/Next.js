"use server"
import { db } from "@/lib/db"
import {currentUser} from "@clerk/nextjs/server"
import getAvailableUsernameSuggestions from "../utils";


async function checkProfileUsernameAvailability(username:string){
if(!username) return {available:false,suggestions:[]};
const  user=await db.user.findUnique({
    where:{
        username:username,
    }
})
if(!user){
    return {available:true}
}
const suggestions=await getAvailableUsernameSuggestions(username,3,10)
return{
    available:false,
    suggestions:suggestions
}
}

export async function ClaimUsername(username:string){
const loggedInUser=await currentUser();
if(!loggedInUser) return {
    success:false,error: "No authenticted user found"
}
const user=await db.user.update({
    where:{
        clerkId:loggedInUser.id
    },
    data:{
        username:username
    }
})
if(!user) return {success:false,error:"No authenticated user found"};
return{success:true}
}
export async function getCurrentUsername(){
    const user=await currentUser();

    const currentUsername=await db.user.findUnique({
        where:{
            clerkId:user?.id
        },
         select:{
            username:true,
            bio:true,
         }
    })
    return currentUsername;
}




export default checkProfileUsernameAvailability
