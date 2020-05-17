import React, { Fragment, useState } from "react";
import backendUrl from "./services/urls";

function App() {
  const [url, setUrl] = useState("");

  const download = () => {
    fetch(`${backendUrl}/download?url=${url}`)
      .then(async (res) => {
        if (!res.ok) {
          const { errorMessage } = await res.json();
          throw new Error(errorMessage);
        } else {
          return await res.blob();
        }
      })
      .then((res) => {
        console.log(res);
        var url = window.URL.createObjectURL(res);
        var a = document.createElement("a");
        a.href = url;
        a.download = "myvideo.mp4";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
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
