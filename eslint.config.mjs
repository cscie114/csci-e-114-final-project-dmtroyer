import globals from "globals";


export default [
  {files: ["**/*.js", "**/*.mjs"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
];
