import React, { useState } from "react";
import "./App.scss";
import { IconButton } from "@material-ui/core";
import { Popover } from "antd";
import { Input, Button } from "antd";

function HelpFab({handraiseFn, setTagValFn, tagVal}) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const handleVisible = () => {
    setVisible(true);
  };
  const handleSaveTag = () => {
    if(tagVal){
      setError(false);
      setVisible(false);
      handraiseFn();
      return;
    }
    setError(true);
  };
  const cancel = () => {
    setVisible(false);
  };

  const handleChange = (e) => setTagValFn(e.target.value);

  return (
    <>
      <div className="request-loader">
        <Popover
          key="tag"
          placement="right"
          content={[
            <Input placeholder={(error ? 'Please enter something' : 'Tag')} key="tags" onChange={handleChange}/>,
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
          <IconButton >
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
