"use client"

import { Game, Question } from '@prisma/client';
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import { z } from 'zod'
import { toast } from 'sonner'
import { formatTimeDelta } from '@/lib/utils';
import { Button } from './ui/button';
import { Timer, Loader2, ChevronRightCircleIcon } from "lucide-react"
import { Card, CardHeader, CardTitle } from './ui/card';
import MCQCounter from './mcq-counter';
import { checkAnswerSchema, endGameSchema } from '@/lib/validators/QuizSchema';
import { differenceInSeconds } from 'date-fns'
import QuizFinish from './QuizFinish';


type Props = {
    game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
  };

const MCQ = ({ game }: Props) => {

        const [questionIndex, setQuestionIndex] = React.useState(0);
        const [hasEnded, setHasEnded] = React.useState(false);
        const [stats, setStats] = React.useState({
          correct_answers: 0,
          wrong_answers: 0,
        });
        const [selectedChoice, setSelectedChoice] = React.useState<number>(20);
        const [now, setNow] = React.useState(new Date());
        const alphas = ["A", "B", "C", "D"]
      
        const currentQuestion = React.useMemo(() => {
          return game.questions[questionIndex];
        }, [questionIndex, game.questions]);
      
        const options = React.useMemo(() => {
          if (!currentQuestion) return [];
          if (!currentQuestion.options) return [];
          return JSON.parse(currentQuestion.options as string) as string[];
        }, [currentQuestion]);
      
        const { mutate: checkAnswer, isPending: isChecking } = useMutation({
          mutationFn: async () => {
            const payload: z.infer<typeof checkAnswerSchema> = {
              questionId: currentQuestion.id,
              userInput: options[selectedChoice as number],
            };
            const response = await axios.post(`/api/checkAnswer`, payload);
            return response.data;
          },
        });
      
        const { mutate: endGame } = useMutation({
          mutationFn: async () => {
            const payload: z.infer<typeof endGameSchema> = {
              gameId: game.id,
            };
            const response = await axios.post(`/api/endGame`, payload);
            return response.data;
          },
        });
      
        React.useEffect(() => {
          const interval = setInterval(() => {
            if (!hasEnded) {
              setNow(new Date());
            }
          }, 1000);
          return () => clearInterval(interval);
        }, [hasEnded]);
      
        const handleNext = React.useCallback(() => {
          checkAnswer(undefined, {
            onSuccess: ({ isCorrect }) => {
              if (isCorrect) {
                setStats((stats) => ({
                  ...stats,
                  correct_answers: stats.correct_answers + 1,
                }));
                toast.success("Correct Answer! You got that right!")
                setSelectedChoice(20)
              } else {
                setStats((stats) => ({
                  ...stats,
                  wrong_answers: stats.wrong_answers + 1,
                }));
                toast.error("OOPs! You failed this one! Better luck!")
                setSelectedChoice(20)
              }
              if (questionIndex === game.questions.length - 1) {
                endGame();
                setHasEnded(true);
                return;
              }
              setQuestionIndex((questionIndex) => questionIndex + 1);
            },
          });
        }, [checkAnswer, questionIndex, game.questions.length, endGame]);
      
        React.useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
      
            if (key === "a") {
              setSelectedChoice(0);
            } else if (key === "b") {
              setSelectedChoice(1);
            } else if (key === "c") {
              setSelectedChoice(2);
            } else if (key === "d") {
              setSelectedChoice(3);
            } else if (key === "Enter") {
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
           <MCQCounter correct_answers={stats.correct_answers} wrong_answers={stats.wrong_answers} />
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

        <div className="flex flex-col items-center w-full mt-4">
        {options.map((option, index) => {
            return (
                <Button
                key={option + `-${index}`}
                variant={selectedChoice === index ? "default" : "outline"}
                className="justify-start w-full py-8 mb-4 whitespace-normal"
                onClick={() => setSelectedChoice(index)}
                >
                <div className="flex justify-start items-center">
                    <p className="p-2 px-3 mr-5 border rounded-md">
                    {alphas[index]}
                    </p>
                    <div className="text-start">{option}</div>
                </div>
                </Button>
            );
            })}
        </div>
        <div>
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

export default MCQ