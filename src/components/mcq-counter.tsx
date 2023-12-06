import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { Separator } from "./ui/separator";

type Props = {
  correct_answers: number;
  wrong_answers: number;
};

const MCQCounter = ({ correct_answers, wrong_answers }: Props) => {
  return (
    <Card className="flex flex-row items-center justify-center p-2">
      <CheckCircle2 color="green" size={15} />
      <span className="mx-3 text-green-500">{correct_answers}</span>

      <Separator orientation="vertical" />

      <span className="mx-3 text-rose-500">{wrong_answers}</span>
      <XCircle color="red" size={15} />
    </Card>
  );
};

export default MCQCounter;