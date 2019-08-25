module.exports = {
  "extends": ["airbnb", "prettier", "prettier/react"],
  "plugins": ["prettier"],
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", "jsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100
      }
    ],
    "max-len": ["error", 100]
  },
  "env": {
    "browser": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "parser": "babel-eslint"
}
