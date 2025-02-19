const GenderSelect = ({ register, error, defaultValue }: { register: any; error: any; defaultValue?: string }) => {
    return (
      <div className="flex flex-col gap-2 w-full md:w-2/5">
        <label className="text-xs text-gray-500">Gender</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("gender")}
          defaultValue={defaultValue}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
      </div>
    );
  };
  
  export default GenderSelect;
  