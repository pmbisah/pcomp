import React from "react";
import { View, Text } from "react-native";

export const Card = ({ children }) => {
  return (
    <View style={{ borderWidth: 1, borderRadius: 10, marginBottom: 10, padding: 10 }}>
      {children}
    </View>
  );
};

export const CardContent = ({ children }) => {
  return <View>{children}</View>;
};
