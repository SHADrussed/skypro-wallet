export default {
  name: 'Skypro Wallet — responsive QA',
  commands: {
    lint: 'npm run lint',
    build: 'npm run build',
    serve: 'npm run preview -- --host 127.0.0.1 --port 4186 --strictPort',
  },
  server: {
    url: 'http://127.0.0.1:4186/',
    startupTimeout: 30000,
  },
  routes: [
    { name: 'Expenses', path: '/' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Period', path: '/analytics/period' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Not found', path: '/qa-not-found' },
  ],
  viewports: [320, 375, 390, 768, 1024, 1440].map((width) => ({
    name: `w${width}`,
    width,
    height: width <= 390 ? 700 : 900,
  })),
  screenshotDelay: 150,
  checks: { horizontalOverflow: true, visualRegression: false },
}
