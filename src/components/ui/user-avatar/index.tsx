import Image from 'next/image';
import { cn } from '@/lib/utils';

export const UserAvatar = ({
  image,
  username,
}: {
  image?: string | null;
  username: string;
}) => {
  if (image) {
    return (
      <Image
        className='rounded-full'
        src={image}
        height={36}
        width={36}
        alt='avatar'
      />
    );
  }

  return (
    <div
      className={cn(
        'h-9 w-9 rounded-full bg-green-feather',
        'flex items-center justify-center shrink-0'
      )}
    >
      <span className='uppercase text-snow'>
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
