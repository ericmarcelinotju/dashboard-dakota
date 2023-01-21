import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import auth from './modules/auth'
import config from './modules/config'
import permission from './modules/permission'
import role from './modules/role'
import user from './modules/user'

console.log('[atum] api-mock/index.js loading mocks...')

// Combine all of your API Mock Modules here
const apiRoutes = [
  ...auth,
  ...config,
  ...permission,
  ...role,
  ...user
]

/**
 * List of Axios Mock Adapter methods names
 */
const methodsMap = {
  GET: 'onGet', // Mock any GET request
  POST: 'onPost', // Mock any POST request
  PUT: 'onPut', // Mock any PUT request
  DELETE: 'onAny' // Mock onAny can be use for DELETE or PATCH request
}

/**
 * A generateQueryParams function is for turn object params to string params
 * @param {Object} queryParams - Query params object
 * @return {String} queryParamsString - query params in string
 */
// const generateQueryParams = (queryParams) => {
//   const queryParamsString = []
//   for (const key in queryParams) {
//     // eslint-disable-next-line no-prototype-builtins
//     if (queryParams.hasOwnProperty(key)) {
//       queryParamsString.push(
//         encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key])
//       )
//     }
//   }
//   return queryParamsString.length > 0 ? '?' + queryParamsString.join('&') : ''
// }

/**
 * Example Input Output for this function
 * Example 1
 * Input: { itemPerPage: 10, page: 2, searchTerm: 'samsung' }
 * Output: ?itemPerPage=10&page=2&searchTerm=samsung
 * Example 2 (empty param)
 * Input: null || {} || undefined
 * Output: ''
 */

/**
 * Define the Axios Mock Adapter
 * Axios Mock Adapter also let us to delay all the response
 * Our default delay response is 0 (None), but if you want to delay it you can change it
 * It's usually used for test loading state and develop the skeleton template
 */
const delayResponse = 500 // In millisecond
const mock = new MockAdapter(axios, { delayResponse })

/**
 * Creating all the API mock from the apiRoutes Array that we concat earlier above
 */
apiRoutes.forEach((route) => {
  const params = [route.url]
  switch (route.method) {
    case 'GET':
      params.push({ params: route.param_values })
      break
    case 'PUT' || 'POST':
      params.push(route.param_values)
      break
  }
  mock[methodsMap[route.method]](...params).reply(() => {
    const { url, method, response } = route
    const { code } = response
    const responseStatus = response.status || 'OK'
    console.log(
      `Request: [${method}] ${url}\n`,
      `Status: ${responseStatus}\n`,
      'Response: ',
      response
    )
    return [code || 200, response]
  })
})

/**
 * To make sure API Mock created successfully on your application
 */
console.log(
  `[atum] api-mock/index.js ${apiRoutes.length} mocks loaded successfully.`
)
