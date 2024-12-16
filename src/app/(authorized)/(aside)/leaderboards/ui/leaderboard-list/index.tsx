import { UserAvatar } from '@/components/ui';
import { CardItem } from '@/components/layouts';

import { UserPoints } from '../user-points';
import { type LeaderboardItem } from '@/types/main';

export const LeaderboardList = ({ data }: { data: LeaderboardItem[] }) => {
  return data.map((item, index) => (
    <CardItem
      key={item.userId}
      text={item.name}
      left={
        <div className='flex items-center gap-3'>
          <span className='font-semibold'>{index + 1}</span>
          <UserAvatar username={item.name} image={item.image} />
        </div>
      }
      right={<UserPoints points={item.points} />}
    />
  ));
};
