import React from "react";
import { Spin } from "antd";

export default function MainPage({ loading = false, children }) {
  return <Spin spinning={loading}>{children}</Spin>;
}
