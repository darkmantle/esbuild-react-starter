const config = {
    entryPoints: ['index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    metafile: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outdir: 'dist'
}

export default config;