import React from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./constants";
import axios from 'axios';
const App = () => {
  const instanceRef = React.useRef(null);

  async function handleSave() {
    const savedData = await instanceRef.current.save();
    axios({
      method: 'post',
      url: 'api/addedData',
      data: savedData
    });
    console.log("savedData", savedData);
  }

  return (
    <React.Fragment>
      <button onClick={handleSave}>Save!</button>
      <EditorJs
        instanceRef={(instance) => (instanceRef.current = instance)}
        tools={EDITOR_JS_TOOLS}
        i18n={{
          messages: {}
        }}
        data={{
          time: 1556098174501,
          blocks: [
            {
              type: "header",
              data: {
                text: "Editor.js",
                level: 1
              }
            },
            
          ],
          version: "2.12.4"
        }}
      />
    </React.Fragment>
  );
};

export default App;
