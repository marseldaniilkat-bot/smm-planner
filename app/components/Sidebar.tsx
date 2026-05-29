interface SidebarProps {
  onCreate: () => void;

  totalPosts: number;

  currentPage: string;

  setCurrentPage: (
    page: string
  ) => void;
}

const menuItems = [
  "Календарь",
  "Контент",
  "Идеи",
  "Клиенты",
  "Аналитика",
];

export default function Sidebar({
  onCreate,
  totalPosts,
  currentPage,
  setCurrentPage,
}: SidebarProps) {

  return (

   <aside className="hidden md:flex md:w-[250px] bg-white border-r border-[#ece7e4] p-6 flex-col justify-between">

      <div>

        {/* LOGO */}

        <div className="mb-10">

          <div className="w-14 h-14 rounded-full bg-[#e8ded8] mb-4" />

          <h1 className="text-3xl font-bold text-[#1d1d1d]">
            SMM Planner
          </h1>

          <p className="text-gray-500 mt-1">
            premium workspace
          </p>

        </div>

        {/* MENU */}

        <div className="space-y-3">

          {menuItems.map(
            (item) => (

              <button
                key={item}
                onClick={() =>
                  setCurrentPage(
                    item
                  )
                }
                className={`w-full text-left px-5 py-4 rounded-2xl transition ${
                  currentPage ===
                  item
                    ? "bg-violet-100 text-violet-700"
                    : "hover:bg-[#f5f5f5] text-[#1d1d1d]"
                }`}
              >

                {item}

              </button>
            )
          )}

        </div>

        {/* CREATE */}

        <button
          onClick={onCreate}
          className="w-full bg-black text-white py-5 rounded-2xl mt-10 font-semibold"
        >
          + Создать контент
        </button>

      </div>

      {/* STATS */}

      <div className="bg-[#faf8f7] border border-[#ece7e4] rounded-3xl p-5">

        <p className="text-sm text-gray-500 mb-2">
          Контента создано
        </p>

        <h2 className="text-5xl font-bold text-[#1d1d1d]">
          {totalPosts}
        </h2>

      </div>
    </aside>
  );
}