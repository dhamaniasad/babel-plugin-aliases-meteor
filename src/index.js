Object.defineProperty(exports, '__esModule', {
  value: true,
});

function matchToAlias(importPath, aliases) {
  const matchingAliases = [];

  aliases.forEach((alias) => {
    if (importPath === alias.from) {
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

          const matchingAlias = matchToAlias(importPath, state.opts.aliases);

          if (matchingAlias) {
            const newPath = matchingAlias.to;
            nodePath.node.source.value = newPath; // eslint-disable-line no-param-reassign
          }
        },
      },
    },
  };
}

exports.default = babelAlias;
