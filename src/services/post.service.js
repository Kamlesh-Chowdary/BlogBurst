import { axiosInstance } from "../helpers/axiosInstance";

export class postService {
  createPost = async () => {
    try {
      const response = await axiosInstance.post(`/posts/create-post`, {
        title,
        slug,
        content,
        featuredImage,
        status,
      });
      return response.data;
    } catch (error) {
      console.log("Error while creating the post", error.message);
    }
  };

  getAllPosts = async () => {
    try {
      const response = await axiosInstance.get(`/posts/get-posts`);
      return response.data;
    } catch (error) {
      console.log("Error while fetching all posts", error.message);
    }
  };

  getSinglePost = async (post_id) => {
    try {
      const response = await axiosInstance.get(`/posts/${post_id}`);
      return response.data;
    } catch (error) {
      console.log("Error while fetching single post", error.message);
    }
  };

  updatePost = async (slug_id) => {
    try {
      const response = await axiosInstance.patch(
        `/posts/update-post/${slug_id}`
      );
      return response.data;
    } catch (error) {
      console.log("Error while updating the post", error.message);
    }
  };

  updateFeaturedImage = async (image_id) => {
    try {
      const response = await axiosInstance(`/posts/update-image/${image_id}`);
      return response.data;
    } catch (error) {
      console.log("Error which updating the image", error.message);
    }
  };
}
