import {
  DesktopComputerIcon,
  UserGroupIcon,
  ChartBarIcon,
  TicketIcon,
  ChartPieIcon,
  CurrencyDollarIcon,
  ShieldExclamationIcon,
  CogIcon
} from '@heroicons/vue/solid'

export const navigations = [
  {
    name: 'Halaman Utama',
    module: 'DASHBOARD',
    href: '/dashboard',
    icon: DesktopComputerIcon
  },
  {
    name: 'Pengguna',
    module: 'USER',
    href: '/member',
    icon: UserGroupIcon
  },
  {
    name: 'Penjualan',
    module: 'ORDER',
    href: '/order',
    icon: ChartBarIcon
  },
  {
    name: 'Tipe Pembayaran',
    module: 'PAYMENT-TYPE',
    href: '/payment-type',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Teater',
    module: 'THEATER',
    href: '/theater',
    icon: DesktopComputerIcon
  },
  {
    name: 'Pricing',
    module: 'PRICING',
    href: '/pricing',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Studio',
    module: 'STUDIO',
    href: '/studio',
    icon: DesktopComputerIcon
  },
  {
    name: 'Kafetaria',
    module: 'PRODUCT',
    href: '/product',
    icon: DesktopComputerIcon
  },
  {
    name: 'Film',
    module: 'MOVIE',
    href: '/movie',
    icon: DesktopComputerIcon
  },
  {
    name: 'Pemutaran Film',
    module: 'SCREENING',
    href: '/screening',
    icon: TicketIcon
  },
  {
    name: 'Tiket',
    module: 'ORDER',
    href: '/ticket',
    icon: TicketIcon
  },
  {
    name: 'Promo',
    module: 'PROMO',
    href: '/promo',
    icon: DesktopComputerIcon
  },

  {
    name: 'Pengaturan Akses',
    icon: ShieldExclamationIcon,
    children: [
      {
        name: 'Atur Pengurus',
        module: 'USER',
        href: '/staff'
      },
      {
        name: 'Atur Peran',
        module: 'ROLE',
        href: '/role'
      }
    ]
  },
  {
    name: 'Laporan',
    module: 'ORDER',
    href: '/report',
    icon: ChartPieIcon
  },
  {
    name: 'Pengaturan Umum',
    module: 'SETTING',
    href: '/setting',
    icon: CogIcon
  }
]
