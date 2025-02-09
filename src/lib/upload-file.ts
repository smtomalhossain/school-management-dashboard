interface UploadFileResponse {
    messaage: string;
    fileName: string;
}

export const uploadFile = async (file: File | null): Promise<string | undefined> => {
    if (!file) return;
    const formData = new FormData();
    formData.append("fileUpload", file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file/upload`, {
        method: "POST",
        body: formData,
    });

    const data: UploadFileResponse = await response.json();
    return data.fileName;
};
