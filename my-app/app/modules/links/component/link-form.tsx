"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {toast} from "sonner"
import { Button } from "@/components/ui/button"
import {Card,CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {Avatar,AvatarFallback,AvatarImage} from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"
import { useState,useEffect } from "react"
import {
    Plus,
     SquareUser,
    CirclePlay,
    Mail,
    Archive,
    FolderPlus,
    Camera,
    Edit3,
    X
} from "lucide-react"

interface Props{
 username:string;
 bio:string
}
interface Profile{
    firstName:string;
    lastName:string;
    username:string;
    bio?:string;
    imageUrl?:string;
}


function LinkForm({username,bio}:Props){
    const currentUser=useUser();
    const [profile,setProfile]=useState<Profile>({
        firstName:currentUser.user?.firstName||"",
        lastName:username||"",
        username:username||"",
        bio:bio||"",
        imageUrl:currentUser?.user?.imageUrl
    })
    return(
      <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* profile section */}
          <Card className="border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors">
            <CardContent className="p-6">
             <div className="relative group">
               <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage
                src={profile.imageUrl||"placeholder.svg"}
                alt={profile.username}
                />
                <AvatarFallback className="text-lg font-semibold bg-gray-100 text-grey-600">
                 {profile.username.slice(0,2).toUpperCase()||"UN"}
                </AvatarFallback>
               </Avatar>
               <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"

               ><Camera size={14}/>
               </Button>
             </div>
            </CardContent>
          </Card>
      </div>
    )
}
export default LinkForm