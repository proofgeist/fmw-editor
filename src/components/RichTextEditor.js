import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import { getConfig, fmFetch } from "fmw-utils";
import { READ_DATA_SCRIPT, SAVE_DATA_SCRIPT } from "../constants";

Quill.register(Quill.import("attributors/style/direction"), true);
Quill.register(Quill.import("attributors/style/align"), true);
Quill.register(Quill.import("attributors/class/background"), true);
Quill.register(Quill.import("attributors/style/font"), true);
var Size = Quill.import("attributors/style/size");
Size.whitelist = ["9px", "11px", "13px", "16px", "18px", "24px", "36px"];
Quill.register(Size, true);

function useConfig(name, defaultValue) {
  let initialValue = getConfig(name);
  if (!initialValue) initialValue = defaultValue;
  return useState(initialValue);
}

export default function RichTextEditor() {
  // Here we set up our react state,
  const [html, setHtml] = useState("");

  //pulling initalValues from Config
  const [theme, setTheme] = useConfig("Theme", "snow");
  const [toolbar, setToolbar] = useConfig("Toolbar", "basic");
  const [readOnly, setReadOnly] = useConfig("ReadOnly", false);
  const Q = useRef();

  useEffect(() => {
    const fn = async () => {
      const result = await fmFetch(READ_DATA_SCRIPT);
      setHtml(result.html);
    };
    fn();
  }, []);

  function handleChange(value) {
    const fName = getConfig("SourceField");
    fmFetch(SAVE_DATA_SCRIPT, { FieldName: fName, html: value });
    setHtml(value);
  }

  //FUNCTIONS EXPOSED TO FM
  window.Editor_Refresh = async function() {
    const result = await fmFetch(READ_DATA_SCRIPT);
    setHtml(result.html);
  };

  window.Editor_InsertText = function(text) {
    const editor = Q.current.getEditor();
    const selection = editor.getSelection();
    if (!selection) return;
    const { index, length } = selection;
    editor.deleteText(index, length);
    editor.insertText(index, text);
  };

  window.Editor_ReadOnlyOn = function() {
    setReadOnly(true);
  };
  window.Editor_ReadOnlyOff = function() {
    setReadOnly(false);
  };

  window.Editor_InsertDataUrl = function(dataUrl) {
    const editor = Q.current.getEditor();
    const selection = editor.getSelection();
    if (!selection) return;
    const { index, length } = selection;
    if (!index) return;
    editor.deleteText(index, length);
    editor.insertEmbed(index, "image", dataUrl);
  };

  let modules = {};
  if (toolbar === "advanced" && !readOnly) {
    modules = AdvancedModules;
  }

  let themeValue = readOnly || theme === "core" ? null : theme;

  return (
    <ReactQuill
      ref={Q}
      readOnly={readOnly}
      theme={themeValue}
      modules={modules}
      style={{ height: "100vh" }}
      value={html}
      onChange={handleChange}
    />
  );
}

const AdvancedModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [{ size: Size.whitelist }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],

    ["link", "image", "video"],

    ["clean"]
  ]
};
