import Image from 'next/image';
import { memo } from 'react';

export const CharacterImage = memo(({ src }: { src: string }) => {
  return (
    <Image
      className='object-cover'
      src={src}
      height={254}
      width={120}
      alt='character'
    />
  );
});

CharacterImage.displayName = 'CharacterImage';
