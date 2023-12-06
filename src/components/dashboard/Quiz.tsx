"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { RocketIcon } from 'lucide-react'

export default function Quiz() {
    const router = useRouter()
  return (
    <Card className='hover:bg-opacity-60 cursor-pointer transition-all' onClick={() => router.push('/quiz')}>
        <CardHeader className='flex items-center flex-row justify-between'>
            <CardTitle>Take a Quiz!</CardTitle>
            <RocketIcon size={15} />
        </CardHeader>
        <CardContent>
            <CardDescription>
                Seat back and relax as we unleash your desired Brain-warming questions in your most loved topics.
            </CardDescription>
        </CardContent>
        <CardFooter>
            <Button variant={'outline'} onClick={() => router.push('/quiz')}>Try it Now!</Button>
        </CardFooter>
    </Card>
  )
}
