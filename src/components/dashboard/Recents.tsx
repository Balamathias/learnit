"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { HistoryIcon } from 'lucide-react'

export default function Recents() {
    const router = useRouter()
  return (
    <Card className='hover:bg-opacity-60 cursor-pointer transition-all' onClick={() => router.push('/recents')}>
        <CardHeader className='flex items-center flex-row justify-between'>
            <CardTitle>Your recent blasts</CardTitle>
            <HistoryIcon size={15} />
        </CardHeader>
        <CardContent>
            <CardDescription>
                See what you have been doing for sometime now.
            </CardDescription>
        </CardContent>
        <CardFooter>
            <Button variant={'outline'} onClick={() => router.push('/quiz')}>See it Now!</Button>
        </CardFooter>
    </Card>
  )
}