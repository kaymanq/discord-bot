import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client, GatewayIntentBits } from 'discord.js';

export const DiscordProvider: Provider = {
    provide: 'DISCORD_CLIENT',
    useFactory: async (configService: ConfigService) => {
        const token = configService.get<string>('DISCORD_TOKEN');
        const intents = [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
        ];

        const client = new Client({ intents });
        await client.login(token);

        return client;
    },
    inject: [ConfigService],
};