"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { LucideHistory } from 'lucide-react'

export default function QuizHistory() {
    const router = useRouter()
  return (
    <Card className='hover:bg-opacity-60 cursor-pointer transition-all' onClick={() => router.push('/history')}>
        <CardHeader className='flex items-center flex-row justify-between'>
            <CardTitle>Your Quiz History</CardTitle>
            <LucideHistory size={15} />
        </CardHeader>
        <CardContent>
            <CardDescription>
                Your past quizzes
            </CardDescription>
        </CardContent>
        <CardFooter>
            <Button variant={'secondary'} onClick={() => router.push('/history')}>See More</Button>
        </CardFooter>
    </Card>
  )
}