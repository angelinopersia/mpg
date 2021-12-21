export type ClubsT = {
  [key: string]: ClubT;
};

export type ChampionshipT = {
  active: boolean;
  jerseys: { [key: string]: string };
};

export type ClubT = {
  id: string;
  name: { "fr-FR": string; "en-GB": string; "es-ES": string };
  championships: ChampionshipT[];
  defaultJerseyUrl: string;
  shortName: string;
};

export type PlayerT = {
  stats: PlayerStatT;
  id: string;
  type: string;
  clubId: string;
  quotation: number;
  firstName: string | null;
  lastName: string | null;
  position: number;
  ultraPosition: number;
};

export type PlayerStatT = {
  matches?: PlayerStatMatchT[];
  averageRating: number;
  totalMatches?: number;
  totalGoals?: number;
  totalPlayedMatches?: number;
  totalStartedMatches?: number;
};

export type PlayerStatMatchT = {
  playerClubId: string;
  matchId: string;
  date: string;
  gameWeekNumber: number;
  home: { clubId: string; score: number };
  away: { clubId: string; score: number };
  playerPerformance: {
    minutesPlayed: number;
    status: number;
    goals: number;
    rating: number;
    ownGoals: number;
  };
};

export type StackT = {
  HomeScreen: undefined;
  PlayerScreen: { data: PlayerT };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackT {}
  }
}
