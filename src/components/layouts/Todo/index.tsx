"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "lucide-react";
import React, { FC, useState } from "react";
import { ConfirmDialog } from "../ConfirmDialog";
import { TodoType } from "@/app/types/todo";
import { useRouter } from "next/navigation";

const Todo: FC<TodoType> = ({ id, title, description }) => {
  const [isDone, setIsDone] = useState<boolean>(false);
  const router = useRouter();
  const handleDone = () => {
    setIsDone(!isDone);
  };
  const handleDelete = async () => {
    try {
      await fetch("http://localhost:3000/api/post", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <Checkbox className="mx-auto" id="task1" onCheckedChange={handleDone} />
      <div className={`flex-1 min-w-0 ${isDone && "line-through"}`}>
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full w-8 h-8" size="icon" variant="destructive">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <ConfirmDialog handleDelete={handleDelete} />
    </div>
  );
};

export default Todo;
