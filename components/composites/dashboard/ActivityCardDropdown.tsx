import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Edit3Icon, Trash2Icon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import GroupFormDialog from '../dialogs/GroupFormDialog';

type ActivityCardDropdownProps = PropsWithChildren & {};

export default function ActivityCardDropdown(props: ActivityCardDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-56'>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Edit{' '}
            <DropdownMenuShortcut>
              <Edit3Icon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className='!text-red-500'>
            Delete{' '}
            <DropdownMenuShortcut>
              <Trash2Icon size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
