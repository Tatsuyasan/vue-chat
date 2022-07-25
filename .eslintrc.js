module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    'vue/script-setup-uses-vars': 1,
    'vue/no-unused-vars': [
      'error',
      {
        ignorePattern: '^_'
      }
    ]
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
};
