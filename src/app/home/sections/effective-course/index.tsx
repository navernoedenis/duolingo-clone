import Image from 'next/image';
import { Category } from '../../ui/category';
import icon from './icon.svg';

export const EffectiveCourse = () => {
  return (
    <Category
      title='Effective and efficient courses'
      description={
        'Our courses effectively and efficiently teach reading, ' +
        'listening, and speaking skills. Check out our latest research!'
      }
    >
      <Image height={164} width={185} src={icon} alt='schedule' />
    </Category>
  );
};
