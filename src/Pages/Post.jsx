import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../services/post.service";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePost as deletePostSlice } from "../store/postSlice";
export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const isAuthor = post && userData ? post.owner._id === userData._id : false;

  useEffect(() => {
    if (slug) {
      postService.getSinglePost(slug).then((singlePost) => {
        setPost(singlePost.data);
      });
    } else navigate("/");
  }, []);

  const deletePost = () => {
    postService.deleteFeaturedImage(post._id);
    postService.deletePost(post.slug).then((status) => {
      if (status) {
        dispatch(deletePostSlice(post._id));
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 max-w-5xl m-auto rounded-xl    ">
      <h1 className="text-xl sm:text-none text-center text-gray-600 pb-4">
        <p className="font-bold inline"> Author </p>: {post.owner.fullname}
      </h1>
      <Container>
        <div className="w-full text-center grid gap-3 sm:flex  mb-2 sm:relative   p-2">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="rounded-xl max-wd-300 sm:max-w-md m-auto"
          />

          {isAuthor && (
            <div className="text-center mt-2 sm:absolute sm:right-6 sm:top-6 ">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6 ">
          <h1 className="text-2xl font-bold text-center">{post.title}</h1>
        </div>
        <div className=" text-center browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
