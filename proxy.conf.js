const PROXY_CONFIG = [
  {
    context: [
      '/tanistan/**',
      '/oauth/**',
      '/register/**'
    ],
    target: "http://localhost:8082",
    secure: false
  }
]

module.exports = PROXY_CONFIG;

