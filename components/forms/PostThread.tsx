"use client";
import { useUser } from "@clerk/nextjs"; // Clerk hook

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string | null | undefined;
    name: string;
    bio: string;
    image: string | undefined;
  };
  btnTitle: string;
}

const PostThread = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  return (
    <>
      <div className="head-text">Post Thread Form</div>
    </>
  );
};

export default PostThread;
