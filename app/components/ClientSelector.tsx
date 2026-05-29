interface Client {
  id: number;
  name: string;
}

interface ClientSelectorProps {
  clients: Client[];

  selectedClientId: number;

  onSelect: (
    id: number
  ) => void;

  onAddClient: () => void;
}

export default function ClientSelector({
  clients,
  selectedClientId,
  onSelect,
  onAddClient,
}: ClientSelectorProps) {

  return (

    <div className="flex gap-5 mb-10 overflow-x-auto">

      {clients.map((client) => {

        const isActive =
          selectedClientId ===
          client.id;

        return (

          <button
            key={client.id}
            onClick={() =>
              onSelect(
                client.id
              )
            }
            className={`min-w-[240px] rounded-[30px] p-6 transition text-left shrink-0 ${
              isActive
                ? "bg-violet-600 text-white"
                : "bg-white border border-[#ece7e4] text-[#1d1d1d]"
            }`}
          >

            <h2 className="text-2xl font-bold break-words">

              {client.name}

            </h2>

            <p className="mt-2 opacity-70">

              Workspace клиента

            </p>

          </button>
        );
      })}

      <button
        onClick={onAddClient}
        className="min-w-[240px] rounded-[30px] p-6 border-2 border-dashed border-violet-300 bg-white text-violet-600 shrink-0"
      >

        <div className="text-4xl mb-2">
          +
        </div>

        <h2 className="text-xl font-bold">
          Новый клиент
        </h2>

      </button>

    </div>
  );
}