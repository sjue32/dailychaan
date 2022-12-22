import path from 'path';

export default {
  process(sourceText: string, sourcePath: string, options: unknown) {
    return {
      code: `export default ${JSON.stringify(path.basename(sourcePath))};`,
    };
  }
};