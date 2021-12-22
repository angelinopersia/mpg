import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type UltraPosPropT = {
  onPress: any;
  title: string;
};

const UltraPosition = ({ title, onPress }: UltraPosPropT) => {
  return (
    <TouchableOpacity style={s.button} onPress={onPress}>
      <Text style={s.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: { paddingTop: 10, paddingBottom: 10 },
  text: { fontSize: 30, color: "black" },
});

export default UltraPosition;
