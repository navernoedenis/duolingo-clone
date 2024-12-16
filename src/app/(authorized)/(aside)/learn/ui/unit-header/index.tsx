export const UnitHeader = ({
  description,
  order,
  title,
}: {
  description?: string | null;
  order: number;
  title: string;
}) => {
  return (
    <header className='p-4 rounded-xl bg-green-mask flex flex-col gap-1'>
      <h3 className='text-snow uppercase font-semibold font-duo'>
        {order}. {title}
      </h3>
      {description && <p className='text-snow'>{description}</p>}
    </header>
  );
};
