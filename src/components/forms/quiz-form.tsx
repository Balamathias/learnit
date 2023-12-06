'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { QuizSchema } from "@/lib/validators/QuizSchema"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { toast } from 'sonner'

const QuizForm = () => {

  const router = useRouter()
  const [showLoader, setShowLoader] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);
  const { mutate: getQuestions, isPending: isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: z.infer<typeof QuizSchema>) => {
      const response = await axios.post("/api/game", { amount, topic, type });
      return response.data;
    },
  })

    const searchParams = useSearchParams()
    
    const type = searchParams.get("type")

    const form = useForm<z.infer<typeof QuizSchema>>({
      resolver: zodResolver(QuizSchema),
      defaultValues: {
        topic: "",
        amount: 5,
        type: "mcq"
      },
    })
   
    function onSubmit(values: z.infer<typeof QuizSchema>) {
      
      setShowLoader(true);
      getQuestions({...values, type: !type ? 'mcq' : type as any}, {
        onError: (error) => {
          setShowLoader(false);
          if (error instanceof AxiosError) {
            if (error.response?.status === 500) {
              toast.error("Something went wrong. Please try again later.");
            }
          }
        },

        onSuccess: ({ gameId }: { gameId: string }) => {
          setFinishedLoading(true);
          setTimeout(() => {
            if (form.getValues("type") === "mcq") {
              router.push(`/quiz/mcq/${gameId}`);
            } else if (form.getValues("type") === "open_ended") {
              router.push(`/quiz/open-ended/${gameId}`);
            }
          }, 2000);
        },
      })
    }

  return (
    <Card className="max-w-4xl">
        <CardHeader>
            <CardTitle>Configure Your quiz!</CardTitle>
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                        <Input placeholder="What topic would you love to be quized on?" {...field} />
                    </FormControl>
                    <FormDescription>
                        Choose any topic from any field.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                        <Input type="number" min={5} max={25} placeholder="Enter the number of questions you'd love to take." {...field} 
                          onChange={k => form.setValue('amount', parseInt(k.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <CardFooter className="flex flex-row px-0 gap-2.5 md:flex-row">
                    <Button
                    className=""
                    variant={type === "mcq" ? 'outline' : 'secondary'}
                    onClick={() => router.push("?type=mcq")}
                    type="button"
                    
                    >Multiple Choice Questions</Button>

                    <Button
                    onClick={() => router.push("?type=open_ended")}
                    variant={type === "open_ended" ? 'outline' : 'secondary'}
                    type="button"
                    >Open ended Questions</Button>
                </CardFooter>
                <Button type="submit" disabled={isLoading}>Start!</Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default QuizForm