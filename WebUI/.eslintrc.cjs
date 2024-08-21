module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
    parserOptions: {
        sourceType: 'module',
        project: [__dirname + '/tsconfig.app.json', __dirname + '/tsconfig.node.json'],
        extraFileExtensions: ['.json'],
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    overrides: [
        {
            files: ['**/*.json'],
            rules: {
                quotes: ['error', 'double'],
                'quote-props': ['error', 'always'],
                semi: ['error', 'never'],
                'comma-dangle': ['error', 'never'],
            },
        },
        {
            files: ['**/*.stories.*'],
            rules: {
                'import/no-anonymous-default-export': 'off',
            },
        },
    ],
    rules: {
        'no-param-reassign': 'off',
        'no-unused-expressions': 'warn',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
        'react/jsx-key': 'off',
        'react/jsx-sort-props': [
            'warn',
            {
                reservedFirst: ['key', 'ref'],
                ignoreCase: true,
                shorthandLast: true,
            },
        ],
        'react/prop-types': 'off',
        'import/order': [
            'warn',
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc',
                },
                groups: ['builtin', 'index', 'external', 'parent', 'sibling', 'internal'],
                pathGroups: [
                    {
                        pattern: '@app/**',
                        group: 'sibling',
                        position: 'before',
                    },
                ],
                'newlines-between': 'always',
            },
        ],
    },
};
