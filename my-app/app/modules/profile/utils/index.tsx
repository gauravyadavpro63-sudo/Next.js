import { db } from "@/lib/db";

async function getAvailableUsernameSuggestions(base:string,count=3,maxtries=10){
    const suggestions:string[]=[];
    for(let i=1;suggestions.length<count&&i<maxtries;i++){
        const candidate=`${base}${i}`

        const exists=await db.user.findUnique({
            where:{
                username:candidate
            }
        })
        if(!exists){
            suggestions.push(candidate)
        }
    }
return suggestions
}
export default getAvailableUsernameSuggestions