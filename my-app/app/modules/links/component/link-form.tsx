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
function LinkForm({username,bio}:Props){
    return(
        <>
        <div>Linkfrom</div>
        </>
    )
}
export default LinkForm