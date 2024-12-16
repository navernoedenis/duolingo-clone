import Image from 'next/image';
import { Category } from '../../ui/category';
import icon from './icon.svg';

export const BoostLearning = () => {
  return (
    <Category
      title='Boost your learning with Super Duolingo'
      description={
        'Learning a language on Duolingo is completely free, ' +
        'but you can remove ads and support free education with Super. ' +
        'First 2 weeks on us!'
      }
    >
      <Image height={185} width={180} src={icon} alt='boost' />
    </Category>
  );
};
