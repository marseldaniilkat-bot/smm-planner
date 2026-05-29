"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

interface CalendarProps {
  posts: any[];

  selectedClientId: number;

  month: number;
  year: number;

  onSelectPost: (
    post: any
  ) => void;

  onCreatePost: (
    date: string
  ) => void;

  onDragEnd: (
    result: any
  ) => void;
}

export default function Calendar({
  posts,
  selectedClientId,
  month,
  year,
  onSelectPost,
  onCreatePost,
  onDragEnd,
}: CalendarProps) {

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  return (

    <DragDropContext
      onDragEnd={onDragEnd}
    >

      <div className="overflow-x-auto">

  <div
    id="calendar-export"
    className="bg-white border border-[#ece7e4] rounded-[40px] overflow-hidden min-w-[1200px]"
  >

        {/* WEEK */}

        <div className="grid grid-cols-7 border-b border-[#ece7e4]">

          {[
            "Пн",
            "Вт",
            "Ср",
            "Чт",
            "Пт",
            "Сб",
            "Вс",
          ].map((day, index) => (

            <div
              key={index}
              className="p-6 text-center font-semibold text-[#1d1d1d]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* GRID */}

        <div className="grid grid-cols-7">

          {days.map((day) => {

            const formattedMonth =
              String(
                month + 1
              ).padStart(2, "0");

            const formattedDay =
              String(day).padStart(
                2,
                "0"
              );

            const fullDate =
              `${year}-${formattedMonth}-${formattedDay}`;

            const dayPosts =
              posts.filter(
                (post) =>
                  post.date ===
                    fullDate &&
                  post.clientId ===
                    selectedClientId
              );

            return (

              <Droppable
                droppableId={
                  fullDate
                }
                key={fullDate}
              >

                {(provided) => (

                  <div
                    ref={
                      provided.innerRef
                    }
                    {...provided.droppableProps}
                    className="min-h-[220px] border-r border-b border-[#ece7e4] p-4 hover:bg-[#faf8f7] transition"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <h2 className="font-semibold text-[#1d1d1d]">
                        {day}
                      </h2>

                      <button
                        onClick={() =>
                          onCreatePost(
                            fullDate
                          )
                        }
                        className="text-gray-400 text-xl"
                      >
                        +
                      </button>

                    </div>

                    <div className="space-y-3">

                      {dayPosts.map(
                        (
                          post,
                          index
                        ) => (

                          <Draggable
                            draggableId={
                              post.id
                            }
                            index={index}
                            key={post.id}
                          >

                            {(
                              provided
                            ) => (

                              <div
                                ref={
                                  provided.innerRef
                                }
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() =>
                                  onSelectPost(
                                    post
                                  )
                                }
                                className={`${post.color} border rounded-3xl p-4 cursor-pointer hover:scale-[1.02] transition`}
                              >

                                <div className="text-sm font-semibold text-black mb-2">

                                  {post.type}

                                </div>

                                <h3 className="font-bold text-[#1d1d1d]">

                                  {post.title}

                                </h3>

                                <p className="text-sm text-gray-600 mt-2">

                                  {post.description}

                                </p>

                                {post.imageUrl && (

                                  <img
                                    src={post.imageUrl}
                                    alt=""
                                    className="w-full h-[120px] object-cover rounded-2xl mt-4"
                                  />

                                )}

                              </div>
                            )}

                          </Draggable>
                        )
                      )}

                      {provided.placeholder}

                    </div>
                  </div>
                )}

              </Droppable>
            );
          })}
        </div>
      </div>
</div>
    </DragDropContext>
  );
}