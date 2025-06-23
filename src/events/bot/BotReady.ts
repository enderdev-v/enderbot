import { activity, getRandomMusicName } from "#enderbot/utils/constants/Constants.js";
import { createEvent } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types/index.js";

export default createEvent({
  data: { name: "botReady" },
  async run(user, client, shard) {
    const RandomActivity = () => {
      const musicName = getRandomMusicName();
      const act = activity[Math.floor(Math.random() * activity.length)];
      const name = act.type === ActivityType.Listening ? musicName : act.name;
      void client.gateway.setPresence({
        activities: [{ name: name, type: act.type, state: act.state }],
        since: Date.now(),
        status: PresenceUpdateStatus.DoNotDisturb,
        afk: false
      });
    };
    setInterval(() => {
    if (client.isActivityRandom) return RandomActivity()
    }, 5e4)
    client.logger.info(`${user.username} is ready on shard #${shard}`);

  }
})