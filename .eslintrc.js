module.exports = {
	root: true,
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		jquery: true,
	},
	extends: ["react-app", "standard-with-typescript", "airbnb", "plugin:react/jsx-runtime"],
	plugins: [
		// "react-require",
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: "latest",
	},
	rules: {
		// "eol-last": 0,
		"no-tabs": 0,
		"no-multi-spaces": ["error"],
		// indent: [2, "tab"],
		quotes: [2, "double"],
		semi: [2, "always"],
		"linebreak-style": 0,
		"no-unused-vars": "off",
		"func-names": "off",
		"no-plusplus": 0,
		"space-in-parens": 0,
		"prefer-destructuring": 0,
		"no-restricted-globals": ["error", "event", "fdescribe"], // Quita el error para cuando usas 'location'
		"template-curly-spacing": 0, // Desactiva el espacio dentro de los parentesis before y after
		// "no-console": ["error", { allow: ["debug"] }], // acepta solo el console.debug
		"no-console": ["error", { allow: ["debug", "table"] }], // acepta solo el console.debug
		"max-len": ["error", 1000],

		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
		"arrow-body-style": "off",
		"react/jsx-one-expression-per-line": "off",

		indent: [2, "tab", { SwitchCase: 1, VariableDeclarator: 1 }],
		"react/prop-types": 0,
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
	},
};