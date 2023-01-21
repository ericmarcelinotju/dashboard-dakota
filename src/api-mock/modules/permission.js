export default [
  {
    method: 'GET',
    url: '/api/permission?page=1&sort_by=id%3Aasc&limit=10&search_type=&search_value=',

    response: {
      code: 200,
      status: 'OK',
      data: {
        data: [
          {
            id: 1,
            method: 'GET',
            module: 'permission',
            description: 'Get all permissions',
            version: 1
          },
          {
            id: 2,
            method: 'POST',
            module: 'permission',
            description: 'Insert permission',
            version: 1
          },
          {
            id: 3,
            method: 'PUT',
            module: 'permission',
            description: 'Update permission',
            version: 1
          },
          {
            id: 4,
            method: 'DELETE',
            module: 'permission',
            description: 'Delete permission',
            version: 1
          }
        ],
        total: 50
      }
    }
  },
  {
    method: 'GET',
    url: '/api/permission',
    response: {
      code: 200,
      status: 'OK',
      data: {
        data: [
          {
            id: 1,
            method: 'GET',
            module: 'permission',
            description: 'Get all permissions',
            version: 1
          },
          {
            id: 2,
            method: 'POST',
            module: 'permission',
            description: 'Insert permission',
            version: 1
          },
          {
            id: 3,
            method: 'PUT',
            module: 'permission',
            description: 'Update permission',
            version: 1
          },
          {
            id: 4,
            method: 'DELETE',
            module: 'permission',
            description: 'Delete permission',
            version: 1
          }
        ]
      }
    }
  },
  {
    method: 'GET',
    url: '/api/permission/1',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 1,
        method: 'GET',
        module: 'permission',
        description: 'Get all permissions',
        version: 1
      }
    }
  },
  {
    method: 'POST',
    url: '/api/permission',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'PUT',
    url: '/api/permission/1',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'PUT',
    url: '/api/permission/2',
    response: {
      code: 500,
      status: 'ERROR'
    }
  },
  {
    method: 'DELETE',
    url: '/api/permission/3?version=1',
    response: {
      code: 200,
      status: 'OK'
    }
  }
]
