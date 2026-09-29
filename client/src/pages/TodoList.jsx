import { Await, useLoaderData } from "react-router";
import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";
import { Suspense } from "react";
import { Skeleton, SkeletonList } from "../components/Skeleton";

function TodoList() {
  const { todosPromise } = useLoaderData();

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        <Suspense
          fallback={
            <SkeletonList length={20}>
              <li>
                <Skeleton />
              </li>
            </SkeletonList>
          }
        >
          <Await resolve={todosPromise}>
            {(todos) =>
              todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            }
          </Await>
        </Suspense>
      </ul>
    </>
  );
}

function loader({ request: { signal } }) {
  return { todosPromise: getTodos({ signal }) };
}

export const todoListRoute = {
  loader,
  element: <TodoList />,
};
