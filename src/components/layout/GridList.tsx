import { Fragment, ReactNode } from "react";

interface IGridList<T> {
  records: T[];
  renderComp: (record: T) => ReactNode;
}

type hasId = { id?: number | string };

const GridList = <T extends hasId>({ records, renderComp }: IGridList<T>) => {
  const renderList =
    !!records.length &&
    records.map((record) => (
      <Fragment key={record.id}>{renderComp(record)}</Fragment>
    ));

  return renderList;
};

export default GridList;
