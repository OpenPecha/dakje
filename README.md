# Tibetan Spellchecker
Providing Tibetan spell checking service

[![CI](https://github.com/10zinten/tibetan-spellchecker/actions/workflows/CI.yml/badge.svg)](https://github.com/10zinten/tibetan-spellchecker/actions/workflows/CI.yml)

## Backend
### Requirement
* [Poetry](https://python-poetry.org/) for Python package and environment management.

### Install dependencies
By default, the dependencies are managed with [Poetry](https://python-poetry.org/), go there and install it.

From `./backend/app/` you can install all the dependencies with:

```console
$ poetry install
```

### Run
```console
$ poetry run uvicorn app.main:app --reload
```

Note: If your using editor, open your editor at `./backend/app/` (instead of the project root: `./`), so that you see an `./app/` directory with your code inside. That way, your editor will be able to find all the imports, etc. Make sure your editor uses the environment you just created with Poetry.

You can get path to virtual environment created by poetry for this project with command.
```console
$ poetry env info --path
```

## Frontend
### Requirements

* Node.js (with `npm`).

### Install dependencies
```bash
cd frontend
npm install
```

### Run
```bash
npm run serve
```

