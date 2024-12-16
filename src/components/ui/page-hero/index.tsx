import Image from 'next/image';

export const PageHero = ({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <section className='border-b flex flex-col items-center gap-4 pb-10'>
      <Image src={icon} height={80} width={80} alt='shop icon' />
      <h1 className='font-bold text-xl'>{title}</h1>
      <p className='text-lucky-grey font-semibold text-center'>{subtitle}</p>
    </section>
  );
};
