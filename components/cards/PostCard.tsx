import React from "react";

interface PostCardProps {
  title: string;
  content: string;
  createdAt: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, content, createdAt }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm mb-4">
      <h3 className="mt-2 font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
      <p className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostCard;
