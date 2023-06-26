import * as esbuild from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import config from './common.build.mjs';
import fs from "fs";

let startTime;

if (fs.existsSync('dist')) {
    fs.rmSync("dist", { recursive: true });
}

fs.mkdirSync("dist");

let devPlugin = {
    name: 'example',
    setup(build) {
        build.onStart(() => {
            startTime = process.hrtime();
            console.log("Build started");
        });

        build.onEnd(result => {
            let diff = process.hrtime(startTime);
            let diffSeconds = ((diff[0] * 1e9) + diff[1]) / 1e9;

            console.log(`Build finished in ${diffSeconds.toFixed(2)} seconds with ${result.errors.length} errors`);
        });
    },
}

let ctx = await esbuild.context({
    ...config,
    plugins: [
        devPlugin,
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
            <script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>
            <script src="./index.js"></script>
            </html>
          `,
                }
            ]
        })
    ]
});

await ctx.watch();

let { host, port } = await ctx.serve({
    servedir: 'dist',
});

console.log(`Server is running at http://${host}:${port}`);
