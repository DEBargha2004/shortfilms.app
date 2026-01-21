"use client";

export default function useFileReader() {
  const read = (file: File) =>
    new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        res(reader.result as string);
      };

      reader.onerror = () => {
        rej(reader.error);
      };
    });

  const base64ToBuffer = (
    base64: string,
    filename?: string,
    mimetype?: string
  ) => {
    const arr = base64.split(",");
    const mime = mimetype || arr[0].match(/:(.*?);/)?.[1] || "";
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename ?? "", { type: mime });
  };

  return { read, base64ToBuffer };
}
