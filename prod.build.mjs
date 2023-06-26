import * as esbuild from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import config from './common.build.mjs';

await esbuild.build({
    ...config,
    plugins: [
        htmlPlugin({
            files: [
                {
                    entryPoints: [
                        'app.jsx',
                    ],
                    filename: 'index.html',
                    htmlTemplate: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="root">
                </div>
            </body>
            <script src="./index.js"></script>
            </html>
          `,
                }
            ]
        })
    ]
})