import React, { useContext } from "react";
import { Statistic, Card, Icon } from "antd";
import DataContext from "../DataContext";
export default function EnrolleesCount() {
  const { pendingCount } = useContext(DataContext);
  return (
    <Card>
      <Statistic
        title="Enrollees"
        color="#f50"
        value={pendingCount}
        prefix={<Icon type="smile" />}
      />
    </Card>
  );
}
