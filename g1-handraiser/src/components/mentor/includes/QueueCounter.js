import React from "react";
import { Statistic, Card, Icon } from "antd";
export default function QueueCounter({ count }) {
  return (
    <Card>
      <Statistic
        title="On Queue"
        color="#f50"
        value={count}
        prefix={<Icon type="bars" />}
      />
    </Card>
  );
}
