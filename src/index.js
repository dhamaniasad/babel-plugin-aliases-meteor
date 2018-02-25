const path = require('path');

Object.defineProperty(exports, '__esModule', {
  value: true,
});

function matchToAlias(importPath, aliases) {
  const matchingAliases = [];

  aliases.forEach((alias) => {
    if (importPath.startsWith(alias.alias)) {
      matchingAliases.push(alias);
    }
  });

  return matchingAliases.length === 1 ? matchingAliases[0] : false;
}

function babelAlias() {
  return {
    visitor: {
      ImportDeclaration: {
        exit: function exit(nodePath, state) {
          const importPath = nodePath.node.source.value;

          if (importPath.startsWith('/')) {
            return;
          }

          const matchingAlias = matchToAlias(importPath, state.opts);

          if (matchingAlias) {
            const absolutePath = importPath.replace(matchingAlias.alias, matchingAlias.path);
            const sourceFilePath = state.file.opts.filename.replace(process.cwd(), '');
            const relativePath = path.relative(path.parse(sourceFilePath).dir, absolutePath);

            nodePath.node.source.value = relativePath; // eslint-disable-line no-param-reassign
          }
        },
      },
    },
  };
}

exports.default = babelAlias;

