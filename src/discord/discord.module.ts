import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';

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
      providers: [discordProvider],
      exports: [discordProvider],
    };
  }

  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<{ token: string; intents: GatewayIntentBits[] }> | { token: string; intents: GatewayIntentBits[] };
    inject?: any[];
  }): DynamicModule {
    const discordProvider: Provider = {
      provide: 'DISCORD_CLIENT',
      useFactory: async (...args: any[]) => {
        const { token, intents } = await options.useFactory(...args);
        const client = new Client({ intents });
        await client.login(token);
        return client;
      },
      inject: options.inject || [],
    };

    return {
      module: DiscordModule,
      providers: [discordProvider],
      exports: [discordProvider],
    };
  }
}
