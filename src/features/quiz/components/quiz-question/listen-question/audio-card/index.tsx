import { memo, useCallback } from 'react';
import { useAudio } from 'react-use';
import { FaVolumeHigh } from 'react-icons/fa6';
import { GiTortoise } from 'react-icons/gi';

export const AudioCard = memo(({ src }: { src: string }) => {
  const [audio, state, controls, ref] = useAudio({
    src,
    autoPlay: true,
    onEnded: () => {
      if (ref.current) ref.current.playbackRate = 1;
    },
  });

  const playSlowly = useCallback(async () => {
    if (!ref.current) return;
    ref.current.playbackRate = 0.5;
    controls.play();
  }, [controls, ref]);

  return (
    <div className='flex items-end justify-center gap-3'>
      {audio}

      <button
        className='rounded-2xl py-5 px-6 bg-tranquil-pool border-b-4 border-b-macaw'
        disabled={state.playing}
        onClick={controls.play}
      >
        <FaVolumeHigh className='text-snow' size={46} />
      </button>

      <button
        className='rounded-xl py-3.5 px-5 bg-tranquil-pool border-b-4 border-b-macaw'
        disabled={state.playing}
        onClick={playSlowly}
      >
        <GiTortoise className='text-snow' size={30} />
      </button>
    </div>
  );
});

AudioCard.displayName = 'AudioCard';
