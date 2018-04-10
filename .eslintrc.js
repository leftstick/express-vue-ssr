module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true
  },
  extends: ['plugin:vue/base', 'standard', 'prettier', 'prettier/standard'],
  plugins: ['prettier', 'standard'],
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': ['error', 'unix'],
    'prefer-const': [
    'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
  }
}
