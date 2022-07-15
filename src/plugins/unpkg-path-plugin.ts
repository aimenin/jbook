import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(
              args.path,
              'https://unpkg.com' + args.resolveDir + '/'
            ).href,
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };

        // else if (args.path === 'tiny-test-pkg') {
        //   return {
        //     path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
        //     namespace: 'a'
        //   }
        // }
      });

      build.onLoad(
        { filter: /.*/ },
        async (args: any): Promise<esbuild.OnLoadResult> => {
          console.log('onLoad', args);

          if (args.path === 'index.js') {
            return {
              loader: 'jsx',
              contents: `
              import react from 'react';
              console.log(react);
            `,
            };
          }

          // Check to see if we have alreadey fetched this file
          // and if it is in the cache
          const cachedResult = await fileCache.getItem(args.path);

          // if it is, return it immediatly
          if (cachedResult) {
            return cachedResult as esbuild.OnLoadResult;
          }

          const { data, request } = await axios.get(args.path);

          const result = {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          };

          // store response in cache
          await fileCache.setItem(args.path, result);

          return result as esbuild.OnLoadResult;
        }
      );
    },
  };
};
