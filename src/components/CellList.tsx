import { FC, Fragment } from 'react';

import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';

const CellList: FC = () => {
  const cells = useTypedSelector((state) => {
    const { cells } = state;
    if (cells) {
      const { order, data } = cells;
      return order.map((id) => {
        return data[id];
      });
    }
  });

  const renderedCells = cells!.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells!.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
