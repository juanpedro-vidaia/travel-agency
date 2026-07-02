import coreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...coreWebVitals,
  {
    rules: {
      // console.log accidental → warning; logs intencionados usan info/warn/error
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
    },
  },
]

export default config
