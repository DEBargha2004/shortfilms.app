"use client";

import { tryCatch } from "@/lib/utils";
import { ErrorResponse } from "@/types/response";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { Upload as TusUpload } from "tus-js-client";

type TUploadSecret = {
  signature: string;
  libraryId: string;
  expires: number;
  videoId: string;
};

export default function useVideoUpload() {
  const [uploadState, setUploadState] = useState({
    hasUploadStarted: false,
    isUploading: false,
    isUploaded: false,
    isFailed: false,
  });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  async function getUploadSecret(source: string) {
    const [res, error] = await tryCatch<
      AxiosResponse<TUploadSecret>,
      AxiosError<ErrorResponse>
    >(axios.get(source));

    if (error) {
      throw error;
    }

    return res?.data;
  }

  async function upload(
    file: File,
    getPresignedUrlSource: (mimetype: string) => string
  ) {
    return new Promise<TUploadSecret>(async (res, rej) => {
      setUploadState((prev) => ({
        ...prev,
        isUploading: true,
        hasUploadStarted: true,
      }));
      const secret = await getUploadSecret(getPresignedUrlSource(file.type));
      if (!secret) {
        return setUploadState((prev) => ({
          ...prev,
          isFailed: true,
          isUploading: false,
        }));
      }
      const upload = new TusUpload(file, {
        endpoint: "https://video.bunnycdn.com/tusupload",
        headers: {
          AuthorizationSignature: secret.signature,
          AuthorizationExpire: secret.expires.toString(),
          VideoId: secret.videoId,
          LibraryId: secret.libraryId,
        },
        onProgress(u, t) {
          setUploadPercentage(Number(((u / t) * 100).toFixed(2)));
        },
        onSuccess() {
          setUploadState((prev) => ({
            ...prev,
            isUploading: false,
            isUploaded: true,
          }));
          res(secret);
        },
        onError() {
          setUploadState((prev) => ({
            ...prev,
            isUploading: false,
            isFailed: true,
          }));
        },
      });

      upload.start();
    });
  }

  return {
    upload,
    uploadPercentage,
    uploadState,
  };
}
