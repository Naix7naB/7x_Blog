module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': ['error', { args: 'none' }],
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
