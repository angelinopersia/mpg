export const ultraPos: UltraPosT = {
  10: { title: "Gardien", altTitle: "G" },
  20: { title: "Défenseur", altTitle: "D" },
  21: { title: "Latéral", altTitle: "L" },
  30: { title: "Milieu défensif", altTitle: "MD" },
  31: { title: "Milieu offensif", altTitle: "MO" },
  40: { title: "Attaquant", altTitle: "A" },
};

type UltraPosT = {
  [key: number]: { title: string; altTitle: string };
};
