"use client";
import { useUser } from "@clerk/nextjs"; // Clerk hook
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
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
const AccountProfile = ({ user, btnTitle }: Props) => {
  const { user: clerkUser, isSignedIn } = useUser(); // 获取 Clerk 用户实例

  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("media");

  // 2. 使用 useForm 设置默认值

  //1. Define your form.管理表单状态
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user.image || "",
      name: (user.name || clerkUser?.unsafeMetadata?.name || "") as string,
      username: user.username || "",
      bio: (user.bio || clerkUser?.unsafeMetadata?.bio || "") as string,
    },
  });
  useEffect(() => {
    if (!clerkUser?.unsafeMetadata) return;

    const { name = "", bio = "" } = clerkUser.unsafeMetadata as {
      name?: string;
      bio?: string;
    };

    form.setValue("name", typeof name === "string" ? name : "");
    form.setValue("bio", typeof bio === "string" ? bio : "");
  }, [clerkUser, form]);

  // 图片upload显示
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // setFiles(Array.from(e.target.files));
      setFiles([file]); // 直接存储原始文件对象
      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    // check
    if (!isSignedIn) {
      console.error("the user is not signed in,can not update Clerk info");
      return;
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const blob = values.profile_photo;
      // 是的，通常情况下，加载时的图片（比如显示在页面上的默认占位图或加载图标）并不是 Base64 格式，而是一个 URL 指向一个外部文件或资源。只有在 用户上传图片时，浏览器会将图片转换为 Base64 编码，并通常通过 FileReader.readAsDataURL() 来读取文件，并生成一个 Base64 字符串。
      const hasImageChanged = isBase64Image(blob);
      let newImageUrl = user.image; // 默认保留原头像

      // 有改动图片就变化显示
      if (hasImageChanged && files.length > 0) {
        const imgRes = await startUpload(files); // 使用原始文件对象进行上传
        console.log(imgRes); // 查看返回的数据结构
        // 正确解析响应结构
        if (imgRes?.[0]?.url) {
          // 注意这里改为访问 .url
          values.profile_photo = imgRes[0].url;
          newImageUrl = imgRes[0].url;
          // **使用 Clerk 的 setProfileImage API 更新头像**
          // 通过 fetch 获取图片的 Blob
          const response = await fetch(newImageUrl);
          const imageBlob = await response.blob();

          // **使用 Clerk 的 setProfileImage API**
          const imageFile = new File([imageBlob], "profile.jpg", {
            type: imageBlob.type,
          });
          await clerkUser?.setProfileImage({ file: imageFile });
        } else {
          console.error("上传失败，响应结构:", imgRes);
          return;
        }
      }
      // 2️⃣ 更新 Clerk 用户信息
      await clerkUser?.update({
        ...(values.username ? { username: values.username } : {}), // 确保 username 存在再更新
        unsafeMetadata: {
          ...(clerkUser?.unsafeMetadata || {}), // 先获取已有 metadata，防止覆盖
          ...(values.name ? { name: values.name } : {}), // 仅在 name 存在时更新
          ...(values.bio ? { bio: values.bio } : {}), // 仅在 bio 存在时更新
        },
      });

      // reload
      clerkUser?.reload();
      //  update user profile
      await updateUser({
        userId: user.id,
        username: values.username,
        name: values.name,
        bio: values.bio,
        image: values.profile_photo,
        path: pathname,
      });
    } catch (error) {
      console.error("update user failed:", error);
    }

    // reasonable page jump
    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-10">
          {/* 图片上传 */}
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                  {/* 优先加载该图片资源 */}
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile_photo"
                      width="95"
                      height="96"
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile_photo"
                      width="24"
                      height="24"
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 名字 */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  Username
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                  Bio
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Textarea
                    rows={10}
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AccountProfile;
