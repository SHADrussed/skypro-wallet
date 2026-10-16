// Consumer-side supplement for Frontend QA: authenticated UI states without engine changes.
import path from 'node:path'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { spawn } from 'node:child_process'
import { setTimeout as delay } from 'node:timers/promises'

const args = process.argv.slice(2)
const option = (key, fallback) =>
  args.includes(key) ? args[args.indexOf(key) + 1] : fallback
const qaDir = option('--qa-dir', process.env.FRONTEND_QA_DIR)
if (!qaDir)
  throw new Error(
    'Pass --qa-dir <Frontend QA directory> or set FRONTEND_QA_DIR',
  )
const output = path.resolve(option('--out', '.qa-auth'))
const phase = option('--phase', 'after')
const requireQA = createRequire(path.join(path.resolve(qaDir), 'package.json'))
const { chromium } = requireQA('playwright')
const { detectHorizontalOverflow } = await import(
  pathToFileURL(path.join(qaDir, 'src/overflow.js'))
)
const { collectDiagnostics } = await import(
  pathToFileURL(path.join(qaDir, 'src/diagnostics.js'))
)
const { writeReport } = await import(
  pathToFileURL(path.join(qaDir, 'src/reporter.js'))
)
const url = 'http://127.0.0.1:4187'
const fixtures = [
  {
    _id: 'qa-food',
    description: 'Продукты на неделю и товары для дома',
    category: 'food',
    date: '2024-07-29T00:00:00.000Z',
    sum: 21990,
  },
  {
    _id: 'qa-bus',
    description: 'Проезд и транспорт',
    category: 'transport',
    date: '2024-07-30T00:00:00.000Z',
    sum: 11046,
  },
  {
    _id: 'qa-joy',
    description: 'Билеты в кино',
    category: 'joy',
    date: '2024-08-01T00:00:00.000Z',
    sum: 13050,
  },
  {
    _id: 'qa-other',
    description: 'Прочие расходы',
    category: 'others',
    date: '2024-08-04T00:00:00.000Z',
    sum: 19106,
  },
]
const viewports = [320, 375, 390, 768, 1024, 1440].map((width) => ({
  name: `w${width}`,
  width,
  height: width <= 390 ? 700 : 900,
}))
const results = []
const checks = []
const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    '4187',
    '--strictPort',
  ],
  { cwd: process.cwd(), windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] },
)
let serverOutput = ''
server.stdout.on('data', (data) => (serverOutput += data))
server.stderr.on('data', (data) => (serverOutput += data))
let browser
await fs.mkdir(path.join(output, 'screenshots'), { recursive: true })
async function capture(page, state, viewport, errors) {
  await page.evaluate(() => document.fonts.ready)
  await page.evaluate(() => {
    for (const element of document.querySelectorAll('*')) {
      if (getComputedStyle(element).overflowY === 'auto') element.scrollTop = 0
    }
  })
  const filename = `${state}-${viewport.width}.png`
  const horizontalOverflow = await detectHorizontalOverflow(page)
  const layout = await page.evaluate(() => {
    const visible = (e) =>
      !!e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden'
    const boxes = [
      ...document.querySelectorAll('h1,h2,form,header,input,button'),
    ]
      .filter(visible)
      .map((e) => {
        const r = e.getBoundingClientRect()
        return {
          tag: e.tagName,
          text: (
            e.innerText ||
            e.getAttribute('aria-label') ||
            e.id ||
            ''
          ).slice(0, 80),
          x: r.x,
          y: r.y,
          w: r.width,
          h: r.height,
        }
      })
    const clipped = [...document.querySelectorAll('p,button')]
      .filter(visible)
      .filter(
        (e) =>
          e.scrollWidth > e.clientWidth + 2 &&
          getComputedStyle(e).textOverflow !== 'ellipsis',
      )
      .map((e) => ({
        text: (e.innerText || e.id).slice(0, 100),
        width: e.clientWidth,
        scroll: e.scrollWidth,
      }))
    const formEscapes = [...document.forms].filter(visible).flatMap((form) => {
      const bounds = form.getBoundingClientRect()
      return [...form.querySelectorAll('input,button')]
        .filter(visible)
        .filter((e) => {
          const r = e.getBoundingClientRect()
          return (
            r.left < bounds.left - 1 ||
            r.right > bounds.right + 1 ||
            r.bottom > bounds.bottom + 1
          )
        })
        .map((e) => e.id || e.innerText)
    })
    const logo = document.querySelector('header img')?.getBoundingClientRect()
    const mobileNav = document.querySelector(
      'button[aria-controls="wallet-mobile-navigation"]',
    )
    const oldNav = [...document.querySelectorAll('header nav a')].find(visible)
    const nav = (
      mobileNav && visible(mobileNav) ? mobileNav : oldNav
    )?.getBoundingClientRect()
    const headerOverlap = Boolean(
      logo && nav && logo.right > nav.left + 1 && logo.left < nav.right,
    )
    const category = document.querySelector('[title="Еда"]')
    const chart = category?.parentElement?.parentElement
    const chartScroll = chart ? chart.scrollWidth - chart.clientWidth : null
    const confirm = [...document.querySelectorAll('button')].find(
      (e) => visible(e) && e.textContent === 'Выбрать период',
    )
    const confirmBounds = confirm?.getBoundingClientRect()
    return {
      formEscapes,
      headerOverlap,
      chartScroll,
      confirmVisible: confirmBounds
        ? confirmBounds.top >= 0 && confirmBounds.bottom <= innerHeight
        : null,
      url: location.pathname,
      documentWidth: document.documentElement.scrollWidth,
      boxes,
      clipped,
    }
  })
  await page.screenshot({
    path: path.join(output, 'screenshots', filename),
    fullPage: true,
  })
  results.push({
    route: { name: state, path: layout.url },
    viewport,
    ...structuredClone(errors),
    horizontalOverflow,
    screenshot: path.join(output, 'screenshots', filename),
    layout,
  })
  console.log(
    JSON.stringify({
      phase,
      state,
      width: viewport.width,
      overflow: horizontalOverflow.overflowPx,
      console: errors.consoleErrors.length,
      page: errors.pageErrors.length,
      network: errors.failedRequests.length,
      clipped: layout.clipped,
    }),
  )
}
async function selectDays(page) {
  await page
    .getByRole('button', { name: '29 июля 2024 г.', exact: true })
    .click()
  await page
    .getByRole('button', { name: '4 августа 2024 г.', exact: true })
    .click()
}
try {
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(url)).ok) break
    } catch {
      // Wait for the preview server to bind its port.
    }
    await delay(100)
  }
  browser = await chromium.launch({ headless: true })
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport })
    await context.addInitScript(() =>
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ token: 'responsive-qa-fixture' }),
      ),
    )
    await context.route('https://wedev-api.sky.pro/api/transactions', (route) =>
      route.fulfill({ json: fixtures }),
    )
    const page = await context.newPage()
    await page.clock.setFixedTime(new Date('2024-07-29T12:00:00+03:00'))
    const errors = { consoleErrors: [], pageErrors: [], failedRequests: [] }
    collectDiagnostics(page, errors)
    await page.goto(url)
    await page.getByText(fixtures[0].description, { exact: true }).waitFor()
    await capture(page, 'expenses', viewport, errors)
    const menu = page.getByRole('button', { name: 'Навигация', exact: false })
    if (await menu.count()) {
      await menu.click()
      await capture(page, 'header-menu', viewport, errors)
      await page.keyboard.press('Escape')
      await menu.click()
      await page
        .getByRole('navigation', { name: 'Мобильная навигация' })
        .getByRole('link', { name: 'Новый расход', exact: true })
        .click()
      await page.locator('#description').waitFor({ state: 'visible' })
      await page
        .getByRole('button', { name: 'Мои расходы', exact: true })
        .click()
      checks.push({
        width: viewport.width,
        navigation: 'mobile menu → new expense → back passed',
      })
    } else if (viewport.width <= 768)
      checks.push({
        width: viewport.width,
        issue: 'No mobile navigation dropdown from supplied design',
      })
    if (viewport.width <= 768)
      await page
        .getByRole('button', { name: 'Новый расход', exact: true })
        .last()
        .click()
    await capture(page, 'new-expense', viewport, errors)
    if (viewport.width <= 768)
      await page
        .getByRole('button', { name: 'Мои расходы', exact: true })
        .click()
    await page
      .getByRole('button', {
        name: `Редактировать расход: ${fixtures[0].description}`,
        exact: true,
      })
      .click()
    await capture(page, 'edit-expense', viewport, errors)
    if (viewport.width <= 768)
      await page
        .getByRole('button', { name: 'Мои расходы', exact: true })
        .click()
    await page.getByText(fixtures[0].description, { exact: true }).click()
    await capture(page, 'selected-expenses', viewport, errors)
    await page.goto(url + '/analytics')
    await page
      .getByText('Выберите период, чтобы увидеть расходы.', { exact: true })
      .waitFor()
    await capture(page, 'analytics-unselected', viewport, errors)
    await page.goto(url + '/analytics/period')
    await selectDays(page)
    await capture(page, 'period-days', viewport, errors)
    await page
      .getByRole('button', { name: 'Выбрать период', exact: true })
      .click()
    await page.getByText('65 192 ₽', { exact: true }).waitFor()
    await capture(page, 'analytics-selected', viewport, errors)
    await page.goto(url + '/analytics/period')
    await page.getByRole('button', { name: 'Год', exact: true }).click()
    await page.getByRole('button', { name: 'июль 2024', exact: true }).click()
    await page.getByRole('button', { name: 'август 2024', exact: true }).click()
    await capture(page, 'period-months', viewport, errors)
    // A compact date selector and confirmation must remain usable in a short landscape viewport.
    await page.setViewportSize({ width: viewport.width, height: 500 })
    const confirmBounds = await page
      .getByRole('button', { name: 'Выбрать период', exact: true })
      .boundingBox()
    const confirmVisible =
      confirmBounds &&
      confirmBounds.y >= 0 &&
      confirmBounds.y + confirmBounds.height <= 500
    checks.push({
      width: viewport.width,
      shortViewportConfirmationVisible: Boolean(confirmVisible),
    })
    if (phase !== 'before' && !confirmVisible)
      throw new Error(
        `Period confirmation outside short viewport at ${viewport.width}px`,
      )
    await page
      .getByRole('button', { name: 'Выбрать период', exact: true })
      .click()
    await page
      .getByRole('link', { name: 'Мои расходы', exact: true })
      .last()
      .click()
    checks.push({
      width: viewport.width,
      navigation: 'period confirm and back passed',
    })
    await context.close()
  }
} catch (error) {
  checks.push({ failure: error.message })
  process.exitCode = 1
} finally {
  await browser?.close()
  server.kill()
  await fs.writeFile(
    path.join(output, 'results.json'),
    JSON.stringify(
      {
        phase,
        fixtureNotice:
          'Synthetic expenses and test session; API responses intercepted only in QA browser',
        results,
        checks,
        serverOutput,
      },
      null,
      2,
    ),
  )
  await writeReport(
    path.join(output, 'report.md'),
    {
      name: `Skypro Wallet authenticated responsive QA — ${phase}`,
      projectDir: process.cwd(),
    },
    results,
    { lint: 'checked by CLI', build: 'checked by CLI' },
  )
  const layoutIssues = results.filter(
    (r) =>
      r.layout.headerOverlap ||
      r.layout.formEscapes.length ||
      r.layout.chartScroll > 1 ||
      (r.route.name.startsWith('period-') && !r.layout.confirmVisible),
  )
  await fs.appendFile(
    path.join(output, 'report.md'),
    `\n## Дополнительные проверки\n\n- Подготовка: фиксированные расходы, тестовая сессия, дата 29.07.2024; сетевые ответы расходов подменены только в QA-браузере.\n- Защищённые состояния: ${results.length}.\n- Подтверждённые геометрические проблемы: ${layoutIssues.length}.\n- Ошибки сценариев: ${checks.filter((c) => c.failure).length}.\n- Подробные размеры элементов и переходы: [results.json](results.json).\n`,
  )
  if (layoutIssues.length) process.exitCode = 1
}
if (
  results.some(
    (r) =>
      r.horizontalOverflow.hasOverflow ||
      r.consoleErrors.length ||
      r.pageErrors.length ||
      r.failedRequests.length,
  )
)
  process.exitCode = 1
