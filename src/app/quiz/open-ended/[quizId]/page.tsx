import MaxWrapper from "@/components/MaxWrapper"
import { getUserSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import { Metadata } from 'next'
import { prisma } from "@/lib/db"
import OpenEnded from "@/components/OpenEnded"


export const metadata: Metadata = {
  title: "Quiz | mcq",
  description: "MCQ"
}

interface Props {
  params: {
    quizId: string
  }
}

const QuizDetailPage = async ({params: {quizId}}: Props) => {
    const session = await getUserSession()

    if (!session?.user) return redirect("/")
    const quiz = await prisma.game.findUnique({
      where: {
        id: quizId
      },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            answer: true
          }
        }
      }
    })

    if (!quiz || quiz.gameType !== 'open_ended' || !quiz.questions.length) return redirect('/quiz')


  return (
    <MaxWrapper>
      <OpenEnded game={quiz} />
    </MaxWrapper>
  )
}

export default QuizDetailPage