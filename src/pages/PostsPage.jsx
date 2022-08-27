import React, { useState, useEffect } from "react";
import { PostItem } from "../components/PostItem";
import axios from "../utils/axios";
import { AiOutlineSearch } from "react-icons/ai";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const fetchMyPosts = async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const filterPost = posts.filter((post) => {
    return post.model.includes(value.toLowerCase());
  });

  return (
    <main>
      <div className="search-block">
        <AiOutlineSearch
          size={30}
          style={{ transform: "rotate(90deg)", marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="Вводь модель для пошуку..."
          onChange={(e) => setValue(e.target.value)}
          className="search"
        />
      </div>
      {filterPost?.map((post, idx) => (
          <PostItem post={post} key={idx} />
        ))}
    </main>
  );
};
