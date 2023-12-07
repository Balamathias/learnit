import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { buttonVariants } from '../ui/button'
import { redirect } from 'next/navigation'
import { LucideHistory } from 'lucide-react'
import HistoryComponent from '../HistoryComponent'
import Link from 'next/link'
import { getUserSession } from '@/lib/nextauth'
import { prisma } from '@/lib/db'

export default async function QuizHistory() {
  const session = await getUserSession()

if (!session?.user) return redirect("/")
  const quizCount = await prisma.game.count({
where: {
    userId: session.user.id
}})
  return (
    <Card className='hover:bg-opacity-60 cursor-pointer transition-all'>
        <CardHeader className='flex items-center flex-row justify-between'>
            <CardTitle>Your Quiz History</CardTitle>
            <LucideHistory size={15} />
        </CardHeader>
        <CardContent>
            <CardDescription>
                You have taken <b>{quizCount}</b> Quizzes so far.
            </CardDescription>
            <HistoryComponent limit={15} userId={session.user.id}/>
        </CardContent>
        <CardFooter>
            <Link href={'/history'} className={buttonVariants({variant: "secondary"})}>See More...</Link>
        </CardFooter>
    </Card>
  )
}