import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  TextInput,
  View,
  VirtualizedList,
} from "react-native";
import { PlayerT } from "../helpers/types";
import PlayerLine from "../components/PlayerLine";
import { ultraPos } from "../helpers";

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
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <TextInput
            placeholder="Nom du joueur"
            onChangeText={setPlayerName}
            value={playerName}
          />

          <Button title="Tous" onPress={() => setPlayerPosition(undefined)} />

          {Object.keys(ultraPos).map((pos) => {
            return (
              <Button
                key={pos}
                title={ultraPos[pos as any].title}
                onPress={() => setPlayerPosition(pos)}
              />
            );
          })}

          <VirtualizedList
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

export default HomeScreen;
