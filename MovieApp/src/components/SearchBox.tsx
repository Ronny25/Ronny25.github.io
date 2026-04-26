interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="search for a movie..."
        className="w-full p-4 text-lg border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
