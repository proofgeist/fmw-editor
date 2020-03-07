import React, { useState } from "react";
import defaultConfig from "./configuration.json";
import RichTextEditor from "./components/RichTextEditor";
import Configurator from "./components/Configurator";

function Widget(initialProps) {
  const Config = initialProps.Config;
  if (!Config || Object.keys(Config).length < 1) {
    initialProps = { ...initialProps, Config: defaultConfig };
    window.__initialProps__ = initialProps;
  }

  if (initialProps.ShowConfig) return <Configurator {...initialProps} />;
  return <RichTextEditor {...initialProps} />;
}

export default Widget;
