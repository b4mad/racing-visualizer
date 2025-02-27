export function formatTime(seconds: number | undefined): string {
  if (seconds === undefined) return 'N/A';
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = (seconds % 60).toFixed(3)
  return `${minutes}:${remainingSeconds.padStart(6, '0')}`
}
