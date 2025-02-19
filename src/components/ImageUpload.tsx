import Image from "next/image";

const ImageUpload = ({ register, error, watch }: { register: any; error: any; watch: any }) => {
  const selectedImage = watch().image?.[0];

  return (
    <div className="flex flex-col gap-2 w-full md:w-2/5 justify-center">
      <label className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
        <Image src="/upload.png" alt="" width={28} height={28} />
        <span>Upload a photo</span>
      </label>

      {selectedImage && (
        <div className="flex items-center gap-2">
          <Image src={URL.createObjectURL(selectedImage)} alt="Selected Image" width={48} height={48} className="rounded-full w-12 h-12 object-cover" />
          <span className="text-sm">{selectedImage.name}</span>
        </div>
      )}

      <input type="file" id="img" {...register("image")} className="hidden" />

      {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
    </div>
  );
};

export default ImageUpload;
