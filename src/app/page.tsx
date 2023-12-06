import MaxWrapper from "@/components/MaxWrapper"
import SignInButton from "@/components/SignInButton"
import { getUserSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
 
export default async function Home() {

  const session = await getUserSession()

  if (session?.user) return redirect("/dashboard")

  return (
    <div>
      <MaxWrapper>
        <div className="w-max-3xl max-auto flex flex-col gap-4 md:py-30 py-5">
        <h2 className="text-4xl md:text-6xl tracking-tight font-bold text-foreground">
        Welcome to LearnIt AI Quiz Platform! <span className="text-primary">.</span>
        </h2>
        <p className="text-muted-foreground mt-6">
            This platform allows you to create and take quizzes, all powered by artificial intelligence. You can choose from a variety of question types, including multiple-choice questions, open-ended questions, and matching questions.
        </p>
        <p className="text-muted-foreground mt-6">
            The AI Quiz Platform is perfect for students, teachers, and anyone else who wants to test their knowledge. With our platform, you can create quizzes on any topic you want, and you can even share your quizzes with others.
        </p>

        <p className="text-primary">So what are you waiting for? Start creating your own quizzes today!</p>

        <div className="flex sm:flex-row flex-col gap-4 py-4">
          <SignInButton >
            Continue With Google
          </SignInButton>
        </div>
      </div>
      </MaxWrapper>
    </div>
  )
}