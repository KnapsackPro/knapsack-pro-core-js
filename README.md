# @knapsack-pro/core

[![CircleCI](https://circleci.com/gh/KnapsackPro/knapsack-pro-core-js.svg?style=svg)](https://circleci.com/gh/KnapsackPro/knapsack-pro-core-js)

`@knapsack-pro/core` is JS npm package with core features for [Knapsack Pro API](https://docs.knapsackpro.com/api/).
Learn how to run your tests faster with optimal test suite parallelisation using [Knapsack Pro](https://knapsackpro.com).

This package is the dependency of [Knapsack Pro clients in JavaScript](https://docs.knapsackpro.com/integration/).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [FAQ](#faq)
  - [How to change log level?](#how-to-change-log-level)
  - [What happens when Knapsack Pro API is not available? How Fallback Mode works?](#what-happens-when-knapsack-pro-api-is-not-available-how-fallback-mode-works)
- [Development](#development)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Publishing](#publishing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## FAQ

:heavy_exclamation_mark: **NEW:** Up to date [FAQ for Knapsack Pro JavaScript clients can be found here](https://knapsackpro.com/faq).

**OLD:** This README also contains FAQ questions but we keep adding new info only to our new FAQ page mentioned above.

We keep this old FAQ in README to not break old links spread across the web.

### How to change log level?

You can set log level with environment variable `KNAPSACK_PRO_LOG_LEVEL`.
The default level is `info`.

Available [log levels](https://github.com/winstonjs/winston#logging) (from most important to least important):

- `error` - shows only critical errors
- `warn` - shows warnings (e.g. Fallback Mode has started)
- `info` - shows Knapsack Pro API request response body
- `verbose`
- `debug` - shows Knapsack Pro API request headers and body
- `silly`

### What happens when Knapsack Pro API is not available? How Fallback Mode works?

When Knapsack Pro API is not available or temporarily unreachable due to network problems then Fallback Mode will be started and you will see a log warning in the output.

In Fallback Mode your tests will be executed and split based on test file names across CI nodes. If in the meantime other CI nodes were able to connect to Knapsack Pro API then you may notice that some of the test files were executed twice across CI nodes. Fallback Mode guarantees each of test files is run at least once as a part of CI build.

If during CI build runtime connection to Knapsack Pro API is lost, Fallback Mode would run tests except those executed so far.

## Development

### Requirements

You can use [NVM](https://github.com/nvm-sh/nvm) to manage Node version in development.

- `>= Node 12.18.3 LTS`

### Setup

**Follow below steps or use `bin/setup_development` script to take care of steps 1-3.**

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

4. Set up your IDE:

   - Visual Studio Code

     - Install the following plugins:

       - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
       - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
       - [TypeScript TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
       - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

     - Go to `File > Preferences > Settings > Text Editor > Formatting`

       Turn on `Format On Save` checkbox.

   From now on every change in code base will be automatically formatted by [Prettier](https://prettier.io/). [ESLint](https://eslint.org/) and [TSLint](https://palantir.github.io/tslint/) errors will be also automatically fixed on every file save.

5. Write some code.

### Publishing

1. Sign in to npm registry with command:

   ```
   $ npm adduser
   ```

2. Before releasing a new version of package please update `CHANGELOG.md` with [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator):

   ```
   $ gem install github_changelog_generator

   # generate CHANGELOG.md
   $ github_changelog_generator --user KnapsackPro --project knapsack-pro-core-js
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
   $ npm run build
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
   $ github_changelog_generator --user KnapsackPro --project knapsack-pro-core-js
   $ git commit -am "Update CHANGELOG.md"
   $ git push origin master
   ```

9. Now you can publish package to npm registry:

   ```
   $ npm publish
   ```
