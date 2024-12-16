import { cn } from '@/lib/utils';

export const Languages = ({
  className,
  languages,
}: {
  className?: string;
  languages: string[];
}) => {
  return (
    <section className='border-t-2 border-b-2'>
      <div
        className={cn(
          'max-w-screen-wrapper mx-auto gap-3 p-5',
          'flex items-center justify-center',
          'text-snow text-sm uppercase font-bold',
          className
        )}
      >
        {languages.map((language) => (
          <p className='text-lucky-grey cursor-default' key={language}>
            {language}
          </p>
        ))}
      </div>
    </section>
  );
};
