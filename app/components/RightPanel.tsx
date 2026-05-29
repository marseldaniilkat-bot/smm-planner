"use client";

import { useEffect, useState } from "react";

interface RightPanelProps {
  selectedPost: any;

  onClose: () => void;

  onDelete: (
    id: string
  ) => void;

  onUpdate: (
    id: string,
    title: string,
    description: string,
    date: string
  ) => void;
}

export default function RightPanel({
  selectedPost,
  onClose,
  onDelete,
  onUpdate,
}: RightPanelProps) {

  const [editTitle,
    setEditTitle] =
    useState("");

  const [editDescription,
    setEditDescription] =
    useState("");

  const [editDate,
    setEditDate] =
    useState("");

  useEffect(() => {

    if (selectedPost) {

      setEditTitle(
        selectedPost.title
      );

      setEditDescription(
        selectedPost.description
      );

      setEditDate(
        selectedPost.date
      );
    }

  }, [selectedPost]);

  return (

    <aside className="w-[400px] bg-white border-l border-[#ece7e4] p-8 overflow-y-auto">

      {selectedPost ? (

        <>

          {/* HEADER */}

          <div className="flex items-center justify-between mb-8">

            <button
              onClick={onClose}
              className="text-2xl text-black"
            >
              ✕
            </button>

            <button
              onClick={() =>
                onDelete(
                  selectedPost.id
                )
              }
              className="bg-red-100 text-red-600 px-4 py-2 rounded-2xl"
            >
              Удалить
            </button>

          </div>

          {/* TYPE */}

          <div className="bg-pink-100 text-pink-600 px-4 py-2 rounded-2xl font-semibold w-fit mb-6">

            {selectedPost.type}

          </div>

          {/* TITLE */}

          <input
            value={editTitle}
            onChange={(e) =>
              setEditTitle(
                e.target.value
              )
            }
            className="w-full text-4xl font-bold text-[#1d1d1d] outline-none mb-8"
          />

          {/* DESCRIPTION */}

          <textarea
            value={editDescription}
            onChange={(e) =>
              setEditDescription(
                e.target.value
              )
            }
            className="w-full min-h-[220px] text-gray-600 outline-none resize-none"
          />

          {/* DATE */}

          <div className="mt-10">

            <p className="text-sm text-gray-500 mb-3">
              Дата публикации
            </p>

            <input
              type="date"
              value={editDate}
              onChange={(e) =>
                setEditDate(
                  e.target.value
                )
              }
              className="w-full border border-[#ece7e4] rounded-2xl p-4 text-black"
            />

          </div>

          {/* SAVE */}

          <button
            onClick={() =>
              onUpdate(
                selectedPost.id,
                editTitle,
                editDescription,
                editDate
              )
            }
            className="w-full bg-violet-600 text-white py-5 rounded-2xl mt-10 font-semibold"
          >
            Сохранить изменения
          </button>

        </>

      ) : (

        <div className="h-full flex items-center justify-center text-gray-400 text-lg">

          Выберите контент

        </div>
      )}

    </aside>
  );
}