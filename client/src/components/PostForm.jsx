import { Await, Form, Link } from "react-router";
import { FormGroup } from "./FormGroup";
import { SkeletonInput } from "./Skeleton";
import { Suspense } from "react";

export function PostForm({
  usersPromise,
  isSubmitting,
  errors = {},
  defaultValuesPromise = {},
}) {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <Suspense fallback={<SkeletonInput />}>
            <Await resolve={defaultValuesPromise}>
              {(defaultValues) => (
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={defaultValues.title}
                />
              )}
            </Await>
          </Suspense>
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <Suspense fallback={<SkeletonInput />}>
            <Await resolve={defaultValuesPromise}>
              {(defaultValues) => (
                <Suspense
                  fallback={
                    <select name="userId" id="userId" defaultValue={"loading"}>
                      <option value="loading">loading</option>
                    </select>
                  }
                >
                  <Await resolve={usersPromise}>
                    {(users) => {
                      return (
                        <select
                          name="userId"
                          id="userId"
                          defaultValue={defaultValues.userId}
                        >
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      );
                    }}
                  </Await>
                </Suspense>
              )}
            </Await>
          </Suspense>

          {/* <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select> */}
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <Suspense fallback={<SkeletonInput />}>
            <Await resolve={defaultValuesPromise}>
              {(defaultValues) => (
                <textarea
                  name="body"
                  id="body"
                  defaultValue={defaultValues.body}
                ></textarea>
              )}
            </Await>
          </Suspense>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmitting} className="btn">
          {isSubmitting ? "Saving" : "Save"}
        </button>
      </div>
    </Form>
  );
}

export function postFormValidator({ title, body, userId }) {
  const errors = {};

  if (title === "") {
    errors.title = "Required";
  }

  if (body === "") {
    errors.body = "Required";
  }

  if (userId === "") {
    errors.userId = "Required";
  }

  return errors;
}
