function formatTime(secs) {
  const minutes = Math.floor(secs / 60) || 0
  const seconds = Math.round(secs - minutes * 60) || 0

  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

export { formatTime }
