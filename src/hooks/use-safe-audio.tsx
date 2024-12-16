import { useAudio } from 'react-use';
import { type HTMLMediaProps } from 'react-use/lib/factory/createHTMLMediaHook';

type USeSafeAudio = Omit<HTMLMediaProps, 'src'> & {
  src?: string | null;
};

export const useSafeAudio = ({ src, ...props }: USeSafeAudio) => {
  if (!src) return null;

  // eslint-disable-next-line
  const [audio, state, controls] = useAudio({
    src,
    ...props,
  });

  return { audio, state, controls };
};
