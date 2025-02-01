import React from "react";

const Page = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="border-b border-[#cacfd4] mb-5 pb-[18px] gap-2">
          <h3 className="text-black font-semibold">Create School</h3>
          <p
            className="text-gray-500 text-xs font-medium
                "
          >
            Provide all the information required for your school. Also provide a
            admin information with email and passwoard. <br /> So that admin can
            access the created school.
          </p>
        </div>
        <div className="flex flex-col md:flex-row m-5 gap-8 ">
          {/* LEFT */}
          <div className="w-full md:w-1/2 pb-3 flex flex-col gap-4">
            <div className="">
              <h3 className="text-sm font-semibold text-black">SCHOOL INFO</h3>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                School Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                School Address
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                School Email
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                School Phone
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 mb-3 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 flex flex-col">
              <label className="text-sm text-gray-500 font-semibold mb-2 block">
                School Logo
              </label>
              <input
                type="file"
                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 ring-[1.5px] ring-gray-300 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              />
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full md:w-1/2 pb-3 flex flex-col gap-4">
            <div className="">
              <h3>ADMIN INFO</h3>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Admin Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Admin Address
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Admin Phone
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 flex flex-col">
              <label className="text-sm text-gray-500 font-semibold mb-2 block">
                Admin Picture
              </label>
              <input
                type="file"
                className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 ring-[1.5px] ring-gray-300 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
              />
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Admin Email
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full lg:sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Admin Password
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white  outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder=""
                    className=" ring-[1.5px] ring-gray-300 rounded-md  w-full block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
