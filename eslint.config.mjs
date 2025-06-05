import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // JS/TS base config
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin
    },
    rules: {
      // Regras recomendadas
      ...tseslint.configs.recommended.rules,
      
      // === Regras personalizadas ===
      semi: ['error', 'always'], // exige ponto e vírgula
      quotes: ['error', 'single'], // força aspas simples
      'prefer-const': 'error', // força uso de const se possível
      '@typescript-eslint/no-unused-vars': ['error'], // evita variáveis não utilizadas
      '@typescript-eslint/no-explicit-any': 'warn', // desestimula uso de any
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // força tipos nas bordas dos módulos
      'sort-imports': ['warn', {
        ignoreDeclarationSort: true,
        allowSeparatedGroups: true
      }]
    }
  }
]);

