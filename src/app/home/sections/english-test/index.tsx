import Image from 'next/image';
import { Category } from '../../ui/category';
import icon from './icon.svg';

export const EnglishTest = () => {
  return (
    <Category
      title='The Duolingo English Test'
      description={
        'Welcome to the convenient, fast, and affordable English test ' +
        'accepted around the world. By integrating the latest assessment ' +
        'science and AI, we empower anyone to take the test where and when ' +
        'they’re at their best.'
      }
      reverse
    >
      <Image height={162} width={167} src={icon} alt='test' />
    </Category>
  );
};
