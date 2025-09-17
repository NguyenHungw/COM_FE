import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyTextEditor({ value, onChange }) {
  // const [value, setValue] = useState("");

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{height:90,marginBottom:30}}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"],
          ],
        }}
      />
      {/* <h4>Xem trước:</h4>
      <div dangerouslySetInnerHTML={{ __html: value }} /> */}
    </div>
  );
}

export default MyTextEditor;
