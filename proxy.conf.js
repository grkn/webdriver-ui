const PROXY_CONFIG = [
  {
    context: [
      '/tanistan/**',
      '/oauth/**'
    ],
    target: "http://localhost:8082",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

