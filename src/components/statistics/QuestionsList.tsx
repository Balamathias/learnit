"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@prisma/client";
type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  return (
    <Table className="mt-4 py-6">
      <TableCaption>End of list.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px] font-bold">S/N</TableHead>
          <TableHead className="font-bold">Question & Correct Answer</TableHead>
          <TableHead className="font-bold">Your Answer</TableHead>

          {questions[0]?.questionType === "open_ended" && (
            <TableHead className="w-[10px] text-right">Accuracy</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions?.map(
            (
              { answer, question, userAnswer, percentageCorrect, isCorrect },
              index
            ) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium text-violet-600">{index + 1}</TableCell>
                  <TableCell>
                    <span className="text-blue-600">{question}</span> <br />
                    <br />
                    <span className="font-semibold text-muted-foreground">{answer}</span>
                  </TableCell>
                  {questions[0].questionType === "open_ended" ? (
                    <TableCell className={`font-semibold text-muted-foreground`}>
                      {userAnswer}
                    </TableCell>
                  ) : (
                    <TableCell
                      className={`${
                        isCorrect ? "text-green-600" : "text-rose-500"
                      } font-semibold`}
                    >
                      {userAnswer}
                    </TableCell>
                  )}

                  {percentageCorrect && (
                    <TableCell className="text-right text-orange-500">
                      {percentageCorrect}
                    </TableCell>
                  )}
                </TableRow>
              );
            }
          )}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;