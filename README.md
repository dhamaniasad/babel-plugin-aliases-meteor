# babel-plugin-aliases

A babel plugin to transform aliases which also works with meteor.
It also works with webpack and ava etc.

## Installation

> npm i --D babel-plugin-aliases


## Usage

```json
{
  "plugins": [
    ["babel-plugin-aliases", [{
      "path": "/some/deep/path",
      "alias": "alias"
    }]]
  ]
}
```

This will transform all import statements that import `alias` to `path`.

## Example

Imagine there is a file inside /some/path/file.js

```js
import module from 'alias/file.js';
```

This will transform into

```js
import module from '../deep/path/file.js';
```
