import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { PlayerT } from "../helpers/types";
import { ultraPos } from "../helpers";

const PlayerLine = ({ player }: { player: PlayerT }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={{ height: 30 }}
      onPress={() =>
        navigate("PlayerScreen", {
          data: player,
        })
      }
    >
      <Text>
        {player.lastName} {player.firstName}{" "}
        {ultraPos[player.ultraPosition].title}
      </Text>
    </TouchableOpacity>
  );
};

export default PlayerLine;
