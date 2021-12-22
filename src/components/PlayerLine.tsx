import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { PlayerT } from "../helpers/types";
import { ultraPos } from "../helpers";

const PlayerLine = ({ player }: { player: PlayerT }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={s.line}
      onPress={() =>
        navigate("PlayerScreen", {
          data: player,
        })
      }
    >
      <Text style={s.text}>
        {player.lastName} {player.firstName} |{" "}
        {ultraPos[player.ultraPosition].title}
      </Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  line: { margin: 10 },
  text: { fontSize: 20, color: "black" },
});

export default PlayerLine;
