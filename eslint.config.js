import eslint from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tslint from 'typescript-eslint';

export default tslint.config(
	eslint.configs.recommended,
	...tslint.configs.recommended,
	...tslint.configs.stylistic,
	{
		ignores: ['node_modules', 'eslint.config.js' ],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			'@stylistic/js': stylisticJs,
			'@stylistic/ts': stylisticTs,
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'@stylistic/js/array-bracket-spacing': [
				'error',
				'always',
				{
					singleValue: false,
					objectsInArrays: false,
					arraysInArrays: true
				}
			],
			'@stylistic/js/arrow-parens': [ 'error', 'as-needed' ],
			'@stylistic/js/arrow-spacing': [
				'error',
				{
					before: true,
					after: true
				}
			],
			'@stylistic/js/brace-style': [
				'error',
				'1tbs',
				{
					allowSingleLine: true
				}
			],
			'@stylistic/js/block-spacing': [ 'error', 'always' ],
			'@stylistic/js/comma-dangle': [ 'error', 'never' ],
			'@stylistic/js/comma-spacing': [
				'error',
				{
					before: false,
					after: true
				}
			],
			'@stylistic/js/comma-style': [ 'error', 'last' ],
			'@stylistic/js/computed-property-spacing': [
				'error',
				'never',
				{
					enforceForClassMembers: true
				}
			],
			'@stylistic/js/dot-location': [ 'error', 'property' ],
			'@stylistic/js/eol-last': [ 'error', 'always' ],
			'@stylistic/js/function-call-spacing': [ 'error', 'never' ],
			'@stylistic/js/function-call-argument-newline': [ 'error', 'consistent' ],
			'@stylistic/js/function-paren-newline': [ 'error', 'multiline' ],
			'@stylistic/js/generator-star-spacing': [ 'error', { before: true }],
			'@stylistic/js/indent': [
				'error',
				2,
				{
					SwitchCase: 1,
					outerIIFEBody: 1,
					MemberExpression: 1,
					FunctionDeclaration: {
						parameters: 'first',
						body: 1
					},
					ignoredNodes: [
						'FunctionExpression > .params[decorators.length > 0]',
						'FunctionExpression > .params > :matches(Decorator,:not(:first-child))',
						'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
					]
				}
			],
			'@stylistic/js/key-spacing': [
				'error',
				{
					beforeColon: false,
					afterColon: true,
					mode: 'strict'
				}
			],
			'@stylistic/js/keyword-spacing': [
				'error',
				{
					before: true,
					after: true
				}
			],
			'@stylistic/js/linebreak-style': [ 'error', 'unix' ],
			'@stylistic/js/lines-between-class-members': [
				'error',
				'always',
				{
					exceptAfterSingleLine: true
				}
			],
			'@stylistic/js/no-mixed-spaces-and-tabs': 'error',
			'@stylistic/js/no-multi-spaces': 'error',
			'@stylistic/js/no-multiple-empty-lines': [
				'error',
				{
					max: 1
				}
			],
      "@stylistic/js/max-len": [
        "warn",
        {
          "code": 140,
          "tabWidth": 2,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true
        }
      ],
			'@stylistic/js/no-trailing-spaces': 'error',
			'@stylistic/js/no-whitespace-before-property': 'error',
			'@stylistic/js/object-curly-newline': [
				'error',
				{
					multiline: true,
					consistent: true
				}
			],
			'@stylistic/js/object-curly-spacing': [ 'error', 'always' ],
			'@stylistic/js/object-property-newline': [
				'error',
				{
					allowMultiplePropertiesPerLine: true
				}
			],
			'@stylistic/js/padded-blocks': [ 'error', 'never' ],
			'@stylistic/js/quotes': [ 'error', 'single' ],
			'@stylistic/js/rest-spread-spacing': [ 'error', 'never' ],
			'@stylistic/js/semi': [ 'error', 'always' ],
			'@stylistic/js/semi-spacing': 'error',
			'@stylistic/js/space-before-function-paren': [
				'error',
				{
					anonymous: 'never',
					named: 'never',
					asyncArrow: 'never'
				}
			],
			'@stylistic/ts/member-delimiter-style': 'error',
			'@stylistic/js/space-in-parens': [ 'error', 'never' ],
			'@stylistic/ts/space-before-blocks': 'error',
			'@stylistic/ts/type-annotation-spacing': [
				'error',
				{
					after: true
				}
			],
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/explicit-function-return-type': 'error',
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{
					'accessibility': 'explicit'
				}
			],
			'@typescript-eslint/explicit-module-boundary-types': 'error',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-explicit-any': [
				'error',
				{
					ignoreRestArgs: true
				}
			],
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],
			'accessor-pairs': 'off',
			'arrow-body-style': [ 'error', 'as-needed' ],
			'consistent-return': 'off',
			curly: [ 'error', 'multi-or-nest' ],
			'default-case': 'off',
			'default-case-last': 'error',
			'default-param-last': 'error',
			'dot-notation': 'off',
			eqeqeq: [ 'error', 'always' ],
			'func-name-matching': 'error',
			'grouped-accessor-pairs': 'error',
			'no-await-in-loop': 'error',
			'no-constructor-return': 'error',
			'no-duplicate-imports': [
				'error',
				{
					includeExports: true
				}
			],
			'no-global-assign': 'error',
			'no-irregular-whitespace': 'error',
			'no-promise-executor-return': 'error',
			'no-return-assign': [ 'error', 'except-parens' ],
			'no-self-compare': 'error',
			'no-template-curly-in-string': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unreachable-loop': 'error',
			'no-unused-private-class-members': 'error',
			'object-shorthand': [ 'warn', 'properties' ],
			'prefer-arrow-callback': 'error',
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
			yoda: [ 'error', 'never' ]
		}
	}
);