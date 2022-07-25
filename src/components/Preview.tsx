import { FC, useEffect, useRef } from 'react';

import './Preview.css';

interface PreviewProps {
  code: string;
}

const html = `
<html>
  <head>
    <style>
      html { background-color: white; }
    <style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (evt) => {
        try {
          eval(evt.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Preview: FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframe}
      />
    </div>
  );
};

export default Preview;
