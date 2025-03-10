"use client";
import React from "react";
import Image from "next/image";
import { deleteThread } from "@/lib/actions/thread.actions";

interface DeleteButtonProps {
  id: string;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const handleDelete = async () => {
    try {
      await deleteThread(id, "/thread/${id}");
      // 可以在此添加删除后的反馈逻辑xxxx
    } catch (error) {
      console.error("Failed to delete thread:", error);
    }
  };
  return (
    <>
      <Image
        src="/assets/delete.svg"
        alt="delete"
        width={16}
        height={16}
        onClick={handleDelete} // 绑定删除操作
        className="cursor-pointer object-contain"
      />
    </>
  );
};

export default DeleteButton;
