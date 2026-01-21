import { TPostCreateSchema } from "@/schema/post-create";
import useFileReader from "./use-file-reader";
import { DefaultSuccessResponse } from "@/types/response";
import { AxiosResponse } from "axios";
import { tryCatch } from "@/lib/utils";
import { TPresignedUrl } from "@/constants/hrefs";

export default function useUploadPost({
  formUploader,
}: {
  formUploader: (data: TPostCreateSchema) => Promise<any>;
}) {
  const upload = async (data: TPostCreateSchema) => {
    const [res, err] = await tryCatch<AxiosResponse<DefaultSuccessResponse>>(
      formUploader(data)
    );
    if (err) throw new Error(err.message);

    return res;
  };

  return { upload };
}
