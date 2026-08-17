import { Button } from "@/components/ui/button";
import { Brush, Share } from "lucide-react";
import LinkForm from "@/app/modules/links/component/link-form";
import { getCurrentUsername } from "@/app/modules/profile/action";
export default async function MyTreePage() {
  const profile=await getCurrentUsername()
  return(
    <section className="flex flex-col gap-6 px-4 py-6">
   <div className="flex flex-row items-center justify-between w-full">
    <div className="flex flex-row justify-center items-center gap-3">
      <Button variant="outline" size="default" className="gap-2 bg-transparent">
        <Brush size={16}/>
        Design
      </Button>
      <Button variant="default" size="default" className="gap-2">
        <Share size={16}/>
        Share

      </Button>
    </div>
   </div>



   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-14 w-full">
    <div className="order-2 lg:order-1 border-r w-full">
      <LinkForm
       username={profile?.username!}
       bio={profile?.bio!}  
         
    />
    </div>
   </div>
    </section>
  )
}
