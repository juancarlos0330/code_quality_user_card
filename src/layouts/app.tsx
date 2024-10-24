import "./app.css";

import React from "react";
import { FC } from "react";

export type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};
