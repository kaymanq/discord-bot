import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client, GatewayIntentBits } from "discord.js";

@Module({})
export class DiscordModule {
  static forRootAsync(): DynamicModule {
    const discordProvider: Provider = {
      provide: 'DISCORD_CLIENT',
      useFactory: async (ConfigService: ConfigService) => {
        const token = ConfigService.get<string>('DISCORD_TOKEN');
        const intents = [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
        ]

        const client = new Client({ intents });
        await client.login(token);
        
        return client;
      },
      inject: [ConfigService],
    };

    return {
      module: DiscordModule,
      providers: [discordProvider],
      exports: [discordProvider],
    };
  }
}