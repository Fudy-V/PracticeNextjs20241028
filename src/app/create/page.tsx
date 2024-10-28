"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import Link from "next/link";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is a required field." }),
  description: z.string().min(1, { message: "Description is a required field." }),
});

export default function CreateTodo() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const { title, description } = value;
    try {
      await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex justify-center min-h-[700px] items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="w-[700px]">
            <CardHeader>
              <CardTitle>Create Todo</CardTitle>
              <CardDescription>Create your new Todo in one-click.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-10">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="workout" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>This is your Todo title.</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="1 hour workout at 4:00 p.m." {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>This is your Todo description.</FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit">Create</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
