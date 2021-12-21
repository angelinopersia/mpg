import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { PlayerT } from "../helpers/types";
import PlayerLine from "../components/PlayerLine";

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [poolData, setPoolData] = useState([]);

  const getPlayersPool = async () => {
    try {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-players-pool/1`,
      );
      const json = await response.json();
      setPoolData(json.poolPlayers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlayersPool();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={poolData}
          keyExtractor={({ id }) => id}
          renderItem={({ item }: { item: PlayerT }) => (
            <PlayerLine player={item} />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
