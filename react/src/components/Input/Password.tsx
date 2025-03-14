import { useState } from "react";
import { InputProps } from "./types";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

export default function PasswordInput(props: InputProps) {

  const [type, setType] = useState("password");
  const handleTogglePassword = () => setType(currentType => currentType === "password" ? "text" : "password");

  return (
    <div className="flex">
      <input
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={props.ref}
        disabled={props.disabled}
        type={type}
        name={props.name}
        id={`${props.name}-password-${props.placeholder}`}
        placeholder={props.placeholder}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength}
        pattern={props.pattern}
        className={`rounded-l-lg rounded-r-none ${props.className}`} 
      />
      <button 
        type="button" 
        onClick={handleTogglePassword}
        className="text-white bg-tertiary-700 hover:bg-tertiary-600 active:bg-tertiary-800 px-4 rounded-r-lg"
      >
        { type === "password" ? <IconEye /> : <IconEyeOff /> }
      </button>
    </div>
  );
}