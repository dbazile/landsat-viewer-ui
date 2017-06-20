# landsat-viewer-ui

> Simple UI for querying and viewing recent [LANDSAT 8](https://landsat.usgs.gov) scenes.

[![Build Status](https://travis-ci.org/dbazile/landsat-viewer-ui.svg?branch=master)](https://travis-ci.org/dbazile/landsat-viewer-ui)


## Running locally for development

```bash
./scripts/develop.sh
```


## Building

### Compiling all assets

```bash
./scripts/compile.sh
```

### Packaging for deployment

```bash
./scripts/package.sh
```


## Linting source code

```bash
./scripts/lint.sh

# Automatically fix certain linter errors
./scripts/lint.sh --fix
```


## Running unit tests

```bash
./scripts/test.sh

# Run in watch mode
./scripts/test.sh --watchAll
```
