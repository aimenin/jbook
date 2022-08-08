import { FC } from 'react';
import { Cell } from '../state';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({ cell }) => {
  return <div>{cell.id}</div>;
};

export default CellListItem;
