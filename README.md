# Engines Checker
https://www.npmjs.com/package/engines-checker

## Requirements

- Node.js >= 8.0

## Installation

```bash
$ npm i -D engines-checker
```

## Example

[package.json]
```json
{
  "name": "some-projects",
  "version": "0.0.1",
  "engines": {
    "node": ">=9.9.0",
    "npm": ">=5.6.0"
  },
  "scripts": {
    "build": "...",
    "start": "...",
    "prebuild": "engines-checker",
    "prestart": "engines-checker"
  },
  "devDependencies": {
    "husky": "^0.14.3"
  }
}
```

## Why dont you use Docker? / Motivation

Most of the frontend developers works with me strongly loves thier local environments though i created docker images for some projects.
