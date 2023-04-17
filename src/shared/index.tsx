export const fontSizes = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map(item => ({
  label: item,
  value: item,
}))

export const mmToPx = (mm: number) => {
  const div = document.createElement('div')
  div.style.width = `${mm}mm`
  div.style.height = '0'
  document.body.appendChild(div)
  const px = div.offsetWidth
  document.body.removeChild(div)
  return px
}
