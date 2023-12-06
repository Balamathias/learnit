import MaxWrapper from '@/components/MaxWrapper'
import HotTopics from '@/components/dashboard/HotTopics'
import Quiz from '@/components/dashboard/Quiz'
import QuizHistory from '@/components/dashboard/QuizHistory'
import Recents from '@/components/dashboard/Recents'
import { getUserSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Dashboard | LearnIt",
  description: "Home"
}

async function Page() {
    const session = await getUserSession()

    if (!session?.user) return redirect("/")
  return (
   <main>
      <MaxWrapper>
        <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-1">
                <h2 className='text-primary font-bold tracking-tight text-3xl md:text-4xl'>Dashboard</h2>
            </div>
            <div className="flex md:flex-row md:gap-4 flex-col gap-2.5">
                <Quiz />
                <Recents />
            </div>
            <HotTopics />
            <QuizHistory />
        </div>
      </MaxWrapper>
   </main>

  )
}

export default Page