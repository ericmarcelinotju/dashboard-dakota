export default [
  {
    method: 'GET',
    url: '/api/role?page=1&sort_by=id%3Aasc&limit=10&search_type=&search_value=',
    response: {
      code: 200,
      status: 'OK',
      data: {
        data: [
          {
            id: 1,
            name: 'Admin',
            permissions: '4',
            description: 'lorem ipsum dolor sit amet',
            version: 1
          },
          {
            id: 2,
            name: 'Superadmin',
            permissions: '4',
            description: 'lorem ipsum dolor sit amet',
            version: 1
          },
          {
            id: 3,
            name: 'Admin Produksi',
            permissions: '4',
            description: 'lorem ipsum dolor sit amet',
            version: 1
          }
        ],
        total: 50
      }
    }
  },
  {
    method: 'GET',
    url: '/api/role/1',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 1,
        name: 'Admin',
        permissions: '4',
        description: 'lorem ipsum dolor sit amet',
        version: 1
      }
    }
  },
  {
    method: 'POST',
    url: '/api/role',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'PUT',
    url: '/api/role/id',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'DELETE',
    url: '/api/role/1?version=1',
    response: {
      code: 200,
      status: 'OK'
    }
  }
]
