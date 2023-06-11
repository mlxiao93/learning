import { resolve, join, relative, dirname } from 'node:path';
import { readdir, readFileSync } from 'node:fs';
import { utils, relativeFileName } from './utils.mjs';

/**
 * @returns {import('rollup').Plugin}
 */
export default function pluginCustom() {
  const filter = utils.createFilter([/\.css$/]);

  return {
    name: 'custom-plugin',
    resolveId(source, importer) {
      if (!filter(source)) return;
      const id = resolve(dirname(importer), source);

      return {
        id,
        external: true,
      };
    },
    load(id) {
      // if (!filter(id)) return;
      // console.log('load');
      // return {
      //   code: utils.dataToEsm(id),
      //   moduleSideEffects: true,
      // };
      // this.emitFile({
      //   type: 'chunk',
      // })
      // return `export default "";`;
    },
    transform(code, id) {
      // console.log('~~~transform', id);
      // if (filter(id)) {
      //   styleCodes[id] = code;
      //   return '';
      // }
      // console.log(code, id);
    },
    generateBundle(opts, bundle) {
      for (const fileName in bundle) {
        console.log('fileName', fileName);
        const chunkOrAsset = bundle[fileName];
        const id = chunkOrAsset.facadeModuleId;
        const moduleInfo = this.getModuleInfo(id);
        if (!moduleInfo) continue;
        const { importedIds } = moduleInfo;
        for (const styleId of importedIds) {
          if (!filter(styleId)) continue;
          const assetFileName = relativeFileName({
            id: styleId,
            importer: id,
            importerFileName: fileName,
          });
          this.emitFile({
            type: 'asset',
            fileName: assetFileName,
            source: readFileSync(styleId, { encoding: 'utf-8' }),
          });
        }
      }
    },
  };
}
