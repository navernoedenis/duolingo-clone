import { IoMdFlash } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { CardItem } from '@/components/layouts';

export const UnlimitedHearts = ({ disabled }: { disabled?: boolean }) => {
  return (
    <CardItem
      text='Unlimited Hearts'
      left={<IoMdFlash className='text-bee' size={48} />}
      right={
        <Button className='uppercase' disabled={disabled} variant='outline'>
          Upgrade
        </Button>
      }
    />
  );
};
