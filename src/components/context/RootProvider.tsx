"use client";

import React from "react";

import ThemneProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

type Props = {
  children: React.ReactNode;
};

export default function RootProvider({ children }: Props) {
  return (
    <AuthProvider>
      <ThemneProvider>{children}</ThemneProvider>
    </AuthProvider>
  );
}
