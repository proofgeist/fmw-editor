import React from "react";

import {
  ConfigMenu,
  ConfigMenuItem,
  ConfigContent,
  MiniPage,
  Control
} from "./lib/Configuration";

export default function({ menuProps, currentNav, proper }) {
  return (
    <>
      <ConfigMenu>
        <ConfigMenuItem
          {...menuProps}
          link="required"
          label="Required"
          fieldsToTrackErrorsArray={["SourceField"]}
        />
        <ConfigMenuItem
          {...menuProps}
          link="optional"
          label="Optional"
          fieldsToTrackErrorsArray={["Theme", "Toolbar", "ReadOnly"]}
        />
      </ConfigMenu>

      <ConfigContent>
        <MiniPage current={currentNav} name="required">
          <h4>Required Options</h4>
          <Control {...proper("SourceField")}></Control>
        </MiniPage>
        <MiniPage current={currentNav} name="optional">
          <h4>Style</h4>
          <Control {...proper("Theme")}></Control>
          <Control {...proper("Toolbar")}></Control>
          <Control {...proper("ReadOnly")}></Control>
        </MiniPage>
      </ConfigContent>
    </>
  );
}
