import { Await, Link, useLoaderData } from "react-router";
import { getUsers } from "../api/users";
import { Suspense, use } from "react";
import { Skeleton, SkeletonButton, SkeletonList } from "../components/Skeleton";

function UserList() {
  const { usersPromise } = useLoaderData();
  function kir(kir){}
  kir()
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        <Suspense
          fallback={
            <SkeletonList length={6}>
              <div className="card">
                <div className="card-header">
                  <Skeleton />
                </div>
                <div className="card-body">
                  <Skeleton short />
                  <Skeleton short />
                  <Skeleton short />
                </div>
                <div className="card-footer">
                  <SkeletonButton />
                </div>
              </div>
            </SkeletonList>
          }
        >
          <SuspendedUserList usersPromise={usersPromise} />
        </Suspense>
      </div>
    </>
  );
}

function SuspendedUserList({ usersPromise }) {
  const users = use(usersPromise);

  return users.map((user) => (
    <div key={user.id} className="card">
      <div className="card-header">{user.name}</div>
      <div className="card-body">
        <div>{user.company.name}</div>
        <div>{user.website}</div>
        <div>{user.email}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={user.id.toString()}>
          View
        </Link>
      </div>
    </div>
  ));
}

function loader({ request: { signal } }) {
  return { usersPromise: getUsers({ signal }) };
}

export const userListRoute = {
  loader,
  element: <UserList />,
};
