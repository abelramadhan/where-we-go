import { NavMenu } from '@/types/global';
import { LayoutPanelLeftIcon, UserIcon, UsersIcon } from 'lucide-react';

const menus: NavMenu[] = [
  { label: 'Dashboard', icon: LayoutPanelLeftIcon, href: '/dashboard' },
  { label: 'Activities', icon: LayoutPanelLeftIcon, href: '/dashboard' },
  { label: 'Groups', icon: UsersIcon, href: '/dashboard/groups' },
  { label: 'Profile', icon: UserIcon, href: '/dashboard/groups' },
];

export default menus;
