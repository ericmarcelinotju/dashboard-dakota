import branchIcon from '@/assets/img/icon/branch.png'
import cdrIcon from '@/assets/img/icon/cdr.png'
import extensionIcon from '@/assets/img/icon/extension.png'
import gearIcon from '@/assets/img/icon/gear.png'
import graphIcon from '@/assets/img/icon/graph.png'
import lockIcon from '@/assets/img/icon/lock.png'
import maintenanceIcon from '@/assets/img/icon/maintenance.png'
import meterIcon from '@/assets/img/icon/meter.png'
import securityIcon from '@/assets/img/icon/security.png'
import userIcon from '@/assets/img/icon/user.png'
import usersIcon from '@/assets/img/icon/users.png'
import wizardIcon from '@/assets/img/icon/wizard.png'

export const navigations = [
  {
    name: 'Dashboard',
    module: 'DASHBOARD',
    href: '/dashboard',
    icon: meterIcon
  },
  {
    name: 'Settings',
    module: 'SETTING',
    href: '/setting',
    icon: gearIcon
  },
  {
    name: 'Branch',
    module: 'BRANCH',
    href: '/branch',
    icon: branchIcon
  },
  {
    name: 'Extension',
    module: 'EXTENSION',
    href: '/extension',
    icon: extensionIcon
  },
  {
    name: 'Recording',
    module: 'RECORDING',
    href: '/recording',
    icon: cdrIcon
  },
  {
    name: 'User Security',
    icon: usersIcon,
    children: [{
      name: 'User',
      module: 'USER',
      href: '/user',
      icon: userIcon
    },
    {
      name: 'Role',
      module: 'ROLE',
      href: '/role',
      icon: securityIcon
    },
    {
      name: 'Permission',
      module: 'PERMISSION',
      href: '/permission',
      icon: lockIcon
    }]
  },
  {
    name: 'Maintenance',
    icon: maintenanceIcon,
    children: [{
      name: 'System Log',
      module: 'LOG',
      href: '/log/system',
      icon: wizardIcon
    },
    {
      name: 'Event Log',
      module: 'LOG',
      href: '/log/event',
      icon: wizardIcon
    },
    {
      name: 'Statistic',
      module: 'STATISTIC',
      href: '/statistic',
      icon: graphIcon
    }]
  }
]
