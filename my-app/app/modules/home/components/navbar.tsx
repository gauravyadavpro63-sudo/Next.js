import { Button } from "@/components/ui/button"
import { SignInButton,SignUpButton } from "@clerk/nextjs"
import { Show} from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image"

function Navbar(){
    return(
        <>
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
                  <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15">
                  <div className="px-6 py-4 flex justify-between items-center">
                    <Link href={"/"} className="flex items-center gap-y-2.5">
                    <Image src={"/logo.svg"} alt="TreeBio" width={42} height={42}/>
                    </Link>
                    <span className="font-bold text-2xl tracking-widest text-[#41B313]">TreeBio</span>
                  </div>
                  </div>
        </nav>
        </>
    )
}
export default Navbar