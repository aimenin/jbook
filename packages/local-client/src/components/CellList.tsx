import { FC, Fragment, useEffect } from 'react';

import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './CellListItem';
import AddCell from './AddCell';

import './CellList.css';
import { useActions } from '../hooks/use-actions';

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

  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, [fetchCells]);

  const renderedCells = cells!.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells!.length === 0} prevCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
