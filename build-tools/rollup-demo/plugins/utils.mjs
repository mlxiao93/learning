import { resolve, join, relative, dirname } from 'node:path';
import { readdir } from 'node:fs/promises';
import pluginUtils from '@rollup/pluginutils';

/**
 * @type {import('@rollup/pluginutils/types')}
 */
export const utils = pluginUtils;

/**
 *
 * @param {{
 *   id: string
 *   importer: string
 *   importerFileName: string
 * }} options
 * @returns
 */
export function relativeFileName(options) {
  const { id, importer, importerFileName } = options;
  const relativeStylePathname = relative(dirname(importer), id);
  return join(dirname(importerFileName), relativeStylePathname);
}
