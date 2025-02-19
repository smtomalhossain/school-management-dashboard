import { Controller } from "react-hook-form";
import Select from "react-select";


const MultiSelect = ({
  label,
  name,
  control,
  error,
  options,
}: {
  label: string;
  name: string;
  control: any;
  error: string | undefined;
  options: { value: string; label: string }[];
}) => {
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
            onChange={(selectedOptions) =>
              field.onChange(
                selectedOptions
                  ? selectedOptions.map((option) => option.value)
                  : []
              )
            }
            // Set the value based on the selected student IDs
            value={options.filter((option) =>
              field.value?.includes(option.value)
            )}
            placeholder="Select students..."
          />
        )}
      />
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default MultiSelect