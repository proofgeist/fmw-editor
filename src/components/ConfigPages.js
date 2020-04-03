import React from "react";

import {
  ConfigMenu,
  ConfigMenuItem,
  ConfigContent,
  MiniPage,
  Control
} from "./lib/Configurator/ConfigWrapper";

import i18n from "../i18n";
const Strings = i18n();

export default function({ menuProps, currentNav, proper }) {
  return (
    <>
      <ConfigMenu>
        <ConfigMenuItem
          {...menuProps}
          link="required"
          label={Strings.RequiredMenu.MenuLabel}
          fieldsToTrackErrorsArray={["SourceField"]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="style"
          label={Strings.StyleMenu.MenuLabel}
          fieldsToTrackErrorsArray={["Theme", "Toolbar", "ReadOnly"]}
        />
      </ConfigMenu>

      <ConfigContent>
        <MiniPage current={currentNav} name="required">
          <h4>{Strings.RequiredMenu.PageTitle}s</h4>
          <Control {...proper("SourceField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="style">
          <h4>{Strings.StyleMenu.PageTitle}</h4>
          <Control {...proper("Theme")}></Control>
          <Control {...proper("Toolbar")}></Control>
          <Control {...proper("ReadOnly")}></Control>
        </MiniPage>
      </ConfigContent>
    </>
  );
}
