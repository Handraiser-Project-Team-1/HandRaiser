import React from "react";
import { Statistic, Card, Icon } from "antd";
export default function QueueCounter() {
  return (
    <Card>
      <Statistic
        title="On Queue"
        color="#f50"
        value={2}
        prefix={<Icon type="user" />}
      />
    </Card>
  );
}
