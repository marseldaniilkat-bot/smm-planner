"use client";

import { useState } from "react";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "../firebase";

interface CreateModalProps {
  open: boolean;

  selectedDate: string;

  title: string;

  description: string;

  status: string;

  onClose: () => void;

  onSave: (
    imageUrl?: string
  ) => void;

  setTitle: (
    value: string
  ) => void;

  setDescription: (
    value: string
  ) => void;

  setSelectedDate: (
    value: string
  ) => void;

  setStatus: (
    value: string
  ) => void;
}

const statuses = [
  {
    label: "Идея",
    value: "idea",
    color: "bg-yellow-100",
  },
  {
    label: "Съёмка",
    value: "shoot",
    color: "bg-orange-100",
  },
  {
    label: "Монтаж",
    value: "edit",
    color: "bg-blue-100",
  },
  {
    label: "Публикация",
    value: "publish",
    color: "bg-violet-100",
  },
  {
    label: "Готово",
    value: "done",
    color: "bg-green-100",
  },
];

export default function CreateModal({
  open,
  selectedDate,
  title,
  description,
  status,
  onClose,
  onSave,
  setTitle,
  setDescription,
  setSelectedDate,
  setStatus,
}: CreateModalProps) {

  const [uploading,
    setUploading] =
    useState(false);

  const [imageUrl,
    setImageUrl] =
    useState("");

  if (!open) return null;

  const handleImageUpload =
    async (
      e: any
    ) => {

      const file =
        e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const storageRef =
        ref(
          storage,
          `posts/${Date.now()}-${file.name}`
        );

      await uploadBytes(
        storageRef,
        file
      );

      const downloadURL =
        await getDownloadURL(
          storageRef
        );

      setImageUrl(
        downloadURL
      );

      setUploading(false);
    };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-[650px] rounded-[40px] p-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-black">

            Новый контент

          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-black"
          >
            ✕
          </button>

        </div>

        {/* TITLE */}

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Название"
          className="w-full border border-[#ece7e4] rounded-2xl p-5 mb-5 outline-none text-black placeholder:text-gray-400"
        />

        {/* DESCRIPTION */}

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Описание"
          className="w-full min-h-[180px] border border-[#ece7e4] rounded-2xl p-5 mb-5 outline-none resize-none text-black placeholder:text-gray-400"
        />

        {/* DATE */}

        <input
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(
              e.target.value
            )
          }
          className="w-full border border-[#ece7e4] rounded-2xl p-5 mb-5 outline-none text-black"
        />

        {/* STATUS */}

        <div className="mb-6">

          <p className="text-sm text-gray-500 mb-3">

            Статус

          </p>

          <div className="flex flex-wrap gap-3">

            {statuses.map(
              (item) => (

                <button
                  key={item.value}
                  onClick={() =>
                    setStatus(
                      item.value
                    )
                  }
                  className={`px-5 py-3 rounded-2xl border transition ${
                    status ===
                    item.value
                      ? "border-black scale-105"
                      : "border-transparent"
                  } ${item.color}`}
                >

                  {item.label}

                </button>
              )
            )}

          </div>

        </div>

        {/* IMAGE */}

        <div className="mb-6">

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageUpload
            }
            className="text-black"
          />

        </div>

        {/* LOADING */}

        {uploading && (

          <p className="mb-4 text-gray-500">

            Загрузка...

          </p>
        )}

        {/* PREVIEW */}

        {imageUrl && (

          <img
            src={imageUrl}
            alt="preview"
            className="w-full h-[220px] object-cover rounded-3xl mb-6"
          />

        )}

        {/* SAVE */}

        <button
          onClick={() =>
            onSave(
              imageUrl
            )
          }
          className="w-full bg-black text-white py-5 rounded-2xl font-semibold"
        >
          Сохранить
        </button>

      </div>

    </div>
  );
}