"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { FlameIcon } from 'lucide-react'

export default function Recents() {
    const router = useRouter()
  return (
    <Card className='hover:bg-opacity-60 cursor-pointer transition-all' onClick={() => router.push('/recents')}>
        <CardHeader className='flex items-center flex-row justify-between'>
            <CardTitle>Hot topics</CardTitle>
            <FlameIcon size={15} className='text-primary' />
        </CardHeader>
        <CardContent>
            Topis lok
        </CardContent>
    </Card>
  )
}