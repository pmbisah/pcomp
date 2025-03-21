import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

export const Button = ({ onClick, children }) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 10 }}>
      <TouchableOpacity
        onPress={onClick}
        style={{
          backgroundColor: "#007BFF",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          width: 150, // Adjust width to make buttons uniform
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};
