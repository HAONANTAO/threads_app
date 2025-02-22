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
      await deleteThread(id, "/thread/${id}"); // 调用 deleteThread 函数，传入线程 ID 和路径
      // 可以在此添加删除后的反馈逻辑，例如刷新页面、跳转等
    } catch (error) {
      console.error("Failed to delete thread:", error);
      // 处理删除失败的情况
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
