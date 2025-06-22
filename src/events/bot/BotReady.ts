import { createEvent } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types/index.js";

export default createEvent({
  data: { name: "botReady" },
  async run(user, client, shard) {
    const musicName = [
      `Counting Stars - OneRepublic`,
      `Por fa no te vayas - Morat`,
      `I'm Still Standing - Elton John`,
      `Run - OneRepublic`,
      `Blinding ligths - The Weekend`,
      `Sunflower - Post Malone & Swae Lee`,
      `Wake me up - Avicii`,
      `Sunburst - Tobu`,
    ]
    let activity = [
      [{
        name: musicName[Math.floor(Math.random() * musicName.length)],
        type: ActivityType.Listening
      }],
      [{
        name: `enderbot`,
        type: ActivityType.Custom,
        state: "Hola soy enderbot!!"
      }],
      [{
        name: `enderbot`,
        type: ActivityType.Custom,
        state: `Hola a todos como estan como andan?`
      }],
      [{
        name: `Viendo cosas`,
        type: ActivityType.Watching,
        state: `la nueva version de enderbot :D`
      }],
      [{
        name: `Probando seyfert`,
        type: ActivityType.Playing,
        state: `Aventando las manos al fuego`
      }]
    ];
    const presence = () => client.gateway.setPresence({
      activities: activity[Math.floor(Math.random() * activity.length)],
      since: Date.now(),
      status: PresenceUpdateStatus.DoNotDisturb,
      afk: false
    })

    setInterval(() => presence(), 5e4)
    client.logger.info(`${user.username} is ready on shard #${shard}`);
  }
})