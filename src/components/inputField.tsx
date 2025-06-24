import { FieldError, UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  onChange,
}: InputFieldProps) => {
  const { onChange: formOnChange, ...rest } = register(name);
  return (
    <div className="flex flex-col gap-2 w-full md:w-2/5">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...rest}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
        onChange={(e) => {
          formOnChange(e);
          onChange?.(e);
        }}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;