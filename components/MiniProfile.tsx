"use client"

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '@/fetchApi';
import { MiniProfileProps, User } from '@/types/global';
import Image from 'next/image';
import Loader from './Loader';

const MiniProfile: React.FC<MiniProfileProps> = ({ userId, height, width }) => {
  const [thisUser, setThisUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUsers(userId);
      if (Array.isArray(user) || user === undefined) {
        setThisUser(null); 
      } else {
        setThisUser(user); 
      }
      
      setLoading(false);
    };

    getUser();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  if (!thisUser) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image
          src={thisUser.imageUrl}
          alt={thisUser.username}
          height={height}
          width={width}
          className="rounded-[50px]"
        />
        <h1 className="text-2xl font-bold capitalize">{thisUser.lastName && thisUser.firstName ? thisUser.firstName + thisUser.lastName : thisUser.username}</h1>
      </div>
    </div>
  );
};
export default MiniProfile;
