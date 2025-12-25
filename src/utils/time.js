export function isDayInSouthAfrica() {
  const str = new Date().toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' })
  const d = new Date(str)
  const h = d.getHours()
  return h >= 6 && h < 18
}

export function ageFromDOB(dob = '2004-08-08') {
  const d = new Date(dob)
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age
}
