import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackT } from "../helpers/types";

const PlayerScreen = () => {
  const { params } = useRoute<RouteProp<StackT, "PlayerScreen">>();
  const player = params?.data;

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View style={{ padding: 10 }}>
        <Text style={s.header}>
          {player.lastName} {player.firstName}
        </Text>
        <Text style={s.sub}>
          {player.clubId} - {player.ultraPosition}
        </Text>
        <Text>Matches joués: {player.stats.totalMatches}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  header: {
    fontSize: 40,
    color: "black",
  },
  sub: {
    fontSize: 15,
    color: "black",
  },
});

export default PlayerScreen;
