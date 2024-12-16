import Image from 'next/image';

export const Card = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className='flex items-start gap-2 min-h-36'>
      <Image src={image} height={43} width={43} alt='icon' />
      <div className='pt-3 flex flex-col gap-2 max-w-[250px]'>
        <h6 className='text-shisha-coal font-bold'>{title}</h6>
        <p className='text-lucky-grey text-sm'>{description}</p>
      </div>
    </div>
  );
};
