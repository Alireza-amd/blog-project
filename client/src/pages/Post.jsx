import { Await, Link, useLoaderData } from "react-router";
import { getComments } from "../api/comments";
import { getPost } from "../api/posts";
import { getUser } from "../api/users";
import { Skeleton, SkeletonList } from "../components/Skeleton";
import { Suspense } from "react";

function Post() {
  const { commentsPromise, postPromise, userPromise } = useLoaderData();

  return (
    <>
      <Suspense fallback={<PostFallback />}>
        <Await resolve={postPromise}>
          {(post) => {
            return (
              <>
                <h1 className="page-title">
                  {post.title}

                  <div className="title-btns">
                    <Link className="btn btn-outline" to="edit">
                      Edit
                    </Link>
                  </div>
                </h1>

                <span className="page-subtitle">
                  By:{" "}
                  <Suspense fallback={<Skeleton short inlineBlock />}>
                    <Await resolve={userPromise}>
                      {(user) => (
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      )}
                    </Await>
                  </Suspense>
                </span>

                <div>{post.body}</div>
              </>
            );
          }}
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <Suspense fallback={<CommentsFallback />}>
          <Await resolve={commentsPromise}>
            {(comments) => {
              return comments.map((comment) => (
                <div key={comment.id} className="card">
                  <div className="card-body">
                    <div className="text-sm mb-1">{comment.email}</div>
                    {comment.body}
                  </div>
                </div>
              ));
            }}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

function PostFallback() {
  return (
    <>
      <h1 className="page-title">
        <Skeleton />
        <div className="title-btns">
          <Link className="btn btn-outline" to="edit">
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Skeleton short inlineBlock />
      </span>
      <SkeletonList length={3}>
        <Skeleton />
      </SkeletonList>
    </>
  );
}
function CommentsFallback() {
  return (
    <SkeletonList length={5}>
      <div className="card">
        <div className="card-body">
          <div className="text-sm mb-1">
            <Skeleton short />
          </div>
          <SkeletonList length={2}>
            <Skeleton />
          </SkeletonList>
        </div>
      </div>
    </SkeletonList>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const commentsPromise = getComments(postId, { signal });
  const postPromise = getPost(postId, { signal });

  return {
    commentsPromise,
    postPromise,
    userPromise: postPromise.then((post) => getUser(post.userId, { signal })),
  };
}

export const postRoute = {
  loader,
  element: <Post />,
};
