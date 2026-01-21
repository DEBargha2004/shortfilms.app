"use client";

import { hrefs, TPresignedUrl } from "@/constants/hrefs";
import { tryCatch } from "@/lib/utils";
import { ErrorResponse } from "@/types/response";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

export default function useFileUpload({
  requestPresigner,
}: {
  requestPresigner: (mimetype: string) => Promise<AxiosResponse<TPresignedUrl>>;
}) {
  const [uploadState, setUploadState] = useState({
    hasUploadStarted: false,
    isUploading: false,
    isUploaded: false,
    isFailed: false,
    uploadPercentage: 0,
  });

  const getUploadUrl = async (mimetype: string) => {
    const [res, err] = await tryCatch<
      AxiosResponse<TPresignedUrl>,
      AxiosError<ErrorResponse>
    >(requestPresigner(mimetype));
    if (err)
      throw new Error(err.response?.data.code, {
        cause: err.response?.data.message,
      });

    return res!.data;
  };

  const upload = async (file: File): Promise<TPresignedUrl> => {
    if (!file) throw new Error("File Does not exist");

    setUploadState((prev) => ({
      ...prev,
      hasUploadStarted: true,
      isUploading: true,
    }));
    const { path, url } = await getUploadUrl(file.type);

    const [res, err] = await tryCatch(
      axios.put(url, file, {
        onUploadProgress(progressEvent) {
          const { total, loaded } = progressEvent;
          const percentage = Math.round(((loaded ?? 0) / (total ?? 1)) * 100);
          setUploadState((prev) => ({
            ...prev,
            uploadPercentage: percentage,
          }));
        },
        headers: {
          "Content-Type": file.type,
        },
      })
    );

    if (err) {
      setUploadState((prev) => ({
        ...prev,
        isFailed: true,
        isUploading: false,
      }));
      throw new Error(err.code, { cause: err.message });
    }

    setUploadState((prev) => ({
      ...prev,
      isUploading: false,
      isUploaded: true,
    }));

    return { path, url };
  };

  return {
    upload,
    uploadPercentage: uploadState.uploadPercentage,
    isFailed: uploadState.isFailed,
    isUploaded: uploadState.isUploaded,
    isUploading: uploadState.isUploading,
    hadUploadStarted: uploadState.hasUploadStarted,
  };
}
