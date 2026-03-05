export const track = (event: string, payload?: unknown) => {
  if (import.meta.env.DEV) {
    console.info(`[analytics] ${event}`, payload)
  }
}
