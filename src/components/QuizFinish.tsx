"use client"

import { cn, formatTimeDelta } from '@/lib/utils'
import { differenceInSeconds } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { Game } from '@prisma/client'
import { BarChart } from 'lucide-react'
import MaxWrapper from './MaxWrapper'
import { Card } from './ui/card'


type Props = {
    now: any,
    game: Game
}

const QuizFinish = ({now, game}: Props) => {
  return (
    <MaxWrapper className="absolute flex md:flex-row gap-5 flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
    <Card className="px-4 py-2 mt-2 font-semibold w-full h-[290px] md:w-[290px] flex justify-center items-center">
      <p>You Completed in{" "}
      {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}</p>
    </Card>
    <Card className=''>
    <Link
      href={`/statistics/${game.id}`}
      className={cn(buttonVariants({ variant: "secondary" }), "w-full md:w-[290px] h-[290px]")}
    >
      <p>
      View Statistics
      <BarChart className="w-4 h-4 ml-2" />
      </p>
    </Link>
    </Card>
  </MaxWrapper>
  )
}

export default QuizFinish