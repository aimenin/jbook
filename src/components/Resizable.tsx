import { FC, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './Resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
