import React, { useContext } from "react";
import { Statistic, Card, Icon } from "antd";
import DataContext from "../DataContext";
export default function StudentCount({ count }) {
  const { enrolledCount } = useContext(DataContext);
  return (
    <Card>
      <Statistic
        title="Student"
        color="#f50"
        value={enrolledCount}
        prefix={<Icon type="user" />}
      />
    </Card>
  );
}
