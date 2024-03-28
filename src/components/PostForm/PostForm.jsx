import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import postService from "../../services/post.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, RTE, Input, Select } from "../index";
import { addPost, updatePost } from "../../store/postSlice";
const PostForm = ({ post }) => {
  console.log(post);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (data) => {
    if (post) {
      setError("");
      try {
        console.log(post.featuredImage);
        postService.deleteFeaturedImage(post.featuredImage);
      } catch (error) {
        setError(error.message);
      }

      const dbPost = await postService.updatePost(post.$id, {
        ...data,
        featuredImage: data.featuredImage ? data.featuredImage[0] : undefined,
      });

      if (dbPost) {
        dispatch(updatePost(dbPost));
        navigate(`/post/${dbPost.slug}`);
      }
    } else {
      const dbPost = await postService.createPost({
        ...data,
        featuredImage: data.featuredImage[0],
      });

      if (dbPost) {
        dispatch(addPost(dbPost));
        navigate(`/post/${dbPost.slug}`);
      }
    }
  };

  const slugTransform = (title) => {
    if (title && typeof title === "string") {
      return title
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");
    }
    return "";
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-full md:w-2/3 px-2">
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <Input
          label="Title :"
          className="mb-4"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          name="content"
          label="Content :"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="md:w-1/3 p-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", {
            required: !post,
          })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          label="Status :"
          options={["active", "inactive"]}
          className="mb-4 w-full"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
