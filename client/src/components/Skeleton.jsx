import { Fragment } from "react";

export function Skeleton({ short, inlineBlock }) {
  return (
    <div
      className="skeleton"
      style={{
        width: short ? "15rem" : undefined,
        display: inlineBlock ? "inline-block" : undefined,
      }}
    />
  );
}

export function SkeletonButton() {
  return <div className="skeleton skeleton-btn" />;
}

export function SkeletonInput() {
  return <div className="skeleton skeleton-input" />;
}

export function SkeletonList({ length, children }) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  );
}
