import React from "react";
import { Statistic, Card, Icon } from "antd";
export default function QueueCounter() {
  return (
    <Card>
      <Statistic
        title="On Queue"
        value={3}
        valueStyle={{ color: "#3f8600" }}
        prefix={<Icon type="user" />}
      />
    </Card>
  );
}
