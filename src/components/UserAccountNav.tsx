'use client'

import { User } from 'next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { toast } from 'sonner'

const UserAccountNav = ({ user }: { user: User | null }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible cursor-pointer'>
        <Avatar>
            {
                user?.image ? (
                  <Image fill src={user?.image as string} alt={user?.name as string} 
                    className='w-40 h-40 object-cover rounded-full'
                    referrerPolicy='no-referrer'
                  />
                ): (
                  <AvatarFallback>
                   {user?.name}
                  </AvatarFallback>
                )
            }
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-background w-60'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut().catch(bug => toast.error("Sorry, you could not be signed out right now."))}
          className='cursor-pointer'>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav