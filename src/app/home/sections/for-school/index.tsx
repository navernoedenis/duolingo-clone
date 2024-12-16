import Image from 'next/image';
import { Category } from '../../ui/category';
import icon from './icon.svg';

export const ForSchool = () => {
  return (
    <Category
      title='Duolingo for Schools'
      description={
        'Free teacher tools to help students learn languages ' +
        'through the Duolingo app, both in and out of the classroom.'
      }
    >
      <Image height={215} width={162} src={icon} alt='laptop' />
    </Category>
  );
};
