import { NavMenu } from '@/types/global';
import { LayoutPanelLeftIcon, UsersIcon } from 'lucide-react';

const menus: NavMenu[] = [
  { label: 'Dashboard', icon: LayoutPanelLeftIcon, href: '/dashboard' },
  { label: 'Groups', icon: UsersIcon, href: '/dashboard/groups' },
];

export default menus;
