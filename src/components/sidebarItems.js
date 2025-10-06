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

// You can import FontAwesome icons if you want them to match your MetisMenu
// Or temporarily use HeroIcons for consistency

export const menuItems = [
  {
    name: 'Analysis',
    icon: ChartBarIcon,
    children: [
      { name: 'Performance Analysis', href: '/performance-analysis' },
      { name: 'Astrologer Performance Analysis', href: '/astrologer-performance-analysis' },
      { name: 'Notification Analysis', href: '/notification-analysis' },
      { name: 'Marketing Analysis', href: '/marketing-analysis' },
      { name: 'Journey Analysis', href: '/journey-analysis' },
    ],
  },
  { name: 'Payment Orders', icon: DocumentIcon, href: '/payment-orders' },
  { name: 'Manage Admin', icon: UserGroupIcon, href: '/manage-admin' },

  {
    name: 'Astrologers',
    icon: UserGroupIcon,
    children: [
      { name: 'Manage Astrologer', href: '/astrologer/manage-astrologer' },
      { name: 'Payouts', href: '/astrologer/astrologer-payout' },
      { name: 'Update Requests', href: '/astrologer/astro-profile-update-requests' },
    ],
  },
  {
    name: 'Users',
    icon: UserGroupIcon,
    children: [
      { name: 'Manage User', href: '/users/manage-user' },
    ],
  },
  {
    name: 'Chat',
    icon: BellIcon,
    children: [
      { name: 'Chat', href: '/chat/chats' },
      { name: 'Chat History', href: '/chat/chat-history' },
    ],
  },
  {
    name: 'Remedies',
    icon: FolderIcon,
    children: [
      { name: 'Category', href: '/remedies/remedies-category' },
      { name: 'Product', href: '/remedies/remedies-product' },
      { name: 'Orders', href: '/remedies/remedies-orders' },
      { name: 'Addons', href: '/remedies/remedies-addons' },
    ],
  },
  {
    name: 'Test',
    icon: FolderIcon,
    children: [
      { name: 'Category', href: '/test/test-category' },
      { name: 'Manage Test', href: '/test/manage-test' },
      { name: 'Waiting Screen', href: '/test/manage-waiting-screen' },
      { name: 'User Test History', href: '/test/user-test-history' },
    ],
  },
  { name: 'Manage Good Deed', icon: FolderIcon, href: '/manage-good-deed' },
  { name: 'Manage Gifts', icon: FolderIcon, href: '/manage-gift' },
  { name: 'Manage Tickets', icon: FolderIcon, href: '/manage-tickets' },
  { name: 'Manage Questions', icon: FolderIcon, href: '/manage-questions' },
  { name: 'Offer Management', icon: FolderIcon, href: '/manage-offers' },
  { name: 'Manage Blogs', icon: FolderIcon, href: '/manage-blogs' },
  { name: 'Explore Videos', icon: FolderIcon, href: '/explore-videos' },
  { name: 'Push Notification', icon: BellIcon, href: '/push-notifications' },
  { name: 'Live Puja', icon: FolderIcon, href: '/live-puja' },
  { name: 'Banners', icon: FolderIcon, href: '/banners' },
  { name: 'Popup Management', icon: FolderIcon, href: '/popup-management' },
];
