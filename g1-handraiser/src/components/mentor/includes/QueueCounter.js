import React from "react";
import { Statistic, Card, Icon } from "antd";
export default function QueueCounter({count}) {
  return (
    <Card>
      <Statistic
        title="On Queue"
        value={count}
        valueStyle={{ color: "#3f8600" }}
        prefix={<Icon type="user" />}
      />
    </Card>
  );
}
