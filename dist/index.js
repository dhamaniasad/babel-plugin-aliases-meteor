'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function matchToAlias(importPath, aliases) {
  var matchingAliases = [];

  aliases.forEach(function (alias) {
    if (importPath === alias.alias) {
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
          var importPath = nodePath.node.source.value;

          if (importPath.startsWith('/')) {
            return;
          }

          var matchingAlias = matchToAlias(importPath, state.opts);

          if (matchingAlias) {
            var newPath = matchingAlias.path;
            nodePath.node.source.value = newPath; // eslint-disable-line no-param-reassign
          }
        }
      }
    }
  };
}

exports.default = babelAlias;