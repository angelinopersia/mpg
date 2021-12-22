import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackT, ClubT } from "../helpers/types";
import { ultraPos } from "../helpers";

const PlayerScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [clubName, setClubName] = useState<ClubT[]>([]);

  const { params } = useRoute<RouteProp<StackT, "PlayerScreen">>();
  const player = params?.data;
  const french = "fr-FR";

  const getClub = async () => {
    try {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-clubs`,
      );
      const json = await response.json();
      setClubName(json.championshipClubs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClub();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ padding: 10 }}>
          <Text style={s.header}>
            {player.lastName} {player.firstName}
          </Text>
          <Text style={s.sub}>
            {clubName[player.clubId as any].name[french]} -{" "}
            {ultraPos[player.ultraPosition].title}
          </Text>
          <Text style={s.detail}>
            Note moyenne: {player.stats.averageRating}
          </Text>
          <Text style={s.detail}>Total de buts: {player.stats.totalGoals}</Text>
          <Text style={s.detail}>
            Total de matchs: {player.stats.totalMatches}
          </Text>
          <Text style={s.detail}>
            Total de matchs commencés: {player.stats.totalStartedMatches}
          </Text>
          <Text style={s.detail}>
            Total de matchs joués: {player.stats.totalPlayedMatches}
          </Text>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  header: {
    fontSize: 32,
    color: "black",
    borderBottomWidth: 1,
  },
  sub: {
    fontSize: 25,
    color: "black",
  },
  detail: {
    fontSize: 15,
    paddingTop: 30,
    color: "black",
  },
});

export default PlayerScreen;
