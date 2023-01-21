const updateQuery = (router, params, replace = true) => {
  const data = {
    query: {
      ...params
    }
  }
  if (replace) {
    router.replace(data).catch((e) => { console.log(e) })
    return
  }
  router.push(data).catch((e) => { console.log(e) })
}

export {
  updateQuery
}
