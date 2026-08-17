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

const profileSchema=z.object({
    firstName:z
    .string()
    .min(1,"first name is required")
    .max(50,"First name must be less than 50 character"),
    lastName:z
    .string()
    .max(50,"Last name must be less than 50 characters")
    .optional(),
    username:z
    .string()
    .min(3,"Username must be at least 3 character")
    .max(30,"Username must be less than 30 character")
    .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters,numbers,and underscores"
    ),
    bio:z.string().max(500,"Bio must be less than 500 characters").optional(),
    imageUrl:z.string().url("Please enter a valid image URL").optional(),
})

const LinkSchema=z.object({
    title:z 
    .string()
    .min(1,"Title is required")
    .max(100,"Title must be less than 100 characters"),
    
    url:z
    .string()
    .url("Please enter a valid URL")
    .min(1,"URL is required"),
   
    description:z 
    .string()
    .max(200,"Description must be less than 200 characters")
    .optional(),
})
export type ProfileFormData=z.infer<typeof profileSchema>
export type LinkFormData=z.infer<typeof LinkSchema>


interface Link{
    id:string;
    title:string;
    url:string;
    description?:string;
    clickCount:number;
}

interface Props{
 username:string;
 bio:string
 link:{
    id:string;
    title:string;
    description:string;
    url:string;
    clickCount:number;
    createdAt:Date;
 }[]
}
interface Profile{
    firstName:string;
    lastName:string;
    username:string;
    bio?:string;
    imageUrl?:string;
}


function LinkForm({username,bio,link}:Props){
    const currentUser=useUser();
    const[editingProfile,setEditingProfile]=useState(false);
  const [isAddingLink,setIsAddingLink]=useState(false);
  const [links,setLinks]=useState<Link[]>(link||[])    



    const [profile,setProfile]=useState<Profile>({
        firstName:currentUser.user?.firstName||"",
        lastName:currentUser.user?.lastName||"",
        username:username||"",
        bio:bio||"",
        imageUrl:currentUser?.user?.imageUrl
    })


const profileForm=useForm<ProfileFormData>({
    resolver:zodResolver(profileSchema),
    defaultValues:{
        firstName:profile.firstName||"",
        lastName:profile.lastName||"",
        username:profile.username,
        bio:profile.bio||"",
    }
})
    const linkForm=useForm<LinkFormData>({
        resolver:zodResolver(LinkSchema),
        defaultValues:{
            title:"",
            url:"",
            description:"",
        }
    })

    async function onProfileSubmit(data:ProfileFormData){}
    async function onLinkSubmit(data:LinkFormData){}




    return(
      <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* profile section */}
          <Card className="border-2 border-dashed border-gray-200 hover:border-green-400 transition-colors">
            <CardContent className="p-6">
             <div className="relative group">
               <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                <AvatarImage
                src={profile.imageUrl||"/placeholder.webp"}
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
             



                <div>
                    <div className="flex-1 space-y-2">
              {
                editingProfile?(
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-2"
                >
                  <div className="flex gap-2">
                    <Input
                      {...profileForm.register("firstName")}
                      placeholder="First Name"
                    />
                    <Input
                      {...profileForm.register("lastName")}
                      placeholder="Last Name"
                    />
                  </div>
                  <div>
                    <Input
                      {...profileForm.register("username")}
                      placeholder="Username"
                      className="font-semibold cursor-not-allowed"
                      readOnly
                      disabled
                    />
                    {profileForm.formState.errors.username && (
                      <p className="text-sm text-red-500 mt-1">
                        {profileForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      {...profileForm.register("bio")}
                      placeholder="Add bio..."
                      className="resize-none"
                      rows={2}
                    />
                    {profileForm.formState.errors.bio && (
                      <p className="text-sm text-red-500 mt-1">
                        {profileForm.formState.errors.bio.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      type="submit"
                      disabled={profileForm.formState.isSubmitting}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => setEditingProfile(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                  </form>
                ):(
                    <div className="space-y-1">
                        <div className="flex item-center gap-2">
                            <h3 className="font-semibold text-lg">
                                {profile.username||"Add username..."}
                            </h3>
                            <Button 
                            size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={()=>setEditingProfile(true)}
                                >
                                    <Edit3 size={12}/>
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {profile.bio||"Add bio..."}
                        </p>
                    </div>
                )
              }
                    </div>
                </div>
             </div>
            </CardContent>
          </Card>
      </div>
    )
}
export default LinkForm