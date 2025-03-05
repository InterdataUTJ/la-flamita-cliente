interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}

export default function Input({ label, name, placeholder, type = "text", ...rest }: InputProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={`${name}-${type}-${placeholder}`}
        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={`${name}-${type}-${placeholder}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
