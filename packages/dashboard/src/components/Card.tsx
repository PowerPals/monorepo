export default function Card({ title, description, children }: { title: string, description: string, children?: React.ReactNode }) {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex justify-between">{children}</div>
        </div>
      </div>
    );
  }