import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { DiscordService } from 'src/discord/services/discord.service';
import { DiscordEventsService } from 'src/discord/events/discord-events.service';

@Module({})
export class DiscordModule {
  static forRoot(options: { token: string; intents: GatewayIntentBits[] }): DynamicModule {
    const discordProvider: Provider = {
      provide: 'DISCORD_CLIENT',
      useFactory: async () => {
        const client = new Client({ intents: options.intents });
        await client.login(options.token);
        return client;
      },
    };

    return {
      module: DiscordModule,
      providers: [discordProvider, DiscordService, DiscordEventsService],
      exports: [DiscordService],
    };
  }

  static forRootAsync(options: {
    useFactory: (
      configService: ConfigService,
    ) => Promise<{ token: string; intents: GatewayIntentBits[] }> | { token: string; intents: GatewayIntentBits[] };
    inject?: any[];
  }): DynamicModule {
    const discordProvider: Provider = {
      provide: 'DISCORD_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const { token, intents } = await options.useFactory(configService);
        const client = new Client({ intents });
        await client.login(token);
        return client;
      },
      inject: options.inject || [ConfigService],
    };

    return {
      module: DiscordModule,
      providers: [discordProvider, DiscordService, DiscordEventsService],
      exports: [DiscordService],
    };
  }
}