# babel-plugin-meteorAlias

A babel plugin to transform aliases which also works with meteor.
It also works with webpack and ava etc.

## Installation

> npm i --D babel-plugin-meteorAlias


## Usage

```json
{
  "plugins": [
    ["babel-plugin-meteorAlias", [{
      "path": "preact-compat",
      "alias": "react"
    }]]
  ]
}
```

This will transform all import statements that import `alias` to `path`.

## Example

```js
import { React } from 'react';
```

This will transform into

```js
import { React } from 'preact-compat;
```
