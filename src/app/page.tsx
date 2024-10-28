import Todo from "@/components/layouts/Todo";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { TodoType } from "./types/todo";

async function getTodos() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  const todos: TodoType[] = await response.json();
  return todos;
}

export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <div className="flex-1 overflow-auto py-4 lg:py-6">
        {todos.map((todo: TodoType) => {
          return (
            <AlertDialog key={todo.id}>
              <Todo id={todo.id} title={todo.title} description={todo.description} />
            </AlertDialog>
          );
        })}
      </div>
    </>
  );
}
