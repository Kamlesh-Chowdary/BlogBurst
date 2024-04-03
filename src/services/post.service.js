import { axiosInstance } from "../helpers/axiosInstance";

export class PostService {
  createPost = async ({ title, slug, content, featuredImage, status }) => {
    try {
      const response = await axiosInstance.post(
        `/posts/create-post`,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
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
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.get(`/posts/get-posts`, config);
      return response.data.data;
    } catch (error) {
      console.log(
        "Error while fetching all posts:",
        error.response.data.message
      );
    }
  };

  getSinglePost = async (post_id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.get(`/posts/${post_id}`, config);
      return response.data;
    } catch (error) {
      console.log(
        "Error while fetching single post:",
        error.response.data.message
      );
    }
  };

  updatePost = async (
    slug_id,
    { title, slug, content, featuredImage, status }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.patch(
        `/posts/update-post/${slug_id}`,
        { title, slug, content, featuredImage, status },
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while updating the post:",
        error.response.data.message
      );
    }
  };

  updateFeaturedImage = async (featuredImage) => {
    try {
      const response = await axiosInstance.post(
        `/posts/update-image`,
        { featuredImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
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
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.delete(
        `/posts/delete-post/${slug_id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(
        "Error while deleting the post:",
        error.response.data.message
      );
    }
  };

  deleteFeaturedImage = async (post_id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const response = await axiosInstance.delete(
        `/posts/delete-image/${post_id}`,
        config
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

const postService = new PostService();
export default postService;
