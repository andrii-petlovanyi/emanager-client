import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostItem } from "../components/PostItem";
import "../index.css";
import { getAllPost } from "../redux/features/post/postSlice";

export const MainPage = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  let shortPosts = [];
  for (let i = 0; i < 10; i++) {
    shortPosts.push(posts[i]);
  }

  if (!user) {
    return <main>Авторизуйтесь</main>;
  }

  if (!posts.length) {
    return <main>Записи відсутні</main>;
  }

  return (
    <main>
      {user?._id &&
        shortPosts?.map((post, idx) => <PostItem key={idx} post={post} />)}
    </main>
  );
};
