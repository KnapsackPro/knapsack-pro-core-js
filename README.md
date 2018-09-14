# @knapsack-pro/core

[![CircleCI](https://circleci.com/gh/KnapsackPro/knapsack-pro-core-js.svg?style=svg)](https://circleci.com/gh/KnapsackPro/knapsack-pro-core-js)

`@knapsack-pro/core` is JS npm package with core features for [Knapsack Pro API](https://docs.knapsackpro.com/api/).
Learn how to run your tests faster with optimal test suite parallelisation using [Knapsack Pro](https://knapsackpro.com).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Development](#development)
  - [Setup project in development](#setup-project-in-development)
  - [Publishing](#publishing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

### Setup project in development

1. Install dependencies.

    ```
    $ npm install
    ```

2. Compile typescript code with `gulp`. The output will be in `bin` directory.

    ```
    $ npm start
    ```

3. Register `@knapsack-pro/core` package globally in your local system. This way we will be able to develop other npm packages dependent on it.

    ```
    $ npm link
    ```

### Publishing

* Ensure you are signed in with:

    ```
    $ npm adduser
    ```

* Before releasing a new version of package please ensure you updated `CHANGELOG.md` and added there link to releated pull requests.

* If you added a new files to the repository please ensure unneeded files are listed in `.npmignore`.

* Ensure you compiled project with:

    ```
    $ npm start
    ```

* In order to bump version of the package run below command. It will also create git commit and tag for the release:

    ```
    # bump patch version 0.0.x
    $ npm version patch

    # bump minor version 0.x.0
    $ npm version minor
    ```

* Ensure you pushed to git repository created git commit and tag:

    ```
    $ git push origin master
    $ git push --tags
    ```

* Now you can publish package to npm registry:

    ```
    # --access=public flag is needed only for the very first publish to npm registry
    $ npm publish --access=public
    ```
