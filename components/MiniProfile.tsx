import React from 'react';
import { fetchUsers } from '@/fetchApi';
import { MiniProfileProps, User } from '@/types/global';
import Image from 'next/image';
import Loader from './Loader';

const MiniProfile: React.FC<MiniProfileProps> = async ({ userId }) => {
  const thisUser: User | User[] | undefined = await fetchUsers(userId);
  if (!thisUser) {
    return <div><Loader/></div>; 
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          src={thisUser.imageUrl}
          alt={thisUser.username}
          height={50}
          width={50}
          className="rounded-[50px]"
        />
        <h1 className="text-2xl font-bold capitalize">{thisUser.lastName && thisUser.firstName ? thisUser.firstName + thisUser.lastName : thisUser.username}</h1>
      </div>
    </div>
  );
};
export default MiniProfile;
