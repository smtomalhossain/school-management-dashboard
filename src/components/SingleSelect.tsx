const SingleSelect = ({
  register,
  name,
  label,
  options,
  defaultValue,
  unselectable,
  error,
}: {
  register: any;
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  unselectable: string;
  error: any;
}) => {
  console.log(defaultValue);
  console.log(options);
  return (
    <div className="flex flex-col gap-2 w-full md:w-2/5">
      <label className="text-xs text-gray-500">{label}</label>
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register(name)}
        defaultValue={defaultValue}
      >
        <option value="" style={{ color: "#9CA3AF" }}>
          {unselectable}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default SingleSelect;
