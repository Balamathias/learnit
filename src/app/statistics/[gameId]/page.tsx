import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getUserSession } from "@/lib/nextauth";
import { LucideLayoutDashboard, RedoIcon } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionsList from "@/components/statistics/QuestionsList";
import MaxWrapper from "@/components/MaxWrapper";
import Toast from "@/components/Toast";


type Props = {
  params: {
    gameId: string;
  };
};

const Statistics = async ({ params: { gameId } }: Props) => {
  const session = await getUserSession();
  if (!session?.user) {
    return redirect("/");
  }
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { questions: true },
  });
  if (!game || !game.questions.length) {
    <Toast type="info" message="Sorry, we could not find questions for this quiz. Are you sure it exists?" />
    return redirect("/");
  }

  let accuracy: number = 0;

  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    let totalPercentage = game.questions.reduce((acc, question) => {
      return acc + (question.percentageCorrect ?? 0);
    }, 0);
    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <MaxWrapper>
        <div className="flex items-start justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center flex-col md:flex-row gap-2 space-x-2">
            <Link href="/dashboard" className={buttonVariants({variant: "outline"})}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
            <Link href={`/quiz/${game.gameType}/${gameId}`} className={buttonVariants({variant: "outline"})}>
              <RedoIcon className="mr-2 text-blue-600" />
              Quiz again
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={new Date(game.timeEnded ?? 0)}
            timeStarted={new Date(game.timeStarted ?? 0)}
          />
        </div>
        <QuestionsList questions={game.questions} />
      </MaxWrapper>
    </>
  );
};

export default Statistics;