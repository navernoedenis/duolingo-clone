import { useAudio } from 'react-use';

export const useSounds = () => {
  const [correctAudio, , correctControls] = useAudio({
    src: '/sounds/correct.mp3',
  });

  const [wrongAudio, , wrongControls] = useAudio({
    src: '/sounds/wrong.mp3',
  });

  const [finishAudio, , finishControls] = useAudio({
    src: '/sounds/finish.mp3',
  });

  return {
    audio: {
      correct: correctAudio,
      finish: finishAudio,
      wrong: wrongAudio,
    },
    play: {
      correct: correctControls.play,
      finish: finishControls.play,
      wrong: wrongControls.play,
    },
  };
};
