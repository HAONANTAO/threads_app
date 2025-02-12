import React from "react";
import Image from "next/image";
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}
const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
    </article>
  );
};

export default UserCard;
