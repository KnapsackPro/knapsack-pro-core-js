# @knapsack-pro/core

[![CircleCI](https://circleci.com/gh/KnapsackPro/knapsack-pro-core-js.svg?style=svg)](https://circleci.com/gh/KnapsackPro/knapsack-pro-core-js)

`@knapsack-pro/core` is JS npm package with core features for [Knapsack Pro API](https://docs.knapsackpro.com/api/).
Learn how to run your tests faster with optimal test suite parallelisation using [Knapsack Pro](https://knapsackpro.com).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [FAQ](#faq)
  - [How to change log level?](#how-to-change-log-level)
- [Development](#development)
  - [Setup](#setup)
  - [Publishing](#publishing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## FAQ

### How to change log level?

You can set log level with environment variable `KNAPSACK_PRO_LOG_LEVEL`.
The default level is `info`.

Available [log levels](https://github.com/winstonjs/winston#logging) (from most important to least important):

* `error`
* `warn`
* `info`
* `verbose`
* `debug`
* `silly`

## Development

### Setup

1. Install dependencies:

    ```
    $ npm install
    ```

2. Compile TypeScript code to `lib` directory by running:

    ```
    $ npm start
    ```

3. Register `@knapsack-pro/core` package globally in your local system. This way we will be able to develop other npm packages dependent on it:

    ```
    $ npm link
    ```

### Publishing

1. Sign in to npm registry with command:

    ```
    $ npm adduser
    ```

2. Before releasing a new version of package please update `CHANGELOG.md` with [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator):

    ```
    $ gem install github_changelog_generator

    # generate CHANGELOG.md
    $ github_changelog_generator KnapsackPro/knapsack-pro-core-js
    $ git commit -am "Update CHANGELOG.md"
    $ git push origin master
    ```

3. If you have added new files to the repository and they should be part of the released npm package then please ensure they are included in `files` array in `package.json`.

4. If you have changed any headers in `README.md` please refresh table of contents with:

    ```
    $ npm run doctoc
    ```

5. Compile project:

    ```
    $ npm start
    ```

6. In order to [bump version of the package](https://docs.npmjs.com/cli/version) run below command. It will also create a version commit and tag for the release:

    ```
    # bump patch version 0.0.x
    $ npm version patch

    # bump minor version 0.x.0
    $ npm version minor
    ```

7. Push to git repository created commit and tag:

    ```
    $ git push origin master --tags
    ```

8. Now when git tag is on Github you can update `CHANGELOG.md` again.

    ```
    $ github_changelog_generator KnapsackPro/knapsack-pro-core-js
    $ git commit -am "Update CHANGELOG.md"
    $ git push origin master
    ```

9. Now you can publish package to npm registry:

    ```
    $ npm publish
    ```
