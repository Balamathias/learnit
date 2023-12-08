"use client"

import { ReactNode } from "react"
import { Button, buttonVariants } from "./ui/button"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import Image from "next/image"

const SignInButton = ({children, icon}: {children: ReactNode, icon?: boolean}) => {
  return (
    <Button 
      className={buttonVariants({variant: icon ? "secondary" : "ghost"})}
      onClick={() => signIn('google').catch((bug) => toast.error(`Sorry, you could not be signed in right now.`))}
      
      >
        {icon && <Image src={'/google.png'} className="object-cover bg-inherit mr-2" alt="google logo" width={20} height={20} />}
        <span>{children}</span>
    </Button>
  )
}

export default SignInButton