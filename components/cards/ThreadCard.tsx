import Link from "next/link";
import React from "react";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";

import DeleteButton from "../shared/DeleteButton";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  console.log(":author:",author)
  return (
    <>
      <article
        className={`flex w-full flex-col rounded-xl ${
          isComment ? "px-0 xs:px-7" : " bg-dark-2 p-7"
        }`}>
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            {/* 头像框 */}
            <div className="flex flex-col items-center">
              {/* click jump to the creator */}
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11">
                <Image
                  src={author.image}
                  alt="author avatar"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>

              {/* more space with gray line!自适应*/}
              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              {/* 创作者名字*/}
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>
              {/* 内容 */}
              <p className="mt-2 text-small-regular text-light-2">{content}</p>

              <div
                className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                {/* icons of social media */}

                {/* TODO:考虑作另外三个功能 */}
                <div className="flex gap-3.5">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <Link href={`/thread/${id}`}>
                    <Image
                      src="/assets/reply.svg"
                      alt="reply"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                  </Link>
                  <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <Image
                    src="/assets/share.svg"
                    alt="share"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <DeleteButton id={id} />
                </div>

                {/* 这个如果有comment */}
                {/* isComment && */}
                {comments.length > 0 && (
                  // <Link href="{`/thread/${id}`}">
                  <p className="ml-4 mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies{" "}
                  </p>
                  // </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* !isComment &&  */}
        <p className="text-subtle-medium text-gray-1">
          {formatDateString(createdAt)}
        </p>

        {community && (
          <div className="text-subtle-medium text-gray-1">
            <Link
              href={`/communities/${community.id}`}
              className="mt-5 flex items-center">
              <Image
                src={community.image}
                alt={community.name}
                width={14}
                height={14}
                className="ml-1 rounded-full object-cover"
              />
              {community && `  - ${community.name} Community`}
            </Link>
          </div>
        )}
      </article>
    </>
  );
};

export default ThreadCard;
