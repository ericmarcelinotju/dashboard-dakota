export default [
  {
    method: 'GET',
    url: '/api/setting?page=1&sort_by=id%3Aasc&limit=10&search_type=&search_value=',
    response: {
      code: 200,
      status: 'OK',
      data: {
        data: [
          {
            id: 1,
            management_name: 'Unit 1',
            cut_off_date: '25',
            scheduled_email: 'Yes',
            version: 1
          },
          {
            id: 2,
            management_name: 'Unit 2',
            cut_off_date: '25',
            scheduled_email: 'No',
            version: 1
          },
          {
            id: 3,
            management_name: 'Unit 3',
            cut_off_date: '27',
            scheduled_email: 'Yes',
            version: 1
          }
        ],
        total: 50
      }
    }
  },
  {
    method: 'GET',
    url: '/api/setting/1',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 1,
        management_name: 'Unit 1',
        cut_off_date: '25',
        scheduled_email: 'Yes',
        version: 1
      }
    }
  },
  {
    method: 'POST',
    url: '/api/setting',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'PUT',
    url: '/api/setting/id',
    response: {
      code: 200,
      status: 'OK'
    }
  },
  {
    method: 'DELETE',
    url: '/api/setting/id?version=1',
    response: {
      code: 200,
      status: 'OK'
    }
  }
]
