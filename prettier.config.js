const prettierConfig = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  quoteProps: 'consistent',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: ['*.json', '.prettierrc', '.eslintrc'],
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.css',
      options: {
        parser: 'css',
      },
    },
    {
      files: '*.scss',
      options: {
        'singleQuote': false,
        'bracketSpacing': true
      }
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      options: {
        parser: 'babel-ts',
      },
    },
  ],
}

export default prettierConfig

 