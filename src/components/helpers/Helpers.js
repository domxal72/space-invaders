
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const addDays = (date, dayNum) => {
  return date.setDate(date.getDate() + dayNum)
}

