"use client";

import React, { useEffect, useState } from 'react';
import { fetchUsers } from '@/fetchApi';
import { MiniProfileProps, User } from '@/types/global';
import Image from 'next/image';

const MiniProfile: React.FC<MiniProfileProps> = ({ userId, height, width, liveState, username, img, textStyles }) => {
  const [thisUser, setThisUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const user = await fetchUsers(userId);
        if(!thisUser){

          if (!user || Array.isArray(user)) {
            setThisUser(null);
          } else {
            setThisUser(user); 
          }
        }
      } catch (error) {
        setThisUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Call getUser if userId is valid
    if (userId) {
      getUser();
    }
  }, [userId]);

  if (loading) {
    return;
  }

  if (!thisUser) {
    return <div>{userId}</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        {img && 
        <Image
        src={String(thisUser.imageUrl)}
        alt={thisUser.username}
        height={height}
        width={width}
        className="rounded-[50px]"
        />
      }
        {username && 
          <h2 className={`${textStyles} font-bold capitalize`}>
          {thisUser.firstName && thisUser.lastName 
            ? `${thisUser.firstName} ${thisUser.lastName}` 
            : thisUser.username}
        </h2>
          }
      </div>
    </div>
  );
};

export default MiniProfile;
