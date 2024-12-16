import { memo } from 'react';
import { useAudio } from 'react-use';
import { FaVolumeHigh } from 'react-icons/fa6';

interface AudioCardProps {
  src: string;
  sentence: string | null;
}

export const AudioCard = memo(({ src, sentence }: AudioCardProps) => {
  const [audio, state, controls] = useAudio({
    src,
    autoPlay: true,
  });

  return (
    <button
      className='border-2 rounded-xl py-3 px-5 flex items-center gap-3'
      disabled={state.playing}
      onClick={controls.play}
    >
      <FaVolumeHigh className='text-macaw' size={30} />
      {audio}
      {sentence && <span className='font-semibold'>{sentence}</span>}
    </button>
  );
});

AudioCard.displayName = 'AudioCard';
