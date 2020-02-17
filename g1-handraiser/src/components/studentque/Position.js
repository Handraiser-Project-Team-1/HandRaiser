import React from "react";
import { Statistic, Card, Icon } from "antd";
function Position() {
  return (
    <>
      <Card>
        <Statistic
          title="Position"
          value={1}
          valueStyle={{ color: "#42b0fe" }}
          prefix={<Icon type="user" />}
        />
      </Card>
    </>
  );
}

export default Position;
