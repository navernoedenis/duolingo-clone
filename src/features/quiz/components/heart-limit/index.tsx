import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export const HeartsLimit = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogTitle />
      <DialogDescription />
      <DialogContent className='max-w-96' showCloseIcon={false}>
        <Image
          className='mx-auto'
          src='/icons/owl/owl-hearts.svg'
          height={110}
          width={120}
          alt='hearts icon'
        />
        <p className='text-center font-semibold'>У вас закінчилися серця</p>

        <Link href='/shop'>
          <Button className='w-full' size='lg'>
            Поповнити
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
