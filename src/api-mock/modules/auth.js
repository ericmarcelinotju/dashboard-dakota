export default [
  {
    method: 'GET',
    url: '/api/user',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 'user-id-goldwin',
        name: 'Goldwin Developer',
        phone: '08123456789',
        address: 'Jl. Kyai H. Syahdan No.1, RT.3/RW.12, Palmerah, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480',
        verified: true,
        created_at: '2020-11-13T08:10:06.000000Z',
        updated_at: '2020-11-13T08:10:06.000000Z',
        joinDate: 1599562356250
      }
    }
  },
  {
    method: 'POST',
    url: '/api/login',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 'user-id-goldwin',
        name: 'Goldwin Developer',
        phone: '08123456789',
        verified: true,
        joinDate: 1599562356250
      }
    }
  },
  {
    method: 'POST',
    url: '/api/register',
    response: {
      code: 200,
      status: 'OK',
      data: {
        id: 'user-id-goldwin',
        name: 'Goldwin Developer',
        phone: '08123456789',
        verified: true,
        joinDate: 1599562356250
      }
    }
  },
  {
    method: 'GET',
    url: '/api/csrf-cookie',
    response: {
      code: 200,
      status: 'OK',
      data: {
        message: 'success'
      }
    }
  }
]
