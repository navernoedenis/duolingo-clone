import Image from 'next/image';
import { cn } from '@/lib/utils';

export const UserAvatar = ({
  image,
  username,
}: {
  image?: string | null;
  username: string;
}) => {
  return image ? (
    <Image
      className='rounded-full'
      src={image}
      height={36}
      width={36}
      alt='avatar'
    />
  ) : (
    <div
      className={cn(
        'h-9 w-9 rounded-full bg-green-feather',
        'flex items-center justify-center'
      )}
    >
      <span className='uppercase text-snow'>
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
