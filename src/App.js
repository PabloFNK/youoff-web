import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import { downloadYoutubeVideo } from "./services/youtube";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const download = () => {
    setLoading(true);
    downloadYoutubeVideo(url)
      .then((fileObject) => initDownladDialog(fileObject))
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
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
    <div className="app-layout">
      <div>
        <label htmlFor="downloadInput">Introduce youtube URL:</label>
        <FormControl
          id="downloadInput"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      {loading ? (
        <Button disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      ) : (
        <Button onClick={download}>Download video</Button>
      )}
    </div>
  );
}

export default App;
