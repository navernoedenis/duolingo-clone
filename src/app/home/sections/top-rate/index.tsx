import Image from 'next/image';
import { Category } from '../../ui/category';
import duo from './duo.svg';

export const TopRate = () => {
  return (
    <Category
      title='The world’s #1 way to learn a language'
      description={
        'Learning with Duolingo is fun, and research shows that it works! ' +
        'With quick, bite-sized lessons, you’ll arn points and unlock new ' +
        'levels while gaining real-world communication skills.'
      }
    >
      <Image height={145} width={185} src={duo} alt='duo' />
    </Category>
  );
};
