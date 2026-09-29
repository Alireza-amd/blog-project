import { Await, useLoaderData } from "react-router";
import { getPosts } from "../api/posts";
import { getTodos } from "../api/todos";
import { getUser } from "../api/users";
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import { TodoItem } from "../components/TodoItem";
import { Suspense } from "react";
import { Skeleton, SkeletonList } from "../components/Skeleton";

function User() {
  const { postsPromise, todosPromise, userPromise } = useLoaderData();

  return (
    <>
      <Suspense
        fallback={
          <>
            <h1 className="page-title">
              <Skeleton />
            </h1>
            <div className="page-subtitle">
              <Skeleton />
            </div>
            <div>
              <b>Company:</b> <Skeleton short />
            </div>
            <div>
              <b>Website:</b> <Skeleton short />
            </div>
            <div>
              <b>Address:</b> <Skeleton short />
            </div>
          </>
        }
      >
        <Await resolve={userPromise}>
          {(user) => (
            <>
              <h1 className="page-title">{user.name}</h1>
              <div className="page-subtitle">{user.email}</div>
              <div>
                <b>Company:</b> {user.company.name}
              </div>
              <div>
                <b>Website:</b> {user.website}
              </div>
              <div>
                <b>Address:</b> {user.address.street} {user.address.suite}{" "}
                {user.address.city} {user.address.zipcode}
              </div>
            </>
          )}
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList length={3}>
              <PostCardSkeleton />
            </SkeletonList>
          }
        >
          <Await resolve={postsPromise}>
            {(posts) =>
              posts.map((post) => <PostCard key={post.id} {...post} />)
            }
          </Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <Suspense
          fallback={
            <SkeletonList length={10}>
              <Skeleton />
            </SkeletonList>
          }
        >
          <Await resolve={todosPromise}>
            {(todos) => {
              return todos.map((todo) => <TodoItem key={todo.id} {...todo} />);
            }}
          </Await>
        </Suspense>
      </ul>
    </>
  );
}

function loader({ request: { signal }, params: { userId } }) {
  const postsPromise = getPosts({ signal, params: { userId } });
  const todosPromise = getTodos({ signal, params: { userId } });
  const userPromise = getUser(userId, { signal });

  return { postsPromise, todosPromise, userPromise };
}

export const userRoute = {
  loader,
  element: <User />,
};
