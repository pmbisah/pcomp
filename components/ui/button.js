import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const Button = ({ onClick, children }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>{children}</Text>
    </TouchableOpacity>
  );
};
