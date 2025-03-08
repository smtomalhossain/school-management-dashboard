import { Controller, FieldError, Merge } from "react-hook-form";
import Select, { MultiValue } from "react-select";

type MultiSelectProps = {
  label: string;
  name: string;
  control: any;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange?: (selectedOptions: MultiValue<{ value: string; label: string }>) => void | undefined;
}

const MultiSelect = ({
  label,
  name,
  control,
  error,
  options,
  placeholder,
  onChange,
}: MultiSelectProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-2/5">
      <label className="text-xs text-gray-500">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            isMulti
            options={options}
            onChange={(selectedOptions) =>{
              field.onChange(
                selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
              )
              onChange?.(selectedOptions)
            }}
            // Set the value based on the selected student IDs
            value={options.filter((option) =>
              field.value?.includes(option.value)
            )}
            placeholder={placeholder}
          />
        )}
      />
      {error?.message && (
        <p className="text-xs text-red-400">
          {error.message.toString()}
        </p>
      )}
    </div>
  );
}

export default MultiSelect