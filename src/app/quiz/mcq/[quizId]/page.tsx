import MaxWrapper from "@/components/MaxWrapper"
import { getUserSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import { Metadata } from 'next'
import { prisma } from "@/lib/db"
import MCQ from "@/components/mcq"


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
            options: true
          }
        }
      }
    })

    if (!quiz || quiz.gameType !== 'mcq') return redirect('/quiz')
    if (!quiz.questions.length) {
      await prisma.game.delete({
        where: {
          id: quiz.id
        },
        include: {
          questions: true
        }
      })
      return redirect('/quiz')
    }


  return (
    <MaxWrapper>
      <MCQ game={quiz} />
    </MaxWrapper>
  )
}

export default QuizDetailPage