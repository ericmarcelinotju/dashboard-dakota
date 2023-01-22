import {
  DesktopComputerIcon,
  UserGroupIcon,
  ChartBarIcon,
  TicketIcon,
  ChartPieIcon,
  CurrencyDollarIcon
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
    href: '/user',
    icon: UserGroupIcon
  },
  {
    name: 'Penjualan',
    module: 'ORDER',
    href: '/order',
    icon: ChartBarIcon
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
    name: 'Atur Peran',
    module: 'ROLE',
    href: '/role',
    icon: UserGroupIcon
  },
  {
    name: 'Laporan',
    module: 'ORDER',
    href: '/report',
    icon: ChartPieIcon
  },
]
