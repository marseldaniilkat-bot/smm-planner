interface MonthSwitcherProps {
  month: number;
  year: number;

  nextMonth: () => void;
  prevMonth: () => void;
}

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default function MonthSwitcher({
  month,
  year,
  nextMonth,
  prevMonth,
}: MonthSwitcherProps) {

  return (

    <div className="flex items-center gap-4">

      <button
        onClick={prevMonth}
        className="w-12 h-12 rounded-2xl bg-white border border-[#ece7e4]"
      >
        ←
      </button>

      <div className="bg-white border border-[#ece7e4] rounded-2xl px-6 py-4">

        <h2 className="text-xl font-bold text-[#1d1d1d]">

          {months[month]}
          {" "}
          {year}

        </h2>

      </div>

      <button
        onClick={nextMonth}
        className="w-12 h-12 rounded-2xl bg-white border border-[#ece7e4]"
      >
        →
      </button>

    </div>
  );
}