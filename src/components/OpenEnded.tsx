"use client"

import { formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { Loader2, Timer, ChevronRightCircleIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button, buttonVariants } from "./ui/button";
import OpenEndedPercentage from "./OpenEndedPercentage";
import BlankAnswerInput from "./BlankAnswerInput";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { checkAnswerSchema, endGameSchema } from "@/lib/validators/QuizSchema";
import {toast} from 'sonner'
import QuizFinish from "./QuizFinish";

type Props = {
  game: Game & { questions: Pick<Question, "id" | "question" | "answer">[] };
};

const OpenEnded = ({ game }: Props) => {
  const [hasEnded, setHasEnded] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [blankAnswer, setBlankAnswer] = React.useState("");
  const [averagePercentage, setAveragePercentage] = React.useState(0);
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  const [now, setNow] = React.useState(new Date());
  const { mutate: checkAnswer, isPending: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll("#user-blank-input").forEach((input: any) => {
        filledAnswer = filledAnswer.replace("_____", input.value);
        input.value = "";
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: filledAnswer,
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  React.useEffect(() => {
    if (!hasEnded) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasEnded]);

  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast.info(`Your answer is ${percentageSimilar}% similar to the correct answer`, {duration: 5000});
        setAveragePercentage((prev) => {
          return Math.round((prev + percentageSimilar) / (questionIndex + 1));
        });
        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: (error) => {
        console.error(error);
        toast.error("Something went wrong");
      },
    });
  }, [checkAnswer, questionIndex, endGame, game.questions.length])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <QuizFinish now={now} game={game} />
    );
  }

  return (
    <div className="md:w-[80vw] max-w-4xl w-[90vw] p-2">
      <div className='flex justify-between items-center'>
        <p className='text-blue-600 text-3xl'>
            {game.topic}
        </p>
        <div className="text-primary flex gap-2 items-center">
          <OpenEndedPercentage percentage={averagePercentage} />
           <Timer size={15} />
           <span>{formatTimeDelta(differenceInSeconds(now, game.timeStarted))}</span> 
        </div>
      </div>
      <Card className='mt-5'>
          <CardHeader className='flex gap-2'>
            <span className='text-blue-500'>Question {questionIndex + 1} of {game.questions.length}</span>
            <CardTitle>{currentQuestion?.question}</CardTitle>
          </CardHeader>
       </Card>
        <Card className="mt-6 py-8">
          <CardHeader>
            <CardTitle>Fill the blanks with the appropriate Keywords.</CardTitle>
          </CardHeader>
          <CardContent>
          <BlankAnswerInput answer={currentQuestion.answer} setBlankAnswer={setBlankAnswer} />
          </CardContent>
        </Card>
        <div className="mt-4">
            <Button
            variant="default"
            className="mt-2"
            size="lg"
            disabled={isChecking || hasEnded}
            onClick={() => {
                handleNext();
            }}
            >
            {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Next <ChevronRightCircleIcon className="w-4 h-4 ml-2" />
            </Button>
        </div>
    </div>
  )
}

export default OpenEnded
