import { NavMenu } from '@/types/global';
import { HomeIcon, LayoutPanelLeftIcon, UserIcon, UsersIcon } from 'lucide-react';

const menus: NavMenu[] = [
  { label: 'Home', icon: HomeIcon, href: '/dashboard' },
  { label: 'Activities', icon: LayoutPanelLeftIcon, href: '/dashboard/activities' },
  { label: 'Groups', icon: UsersIcon, href: '/dashboard/groups' },
  { label: 'Profile', icon: UserIcon, href: '/dashboard/profile' },
];

export default menus;
