'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = babelAlias;
var path = require('path');

function matchToAlias(importPath, aliases) {
  var matchingAliases = [];

  aliases.forEach(function (alias) {
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
          var importPath = nodePath.node.source.value;

          if (importPath.startsWith('/')) {
            return;
          }

          var matchingAlias = matchToAlias(importPath, state.opts);

          if (matchingAlias) {
            var absolutePath = importPath.replace(matchingAlias.alias, matchingAlias.path);
            var sourceFilePath = state.file.opts.filename.replace(process.cwd(), '');
            var relativePath = path.relative(path.parse(sourceFilePath).dir, absolutePath);

            nodePath.node.source.value = relativePath; // eslint-disable-line no-param-reassign
          }
        }
      }
    }
  };
}