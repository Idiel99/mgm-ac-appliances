#!/usr/bin/env node
const API_KEY = process.env.WPT_API_KEY
const TEST_URL = process.env.WPT_TEST_URL

if (!API_KEY || !TEST_URL) {
  console.info('[perf] Skipping WebPageTest run – WPT_API_KEY or WPT_TEST_URL not set')
  process.exit(0)
}

const LOCATION = process.env.WPT_LOCATION ?? 'Dulles:Chrome'
const CONNECTIVITY = process.env.WPT_CONNECTIVITY ?? '4G'
const MAX_LCP_MS = Number(process.env.WPT_MAX_LCP_MS ?? 2500)

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const buildParams = (extra = {}) => {
  const params = new URLSearchParams({
    k: API_KEY,
    url: TEST_URL,
    f: 'json',
    location: LOCATION,
    connectivity: CONNECTIVITY,
    mobile: '1',
    lighthouse: '1',
    firstViewOnly: '1'
  })

  Object.entries(extra).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value))
    }
  })

  return params
}

const run = async () => {
  console.info(`[perf] Requesting WebPageTest for ${TEST_URL} @ ${LOCATION} (${CONNECTIVITY})`)
  const initResponse = await fetch('https://www.webpagetest.org/runtest.php', {
    method: 'POST',
    body: buildParams()
  })

  if (!initResponse.ok) {
    throw new Error(`WebPageTest request failed: ${initResponse.status} ${initResponse.statusText}`)
  }

  const initJson = await initResponse.json()
  if (initJson.statusCode !== 200) {
    throw new Error(`WebPageTest API error: ${initJson.statusText ?? initJson.statusCode}`)
  }

  const statusUrl = `${initJson.data.statusUrl}&f=json`
  const resultUrl = initJson.data.jsonUrl

  console.info(`[perf] Test queued: ${initJson.data.testId}. Polling status…`)
  let attempts = 0
  while (true) {
    const statusResp = await fetch(statusUrl)
    if (!statusResp.ok) {
      throw new Error(`WebPageTest status failed: ${statusResp.status} ${statusResp.statusText}`)
    }
    const statusJson = await statusResp.json()
    const { statusCode, statusText } = statusJson
    if (statusCode === 200) {
      console.info('[perf] WebPageTest completed')
      break
    }
    if (statusCode >= 400) {
      throw new Error(`WebPageTest aborted: ${statusText ?? statusCode}`)
    }
    if (attempts > 60) {
      throw new Error('WebPageTest did not complete within 5 minutes')
    }
    attempts += 1
    await sleep(5000)
  }

  const resultResp = await fetch(resultUrl)
  if (!resultResp.ok) {
    throw new Error(`Unable to download WebPageTest results: ${resultResp.status} ${resultResp.statusText}`)
  }
  const resultJson = await resultResp.json()
  const summary = resultJson?.data?.median?.firstView
  if (!summary) {
    throw new Error('Invalid WebPageTest payload: missing median firstView data')
  }

  const lcp = summary.LargestContentfulPaint ?? summary['chromeUserTiming.LargestContentfulPaint']
  const speedIndex = summary.SpeedIndex
  console.info(`[perf] WebPageTest metrics: LCP ${lcp}ms, SpeedIndex ${speedIndex}`)

  if (typeof lcp === 'number' && lcp > MAX_LCP_MS) {
    throw new Error(`WebPageTest LCP ${lcp}ms exceeded budget ${MAX_LCP_MS}ms`)
  }
}

run().catch((error) => {
  console.error(`[perf] WebPageTest run failed: ${error.message}`)
  process.exit(1)
})
