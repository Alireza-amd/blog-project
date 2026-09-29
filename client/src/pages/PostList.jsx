import { Suspense, useEffect, useRef } from "react";
import { Await, Form, Link, useLoaderData } from "react-router";
import { getPosts } from "../api/posts";
import { getUsers } from "../api/users";
import { FormGroup } from "../components/FormGroup";
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import { SkeletonList } from "../components/Skeleton";

function PostList() {
  const {
    postsPromise,
    usersPromise,
    searchParams: { query, userId },
  } = useLoaderData();
  const queryRef = useRef();
  const userIdRef = useRef();

  useEffect(() => {
    queryRef.current.value = query || "";
  }, [query]);

  useEffect(() => {
    userIdRef.current.value = userId || "";
  }, [userId]);

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>

      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userIdRef}>
              <Suspense
                fallback={
                  <option className="skeleton skeleton-input" value="">
                    loading
                  </option>
                }
              >
                <Await resolve={usersPromise}>
                  {(users) => (
                    <>
                      {" "}
                      <option value="">Any</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </>
                  )}
                </Await>
              </Suspense>
            </select>
          </FormGroup>
          <button className="btn">Filter</button>
        </div>
      </Form>

      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList length={6}>
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
    </>
  );
}

function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const userId = searchParams.get("userId");
  const filterParams = { q: query };
  if (userId !== "") filterParams.userId = userId;

  const postsPromise = getPosts({ signal, params: filterParams });
  const usersPromise = getUsers({ signal });

  return {
    postsPromise,
    usersPromise,
    searchParams: { query, userId },
  };
}

export const postListRoute = {
  loader,
  element: <PostList />,
};
