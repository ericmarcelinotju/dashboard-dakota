const download = (blob, filename) => {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()

  // For Firefox it is necessary to delay revoking the ObjectURL.
  setTimeout(() => { window.URL.revokeObjectURL(link.href) }, 250)
}

export {
  download
}
