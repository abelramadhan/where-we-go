import { ConstructionIcon } from 'lucide-react';

export default function WorkInProgress() {
  return (
    <div className='!h-full w-full flex flex-col items-center justify-center'>
      <div className='rounded-full bg-muted p-4 mb-6'>
        <ConstructionIcon size={36} />
      </div>
      <h3 className='text-xl font-bold'>Oops! Sorry...</h3>
      <p className='text-muted-foreground text-sm w-60 text-center'>
        This page is still in progress and will be coming soon!
      </p>
    </div>
  );
}
