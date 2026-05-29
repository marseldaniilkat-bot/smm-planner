"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  db,
  auth,
} from "./firebase";

import { exportCalendarToPDF } from "../lib/exportPdf";

import Sidebar from "./components/Sidebar";
import ClientSelector from "./components/ClientSelector";
import Calendar from "./components/Calendar";
import RightPanel from "./components/RightPanel";
import CreateModal from "./components/CreateModal";
import Analytics from "./components/Analytics";
import Ideas from "./components/Ideas";
import ClientsPage from "./components/ClientsPage";
import MonthSwitcher from "./components/MonthSwitcher";
import Auth from "./components/Auth";

const initialClients = [
  {
    id: 1,
    name: "Kenwood",
  },
  {
    id: 2,
    name: "Коуч",
  },
  {
    id: 3,
    name: "Hair Stylist",
  },
];

export default function Home() {

  const today = new Date();

  const [month,
    setMonth] =
    useState(
      today.getMonth()
    );

  const [year,
    setYear] =
    useState(
      today.getFullYear()
    );

  const [clients,
    setClients] =
    useState(initialClients);

  const [currentPage,
    setCurrentPage] =
    useState("Календарь");

  const [selectedClientId,
    setSelectedClientId] =
    useState(1);

  const [open,
    setOpen] =
    useState(false);

  const [selectedPost,
    setSelectedPost] =
    useState<any>(null);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [selectedDate,
    setSelectedDate] =
    useState("");

  const [status,
    setStatus] =
    useState("idea");

  const [posts,
    setPosts] =
    useState<any[]>([]);

  const [user,
    setUser] =
    useState<any>(null);

  useEffect(() => {

    loadPosts();

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(
            currentUser
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  const loadPosts = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "posts")
      );

    const loadedPosts: any[] = [];

    querySnapshot.forEach(
      (docItem) => {

        loadedPosts.push({
          id: docItem.id,
          ...docItem.data(),
        });
      }
    );

    setPosts(loadedPosts);
  };

  const getColorByStatus = (
    status: string
  ) => {

    switch (status) {

      case "idea":
        return "bg-yellow-50 border-yellow-200";

      case "shoot":
        return "bg-orange-50 border-orange-200";

      case "edit":
        return "bg-blue-50 border-blue-200";

      case "publish":
        return "bg-violet-50 border-violet-200";

      case "done":
        return "bg-green-50 border-green-200";

      default:
        return "bg-pink-50 border-pink-200";
    }
  };

  const savePost = async (
    imageUrl?: string
  ) => {

    if (
      !title ||
      !selectedDate
    ) return;

    const newPost = {
      date: selectedDate,
      clientId:
        selectedClientId,
      type: "Reels",
      title,
      description,
      imageUrl:
        imageUrl || "",
      status,
      color:
        getColorByStatus(
          status
        ),
      userId:
        user?.uid || "",
    };

    await addDoc(
      collection(db, "posts"),
      newPost
    );

    await loadPosts();

    setTitle("");
    setDescription("");
    setSelectedDate("");
    setStatus("idea");

    setOpen(false);
  };

  const updatePost = async (
    id: string,
    title: string,
    description: string,
    date: string
  ) => {

    await updateDoc(
      doc(db, "posts", id),
      {
        title,
        description,
        date,
      }
    );

    await loadPosts();
  };

  const deletePost = async (
    id: string
  ) => {

    await deleteDoc(
      doc(db, "posts", id)
    );

    await loadPosts();

    setSelectedPost(null);
  };

  const handleDragEnd = async (
    result: any
  ) => {

    if (
      !result.destination
    ) return;

    const postId =
      result.draggableId;

    const newDate =
      result.destination
        .droppableId;

    await updateDoc(
      doc(db, "posts", postId),
      {
        date: newDate,
      }
    );

    await loadPosts();
  };

  const renameClient = (
    id: number,
    name: string
  ) => {

    setClients((prev) =>
      prev.map((client) =>
        client.id === id
          ? {
              ...client,
              name,
            }
          : client
      )
    );
  };

  const nextMonth = () => {

    if (month === 11) {

      setMonth(0);

      setYear(
        year + 1
      );

    } else {

      setMonth(
        month + 1
      );
    }
  };

  const prevMonth = () => {

    if (month === 0) {

      setMonth(11);

      setYear(
        year - 1
      );

    } else {

      setMonth(
        month - 1
      );
    }
  };

  return (

    <main className="min-h-screen bg-[#f6f3f1] flex">

      <Sidebar
        onCreate={() =>
          setOpen(true)
        }
        totalPosts={
          posts.length
        }
        currentPage={
          currentPage
        }
        setCurrentPage={
          setCurrentPage
        }
      />

      <section className="flex-1 p-8 overflow-y-auto">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-5xl font-bold text-[#1d1d1d]">

              {currentPage}

            </h1>

            <p className="text-gray-500 mt-2">
              premium workspace
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={
                exportCalendarToPDF
              }
              className="bg-white border border-[#ece7e4] text-black px-6 py-4 rounded-2xl"
            >
              Скачать план
            </button>

            <button
              onClick={() =>
                setOpen(true)
              }
              className="bg-black text-white px-6 py-4 rounded-2xl"
            >
              + Новый пост
            </button>

            <Auth user={user} />

          </div>

        </div>

        {currentPage ===
          "Календарь" && (

          <>

            <div className="mb-8">

              <MonthSwitcher
                month={month}
                year={year}
                nextMonth={
                  nextMonth
                }
                prevMonth={
                  prevMonth
                }
              />

            </div>

            <ClientSelector
              clients={clients}
              selectedClientId={
                selectedClientId
              }
              onSelect={
                setSelectedClientId
              }
            />

            <Calendar
              posts={posts}
              selectedClientId={
                selectedClientId
              }
              month={month}
              year={year}
              onSelectPost={
                setSelectedPost
              }
              onCreatePost={(
                date: string
              ) => {

                setSelectedDate(
                  date
                );

                setOpen(true);
              }}
              onDragEnd={
                handleDragEnd
              }
            />

          </>
        )}

        {currentPage ===
          "Аналитика" && (
          <Analytics />
        )}

        {currentPage ===
          "Идеи" && (
          <Ideas />
        )}

        {currentPage ===
          "Клиенты" && (

          <ClientsPage
            clients={clients}
            renameClient={
              renameClient
            }
          />
        )}

      </section>

      <RightPanel
        selectedPost={
          selectedPost
        }
        onClose={() =>
          setSelectedPost(
            null
          )
        }
        onDelete={
          deletePost
        }
        onUpdate={
          updatePost
        }
      />

      <CreateModal
        open={open}
        selectedDate={
          selectedDate
        }
        title={title}
        description={
          description
        }
        status={status}
        onClose={() =>
          setOpen(false)
        }
        onSave={savePost}
        setTitle={setTitle}
        setDescription={
          setDescription
        }
        setSelectedDate={
          setSelectedDate
        }
        setStatus={setStatus}
      />

    </main>
  );
}