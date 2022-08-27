import axios from "../utils/axios";
import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { updatePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";

export const EditPostPage = () => {
  const [model, setModel] = useState("");
  const [urlOff, setOff] = useState("");
  const [urlBook, setBook] = useState("");
  const [info, setInfo] = useState("");
  const [imgUrl, setImg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setModel(data.model);
    setInfo(data.info);
    setOff(data.urlOff);
    setBook(data.urlBook);
    setImg(data.imgUrl);
  }, [params.id]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("model", model);
      updatedPost.append("info", info);
      updatedPost.append("urlOff", urlOff);
      updatedPost.append("urlBook", urlBook);
      updatedPost.append("imgUrl", imgUrl);
      updatedPost.append("id", params.id);
      dispatch(updatePost(updatedPost));
      navigate("/posts");
      toast("Запис успішно оновлено");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <main>
      <div className="edit-page">
        <form className="add-post" onSubmit={(e) => e.preventDefault()}>
          <label>Модель :</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Введи модель"
            className="input-form"
          />
          <label>Посилання на офіційний сайт :</label>
          <input
            type="text"
            value={urlOff}
            onChange={(e) => setOff(e.target.value)}
            placeholder="Ввнди URL офф. сайту"
            className="input-form"
          />
          <label>Посилання на посібник :</label>
          <input
            type="text"
            value={urlBook}
            onChange={(e) => setBook(e.target.value)}
            placeholder="Введи URL посібника"
            className="input-form"
          />
          <label>Посилання на зображення допису :</label>
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImg(e.target.value)}
            placeholder=" Введи URL зображення посту"
            className="input-form"
          />
          <label>Текст допису :</label>
          <textarea
            placeholder="Введи текст допису"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            className="input-form-text"
          />

          <div className="edit-page-nav">
            <button className="save-btn" onClick={submitHandler}>
              Зберегти
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
