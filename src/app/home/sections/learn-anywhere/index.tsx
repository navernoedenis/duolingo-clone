import Image from 'next/image';
import { Category } from '../../ui/category';
import icon from './icon.svg';

export const LearnAnywhere = () => {
  return (
    <Category
      title='Learn anytime, anywhere.'
      description={
        'Make your breaks and commutes more productive ' +
        'with our iPhone and Android apps. Download them ' +
        'and see why Apple and Google gave us their highest accolades.'
      }
      reverse
    >
      <Image height={215} width={182} src={icon} alt='boost' />
    </Category>
  );
};
