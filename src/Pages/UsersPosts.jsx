import React, { useState, useEffect } from "react";
import { Container, PostCard, Button } from "../components/index";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
const UsersPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    authService.currentUsersPosts().then((userPosts) => {
      if (userPosts) setPosts(userPosts.data.userPosts);
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="grid sm:flex sm:flex-wrap">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-2 mx-auto text-center sm:w-1/4 sm:m-0"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold ">
              Looks like there are no blogs yet. Why not create one?
            </h1>
            <Button
              className="hover:bg-blue-800 mt-5"
              onClick={() => navigate("/add-post")}
            >
              Add Blog
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default UsersPosts;
