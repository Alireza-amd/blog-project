import { Link } from "react-router";
import { Skeleton, SkeletonButton, SkeletonList } from "./Skeleton";

export function PostCard({ id, title, body }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`/posts/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="card">
      <div className="card-header">
        <Skeleton />
      </div>
      <div className="card-body">
        <div className="card-preview-text">
          <SkeletonList length={4}>
            <Skeleton />
          </SkeletonList>
        </div>
      </div>
      <div className="card-footer">
        <SkeletonButton />
      </div>
    </div>
  );
}
