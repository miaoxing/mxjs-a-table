module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "corejs": {
          "version": 3
        }
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    // Stage 1
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-logical-assignment-operators",
    "@babel/plugin-proposal-optional-chaining",

    // Stage 2
    ["@babel/plugin-proposal-decorators", {"legacy": true}],
    "@babel/plugin-proposal-export-namespace-from",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-proposal-class-properties", {"loose": true}],

    // Stage 4
    "@babel/plugin-proposal-object-rest-spread",
  ]
};
