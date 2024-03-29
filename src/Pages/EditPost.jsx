import React, { useState, useEffect } from "react";
import { Container, LoadingComponent, PostForm } from "../components/index";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import postService from "../services/post.service";
const EditPost = () => {
  const [post, setPost] = useState([]);
  const loading = useSelector((state) => state.post.loading);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postService.getSinglePost(slug).then((singlePost) => {
        setPost(singlePost.data);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (!loading) {
    if (post.title) {
      return (
        <div className="py-8">
          <Container className="w-5xl">
            <PostForm post={post} />
          </Container>
        </div>
      );
    }
  } else {
    return (
      <div className="py-8">
        <Container>
          <LoadingComponent />
        </Container>
      </div>
    );
  }
};

export default EditPost;
