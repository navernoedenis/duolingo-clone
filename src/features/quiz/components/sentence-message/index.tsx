export const SentenceMessage = ({ sentence }: { sentence: string }) => {
  return (
    <div className='border-2 rounded-xl py-3 px-5 flex items-center gap-3'>
      {sentence}
    </div>
  );
};
