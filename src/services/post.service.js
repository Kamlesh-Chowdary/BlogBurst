import { axiosInstance } from "../helpers/axiosInstance";

export class PostService {
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
      console.log(
        "Error while creating the post:",
        error.response.data.message
      );
    }
  };

  getAllPosts = async () => {
    try {
      const response = await axiosInstance.get(`/posts/get-posts`);
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching all posts:",
        error.response.data.message
      );
    }
  };

  getSinglePost = async (post_id) => {
    try {
      const response = await axiosInstance.get(`/posts/${post_id}`);
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching single post:",
        error.response.data.message
      );
    }
  };

  updatePost = async (slug_id) => {
    try {
      const response = await axiosInstance.patch(
        `/posts/update-post/${slug_id}`
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while updating the post:",
        error.response.data.message
      );
    }
  };

  updateFeaturedImage = async (image_id) => {
    try {
      const response = await axiosInstance.patch(
        `/posts/update-image/${image_id}`
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error which updating the image:",
        error.response.data.message
      );
    }
  };

  deletePost = async (slug_id) => {
    try {
      const response = await axiosInstance.delete(
        `/posts/delete-post/${slug_id}`
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while deleting the post:",
        error.response.data.message
      );
    }
  };

  deleteFeaturedImage = async (image_id) => {
    try {
      const response = await axiosInstance.delete(
        `/posts/delete-image/${image_id}`
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while deleting the featuredImage:",
        error.response.data.message
      );
    }
  };
}

const postService = new postService();
export { postService };
