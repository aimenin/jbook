import { FC, useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './TextEditor.css';

const TextEditor: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>('# Header');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={value} onChange={(v) => setValue(v || '')} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown className="text-editor" source={value} />
    </div>
  );
};

export default TextEditor;
