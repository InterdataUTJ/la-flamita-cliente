import { FileInputProps } from "./types";

export default function Input(props: FileInputProps) {
  return (
    <div className="mb-7">
      <label className="block mb-1 text-sm font-semibold text-gray-900" htmlFor={`${props.name}-component-InputFile`}>
        {props.label}
        { props.required && <span className="ml-1 text-red-600">*</span> }
        </label>
      <p className="mt-1 text-sm text-gray-500 mb-2">{props.description || props.label}</p>
      <input 
        type="file" 
        name={props.name}
        id={`${props.name}-component-InputFile`} 
        accept={props.accept || "image/apng,image/avif,image/gif,image/jpeg,image/png,image/webp,image/svg+xml"}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        disabled={props.disabled}
        required={props.required}
        ref={props.ref}
        multiple={props.multiple}
      />
    </div>
  );
}