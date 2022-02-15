export const getPageCount = (total, limit) => {
  return Math.ceil(total / limit)
}

export const getPagesArray = (totalPages) => {
  let result = []
  for (let i = 0; i < totalPages; i++) {
    result.push(i + 1)
  }
  return result
}

