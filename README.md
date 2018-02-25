# babel-plugin-meteoralias

A Babel 7 plugin to transform aliases which works with Meteor.

## Installation

> npm i --D babel-plugin-meteoralias


## Usage

```json
{
  "plugins": [
    ["babel-plugin-meteoralias", {
        "aliases": [
            {
                "from": "react",
                "to": "preact-compat"
            },
            {
                "from": "react-dom",
                "to": "preact-compat"
            }
        ]
    }]
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
import { React } from 'preact-compat';
```
