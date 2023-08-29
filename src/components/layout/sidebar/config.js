import {
  UserGroupIcon,
  CalendarIcon,
  CashIcon,
  CreditCardIcon,
  FilmIcon,
  TicketIcon,
  ShieldExclamationIcon,
  CogIcon,
  VideoCameraIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  OfficeBuildingIcon,
  ChartPieIcon
  // TemplateIcon,
  // ChartPieIcon,
  // ReceiptTaxIcon,
  // CurrencyDollarIcon
} from '@heroicons/vue/outline'

export const navigations = [
  // {
  //   name: 'Dashboard',
  //   href: '/',
  //   icon: TemplateIcon
  // },
  {
    name: 'Pengguna',
    module: 'user',
    href: '/member',
    icon: UserGroupIcon
  },
  {
    name: 'Penjualan',
    module: 'order',
    href: '/order',
    icon: ShoppingBagIcon,
    isBranchRequired: true
  },
  {
    name: 'Tipe Pembayaran',
    module: 'payment-type',
    href: '/payment-type',
    icon: CreditCardIcon
  },
  {
    name: 'Teater',
    module: 'theater',
    href: '/theater',
    icon: OfficeBuildingIcon
  },
  {
    name: 'Pricing',
    module: 'pricing',
    href: '/pricing',
    icon: CashIcon,
    isBranchRequired: true
  },
  {
    name: 'Studio',
    module: 'studio',
    href: '/studio',
    icon: VideoCameraIcon,
    isBranchRequired: true
  },
  {
    name: 'Kafetaria',
    module: 'product',
    href: '/product',
    icon: ShoppingCartIcon
  },
  {
    name: 'Film',
    module: 'movie',
    href: '/movie',
    icon: FilmIcon
  },
  {
    name: 'Pemutaran Film',
    module: 'screening',
    href: '/screening',
    icon: CalendarIcon,
    isBranchRequired: true
  },
  {
    name: 'Tiket',
    module: 'order',
    href: '/ticket',
    icon: TicketIcon,
    isBranchRequired: true
  },
  // {
  //   name: 'Promo',
  //   module: 'promo',
  //   href: '/promo',
  //   icon: ReceiptTaxIcon
  // },
  // {
  //   name: 'Tax',
  //   module: 'tax',
  //   href: '/tax',
  //   icon: CurrencyDollarIcon
  // },
  {
    name: 'Pengaturan Akses',
    icon: ShieldExclamationIcon,
    children: [
      {
        name: 'Atur Pengurus',
        module: 'user',
        href: '/staff'
      },
      {
        name: 'Atur Peran',
        module: 'role',
        href: '/role'
      }
    ]
  },
  {
    name: 'Laporan',
    icon: ChartPieIcon,
    children: [
      {
        name: 'Penjualan',
        module: 'report',
        href: '/report/order'
      }
    ]
  },
  {
    name: 'Pengaturan Umum',
    module: 'setting',
    href: '/setting',
    icon: CogIcon
  }
]
