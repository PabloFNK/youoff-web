import React, { Fragment, useState } from "react";
import { downloadYoutubeVideo } from "./services/youtube";

function App() {
  const [url, setUrl] = useState("");

  const download = () => {
    downloadYoutubeVideo(url)
      .then((fileObject) => initDownladDialog(fileObject))
      .catch((error) => {
        console.error(error);
      });
  };

  const initDownladDialog = (fileObject) => {
    var url = window.URL.createObjectURL(fileObject.data);
    var link = document.createElement("a");
    link.href = url;
    link.download = fileObject.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Fragment>
      <label htmlFor="downloadInput">Introduce youtube URL:</label>
      <input id="downloadInput" onChange={(e) => setUrl(e.target.value)} />
      <button onClick={download}>Download video</button>
    </Fragment>
  );
}

export default App;
