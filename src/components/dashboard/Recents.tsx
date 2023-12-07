
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { buttonVariants } from '../ui/button'
import { HistoryIcon } from 'lucide-react'
import { getUserSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import HistoryComponent from '../HistoryComponent'
import Link from 'next/link'

export default async function Recents() {
    const session = await getUserSession()

    if (!session?.user) return redirect("/")
  return (
    <Card className='hover:bg-opacity-60 w-full cursor-pointer transition-all'>
        <CardHeader className='flex items-center flex-row justify-between'>
            <CardTitle>Your recent blasts</CardTitle>
            <HistoryIcon size={15} />
        </CardHeader>
        <CardContent>
            <HistoryComponent limit={1} userId={session.user.id}/>
        </CardContent>
        <CardFooter>
            <Link href={'/history'} className={buttonVariants({variant: "secondary"})}>See More...</Link>
        </CardFooter>
    </Card>
  )
}