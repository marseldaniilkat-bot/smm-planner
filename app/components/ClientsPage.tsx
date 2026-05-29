interface Client {
  id: number;
  name: string;
}

interface ClientsPageProps {
  clients: Client[];

  renameClient: (
    id: number,
    name: string
  ) => void;
}

export default function ClientsPage({
  clients,
  renameClient,
}: ClientsPageProps) {

  return (

    <div className="grid grid-cols-2 gap-6">

      {clients.map((client) => (

        <div
          key={client.id}
          className="bg-white rounded-[30px] p-6 border border-[#ece7e4]"
        >

          <p className="text-sm text-gray-400 mb-3">
            Название клиента
          </p>

          <input
            type="text"
            value={client.name}
            onChange={(e) =>
              renameClient(
                client.id,
                e.target.value
              )
            }
            className="w-full text-2xl font-bold text-[#1d1d1d] outline-none bg-transparent"
          />

          <div className="mt-6 bg-[#f6f3f1] rounded-2xl p-4">

            <p className="text-sm text-gray-500">
              Workspace клиента
            </p>

          </div>

        </div>
      ))}
    </div>
  );
}