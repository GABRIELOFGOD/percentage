type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
};

export function InputField({ label, value, setValue, placeholder }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
      />
    </div>
  );
}
