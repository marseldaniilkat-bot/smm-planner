export default function Ideas() {

  const ideas = [
    "5 ошибок в reels",
    "Почему охваты падают",
    "Тренды 2026",
    "Секрет viral hooks",
    "Как вести Stories",
  ];

  return (

    <div className="space-y-5">

      {ideas.map((idea, index) => (

        <div
          key={index}
          className="bg-white rounded-[30px] p-6 border border-[#ece7e4]"
        >

          <h2 className="text-2xl font-bold text-[#1d1d1d]">

            {idea}

          </h2>

        </div>
      ))}
    </div>
  );
}