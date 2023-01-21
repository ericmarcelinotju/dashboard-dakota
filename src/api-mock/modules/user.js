export default [
  {
    method: 'GET',
    url: '/api/user?page=1&sort_by=id%3Aasc&limit=10&search_type=&search_value=',
    response: {
      code: 200,
      status: 'OK',
      data: {
        data: [
          {
            id: 1,
            username: 'John',
            email: 'john@gmail.com',
            role_id: 1,
            management_id: 1,
            version: 1
          },
          {
            id: 2,
            username: 'Josh',
            email: 'josh@gmail.com',
            role_id: 1,
            management_id: 2,
            version: 1
          },
          {
            id: 3,
            username: 'Jack',
            email: 'jack@gmail.com',
            role_id: 2,
            management_id: 3,
            version: 1
          },
          {
            id: 4,
            username: 'Jill',
            email: 'jill@gmail.com',
            role_id: 4,
            management_id: 4,
            version: 1
          },
          {
            id: 5,
            username: 'Jenny',
            email: 'jenny@gmail.com',
            role_id: 3,
            management_id: 5,
            version: 1
          }
        ],
        total: 50
      }
    }
  },
  {
    method: 'GET',
    url: '/api/user/1',
    response: {
      code: 200,
      status: 'OK',
      data: {
        data: [
          {
            id: 1,
            username: 'John',
            email: 'john@gmail.com',
            role_id: 1,
            management_id: 1,
            version: 1
          },
          {
            id: 2,
            username: 'Josh',
            email: 'josh@gmail.com',
            role_id: 1,
            management_id: 2,
            version: 1
          },
          {
            id: 3,
            username: 'Jack',
            email: 'jack@gmail.com',
            role_id: 2,
            management_id: 3,
            version: 1
          },
          {
            id: 4,
            username: 'Jill',
            email: 'jill@gmail.com',
            role_id: 4,
            management_id: 4,
            version: 1
          },
          {
            id: 5,
            username: 'Jenny',
            email: 'jenny@gmail.com',
            role_id: 3,
            management_id: 5,
            version: 1
          }
        ]
      }
    }
  },
  {
    method: 'GET',
    url: '/api/user/1',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 1,
        username: 'John',
        email: 'john@gmail.com',
        role_id: 1,
        management_id: 1,
        version: 1
      }
    }
  },
  {
    method: 'POST',
    url: '/api/user',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'PUT',
    url: '/api/user',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'PUT',
    url: '/api/user',
    response: {
      code: 500,
      status: 'ERROR'
    }
  },
  {
    method: 'DELETE',
    url: '/api/user/1?version=1',
    response: {
      code: 200,
      status: 'OK'
    }
  }
]
