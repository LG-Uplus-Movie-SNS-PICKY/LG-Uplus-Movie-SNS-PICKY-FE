import React from "react";

export interface MovieItemProps {
  type: "basic" | "rate" | "all";
}

export function MovieItem({ type }: MovieItemProps): JSX.Element {
  return <div>MovieItem</div>;
}
