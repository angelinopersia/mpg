import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  View,
  VirtualizedList,
} from "react-native";
import { PlayerT } from "../helpers/types";
import PlayerLine from "../components/PlayerLine";
import { ultraPos } from "../helpers";
import UltraPosition from "../components/UltraPosition";

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [poolData, setPoolData] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerPosition, setPlayerPosition] = useState<string | undefined>();

  const getItem = (data: any, index: number) => data[index];
  const getItemCount = () => foundPlayers.length;
  const getItemLayout = (_: any, index: number) => {
    return { length: 30, offset: 30 * index, index };
  };
  const renderItem = ({ item }: { item: PlayerT }) => (
    <PlayerLine player={item} />
  );

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

  const foundPlayers = poolData
    .filter(({ firstName, lastName }) => {
      return `${firstName} ${lastName}`
        .toLowerCase()
        .includes(playerName.toLowerCase());
    })
    .filter(({ ultraPosition }) => {
      if (playerPosition) {
        return Number(playerPosition) === ultraPosition;
      } else {
        return true;
      }
    });

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={s.positions}>
            {Object.keys(ultraPos).map((pos) => {
              return (
                <UltraPosition
                  key={pos}
                  title={ultraPos[pos as any].altTitle}
                  onPress={() => setPlayerPosition(pos)}
                />
              );
            })}
            <UltraPosition
              key=""
              title="Tous"
              onPress={() => setPlayerPosition(undefined)}
            />
          </View>

          <TextInput
            style={s.input}
            placeholder="Nom du joueur"
            onChangeText={setPlayerName}
            value={playerName}
          />

          <VirtualizedList
            // @ts-ignore
            ItemSeparatorComponent={() => <View style={s.bar} />}
            getItem={getItem}
            initialNumToRender={10}
            getItemCount={getItemCount}
            getItemLayout={getItemLayout}
            data={foundPlayers}
            keyExtractor={({ id }) => id}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  bar: { borderBottomWidth: 1 },
  input: { backgroundColor: "#d1d1d1", borderWidth: 1, padding: 10 },
  positions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default HomeScreen;
