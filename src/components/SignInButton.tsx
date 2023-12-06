"use client"

import { ReactNode } from "react"
import { Button, buttonVariants } from "./ui/button"
import { signIn } from "next-auth/react"
import { toast } from "sonner"

const SignInButton = ({children}: {children: ReactNode}) => {
  return (
    <Button 
      className={buttonVariants({variant: "ghost"})}
      onClick={() => signIn('google').catch((bug) => toast.error(`Sorry, you could not be signed in right now.`))}
      
      >
        {children}
    </Button>
  )
}

export default SignInButton