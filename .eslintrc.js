module.exports = {
  extends: [
    'standard',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
    'jest/no-test-callback': 'off',
    'jest/no-commented-out-tests': 'off',
    'vue/no-unused-vars': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/attributes-order': ['error', { alphabetical: true }]
  },
  ignorePatterns: ['config/enums/*']
}
