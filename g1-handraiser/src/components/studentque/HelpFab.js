import React, { useState } from "react";
import "./App.scss";
import { IconButton } from "@material-ui/core";
import { Popover } from "antd";
import { Input, Button } from "antd";

function HelpFab({handraiseFn}) {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(true);
  };
  const handleSaveTag = () => {
    setVisible(false);
  };
  const cancel = () => {
    setVisible(false);
  };
  return (
    <>
      <div className="request-loader">
        <Popover
          key="tag"
          placement="right"
          content={[
            <Input placeholder="Tag" key="tags" />,
            <Button type="link" key="save" onClick={handleSaveTag}>
              Save
            </Button>,
            <Button type="link" key="cancel" onClick={cancel}>
              Cancel
            </Button>
          ]}
          title="Tag"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisible}
        >
          <IconButton onClick={handraiseFn}>
            <span role="img" aria-label="Hand">
              👋
            </span>
          </IconButton>
        </Popover>
      </div>
    </>
  );
}

export default HelpFab;
