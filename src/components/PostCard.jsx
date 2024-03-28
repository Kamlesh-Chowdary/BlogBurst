import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ slug, title, featuredImage }) => {
  return (
    <Link to={`/post/${slug}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-3">
          <img src={featuredImage} alt={title} className="rounded-xl mx-auto" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
