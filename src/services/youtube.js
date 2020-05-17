import { get } from "./http";
import backendUrl from "./urls";

export const downloadYoutubeVideo = (url) => {
  return get(`${backendUrl}/download?url=${url}`, {
    mode: "cors",
  }).then(async (response) => {
    const contentDispositionHeader = response.headers.get(
      "content-disposition"
    );
    const extractFileNameRegExp = /filename="(.+)"/;
    const fileName = contentDispositionHeader.match(extractFileNameRegExp)[1];

    return {
      data: await response.blob(),
      fileName,
    };
  });
};
