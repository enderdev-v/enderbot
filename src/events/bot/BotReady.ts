import { createEvent } from "seyfert";
import { ActivityType, PresenceUpdateStatus } from "seyfert/lib/types/index.js";

export default createEvent({
  data: { once: true, name: "botReady" },
  async run(user, client, shard) {
    void client.gateway.setPresence({
      activities: [{ name: 'enderbot', type: ActivityType.Custom, state: "Hola soy enderbot" }],
      since: Date.now(),
      status: PresenceUpdateStatus.DoNotDisturb,
      afk: false
    })
    client.logger.info(`${user.username} is ready on shard #${shard}`);
  }
})