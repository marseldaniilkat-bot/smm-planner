"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function ContentModal({
  setOpen,
  loadPosts,
}: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [type, setType] = useState("Reels");

  const [date, setDate] = useState("");

  const savePost = async () => {
    if (!title) return;

    try {
      await addDoc(collection(db, "posts"), {
        title,
        description,
        type,
        date,
        createdAt: new Date(),
      });

      loadPosts();

      setOpen(false);

      setTitle("");
      setDescription("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-8 rounded-[32px] w-[500px] shadow-2xl">

        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          Создать контент
        </h2>

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Название поста"
            className="w-full border border-gray-200 bg-[#F8FAFC] text-black placeholder-gray-400 p-4 rounded-2xl outline-none text-lg"
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Описание / идеи / сценарий"
            className="w-full border border-gray-200 bg-[#F8FAFC] text-black placeholder-gray-400 p-4 rounded-2xl outline-none h-[140px] text-lg"
          />

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
            className="w-full border border-gray-200 bg-[#F8FAFC] text-black p-4 rounded-2xl outline-none text-lg"
          >
            <option>Reels</option>
            <option>Stories</option>
            <option>TikTok</option>
            <option>Post</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full border border-gray-200 bg-[#F8FAFC] text-black p-4 rounded-2xl outline-none text-lg"
          />

          <button
            onClick={savePost}
            className="w-full bg-[#7B61FF] hover:bg-[#684bff] transition text-white py-4 rounded-2xl font-semibold text-lg"
          >
            Сохранить контент
          </button>

        </div>
      </div>
    </div>
  );
}