import MaxWrapper from '@/components/MaxWrapper'
import QuizForm from '@/components/forms/quiz-form'
import { getUserSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Quiz | LearnIt",
  description: "Configure and vieW quiz activity."
}

const QuizPage = async () => {
    const session = await getUserSession()
    if (!session?.user) return redirect('/')
    
  return (
    <MaxWrapper>
        <QuizForm />
    </MaxWrapper>
  )
}

export default QuizPage
