const util = require("util");
const execFile = util.promisify(require("child_process").execFile);
const semver = require("semver");
const chalk = require("chalk");
const path = require("path");
const { engines } = require(path.resolve("package.json"));

const validateWithSemver = async ([command, semverString]) => {
  const { stdout: version } = await execFile(command, ["-v"]);
  return semver.satisfies(version, semverString)
    ? ""
    : chalk`{red.inverse.bold  DevEnvironment VERSION ERROR } {red.bold ${command} should be ${semverString} but ${version}}`;
};

const createValidatorPromises = (enginesSetting) =>
  Object.entries(enginesSetting).map(validateWithSemver);

module.exports = async () => {
  try {
    if (!engines) {
      throw new ReferenceError(
        chalk`{red Could not find a valid "engines" setting in package.json.}
if you do not set "engines" yet, please add like:
  {red.bold
  "engines": \{
    "node": ">=14.2.0", 
    "npm": ">=6.14.5" 
  \},
  }
`
      );
    }
    const results = await Promise.all(createValidatorPromises(engines));
    const errors = results.filter((error) => error.length > 0);
    if (errors.length) {
      throw Error([" 😡 😡 😡", ...errors].join("\n"));
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
