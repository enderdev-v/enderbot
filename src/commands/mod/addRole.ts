import { SubCommand, type CommandContext,  createRoleOption, Declare, Middlewares, Options, createIntegerOption, IgnoreCommand, } from "seyfert";

const options = {
  role: createRoleOption({ description: "get a role", required: true }),
  users: createIntegerOption({ description: "Numero de usuarios a asignar el rol", min_value: 2, max_value: 50, required: true }),
};
@Declare({
  name: "addrole",
  description: "Asignas roles a uno o varios usuarios",
  defaultMemberPermissions: ["BanMembers"],
  integrationTypes: ["GuildInstall"],
  ignore: IgnoreCommand.Message
})
@Options(options)
@Middlewares(["CheckBots"])
export default class AssignRoleCommand extends SubCommand {
  override async run(ctx: CommandContext<typeof options>) {
    const role = ctx.options.role;
    const users = ctx.options.users;
    const guild = await ctx.guild("cache", { with_counts: true});
    const members = await guild?.members.list({ limit: users + 1 });
    
    if (role.managed) return ctx.write({ content: "No puedes asignar un rol gestionado por un bot" });

    console.log(members?.length);
    members?.forEach(async (member) => {
       const memberRoleList = await member.roles.keys;
        setTimeout(() => {}, 2000);
        console.log(member.user.username);
        if (memberRoleList.some(r => r === role.id)) return;
        member.roles.add(role.id).catch((err) => console.error(err));
    });

    ctx.write({ content: `Se han asignado el rol ${role.name} a ${users} usuarios` });

  }
}