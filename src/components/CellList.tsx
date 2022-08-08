import { FC } from 'react';

import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';

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
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
