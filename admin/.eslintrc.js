module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
        'vue/html-indent': ['error', 4],
        'comma-dangle': ['error', 'never'],
        indent: [
            'warn',
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 'first'
            }
        ],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    }
}
