import { rollup } from 'rollup';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import pluginCustom from './plugins/rollup-plugin-custom.mjs';

const __dirname = dirname(new URL(import.meta.url).pathname);

/**
 * @type {import('rollup').InputOption}
 */
const inputOptions = {
  input: 'src/index.js',
  plugins: [
    pluginCustom(),
    // css({
    //   fileName: 'bundle.css',
    // }),
  ],
};

/**
 * @type {import('rollup').OutputOptions[]}
 */
const outputOptionsList = [
  {
    // file: 'bundle.js',
    dir: 'dist',
    sourcemap: true,
    preserveModules: true,
  },
];

build();

async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // create a bundle
    bundle = await rollup(inputOptions);

    // an array of file names this bundle depends on
    // console.log(bundle.watchFiles);

    await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(error);
  }
  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

/**
 * @param {import('rollup').RollupBuild} bundle
 */
async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionsList) {
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // replace bundle.generate with bundle.write to directly write to disk
    const { output } = await bundle.generate(outputOptions);

    const distDir = resolve(__dirname, `dist`);
    mkdirSync(distDir, { recursive: true });

    for (const chunkOrAsset of output) {
      if (chunkOrAsset.type === 'asset') {
        // For assets, this contains
        // {
        //   fileName: string,              // the asset file name
        //   source: string | Uint8Array    // the asset source
        //   type: 'asset'                  // signifies that this is an asset
        // }
        // console.log('Asset', chunkOrAsset);
        const assetPathname = resolve(distDir, chunkOrAsset.fileName);
        writeFileSync(assetPathname, chunkOrAsset.source, {
          encoding: 'utf-8',
        });
      } else {
        // For chunks, this contains
        // {
        //   code: string,                  // the generated JS code
        //   dynamicImports: string[],      // external modules imported dynamically by the chunk
        //   exports: string[],             // exported variable names
        //   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
        //   fileName: string,              // the chunk file name
        //   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
        //   imports: string[],             // external modules imported statically by the chunk
        //   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
        //   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
        //   isEntry: boolean,              // is this chunk a static entry point
        //   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
        //   map: string | null,            // sourcemaps if present
        //   modules: {                     // information about the modules in this chunk
        //     [id: string]: {
        //       renderedExports: string[]; // exported variable names that were included
        //       removedExports: string[];  // exported variable names that were removed
        //       renderedLength: number;    // the length of the remaining code in this module
        //       originalLength: number;    // the original length of the code in this module
        //       code: string | null;       // remaining code in this module
        //     };
        //   },
        //   name: string                   // the name of this chunk as used in naming patterns
        //   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
        //   type: 'chunk',                 // signifies that this is a chunk
        // }

        const bundlePathname = resolve(distDir, chunkOrAsset.fileName);
        writeFileSync(bundlePathname, chunkOrAsset.code, {
          encoding: 'utf-8',
        });
      }
    }
  }
}
