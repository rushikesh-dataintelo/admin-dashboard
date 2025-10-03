// sidebarItems.js
import {
    HomeIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    ChartBarIcon,
    FolderIcon,
    DocumentIcon,
    BellIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline';

export const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, href: '/', badge: null },
    { name: 'Users', icon: UserGroupIcon, href: '/users', badge: '12' },
    { name: 'Analytics', icon: ChartBarIcon, href: '/analytics', badge: null },
    { name: 'Projects', icon: FolderIcon, href: '/projects', badge: '5' },
    { name: 'Documents', icon: DocumentIcon, href: '/documents', badge: null },
    { name: 'Calendar', icon: CalendarIcon, href: '/calendar', badge: '3' },
    { name: 'Notifications', icon: BellIcon, href: '/notifications', badge: '8' },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/settings', badge: null },
];
