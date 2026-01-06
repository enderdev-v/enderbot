import { ActivityType } from "seyfert/lib/types/index.js";
import * as pack from "../../../../package.json" with { type: "json" };
process.loadEnvFile(".env");
export const { DATABASE_URL, appID, token, webhookURL, webhookId, webhookToken } = process.env;

export const version = pack.default.version;

export const PrismaVersion = pack.default.devDependencies.prisma;
export const SeyfertVersion = pack.default.dependencies.seyfert;
export const typescriptVersion = pack.default.devDependencies.typescript;


export const bots = [
  "924525977437077515", // <--- endkachu 
  "710034409214181396", // <--- ticket king
  "416358583220043796" // <--- Xenon
];

export const UsualColors = {
  White: 0xf4feff,
  Color: "FFFDBE"
};

export const GithubRepo = "https://github.com/enderdev-v/enderbot";

export const EnviromentKeys = {
  DATABASE_URL,
  token,
  webhookId,
  appID,
  webhookToken,
  webhookURL
};
export const musicName = [
  "Counting Stars - OneRepublic",
  "Por fa no te vayas - Morat",
  "I'm Still Standing - Elton John",
  "Run - OneRepublic",
  "Blinding ligths - The Weekend",
  "Sunflower - Post Malone & Swae Lee",
  "Wake me up - Avicii",
  "Sunburst - Tobu",
];

export const getRandomMusicName = () => { return musicName[Math.floor(Math.random() * musicName.length)]; };
export const activity = [
  {
    name: "Change it",
    type: ActivityType.Listening,
    state: "en un mp3"
  },
  {
    name: "enderbot",
    type: ActivityType.Custom,
    state: "Hola soy enderbot!!"
  },
  {
    name: "enderbot",
    type: ActivityType.Custom,
    state: "Hola a todos como estan como andan?"
  },
  {
    name: "Viendo cosas",
    type: ActivityType.Watching,
    state: "la nueva version de enderbot :D"
  },
  {
    name: "Probando seyfert",
    type: ActivityType.Playing,
    state: "Aventando las manos al fuego"
  }
];
