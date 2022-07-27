import { FC, useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: FC = () => {
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const listener = () => {
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
