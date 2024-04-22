import { Fragment, ReactNode } from "react";

interface ILoading {
  count?: number;
  isLoading: boolean;
  skeletonComp: () => ReactNode;
  children: ReactNode;
}

const Loading = (props: ILoading) => {
  const { isLoading, count = 4, skeletonComp, children } = props;

  const renderSkeleton = Array.from({ length: count }, (_, idx) => {
    return <Fragment key={idx}>{skeletonComp()}</Fragment>;
  });

  return isLoading ? renderSkeleton : children;
};

export default Loading;
