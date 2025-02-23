import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscordModule } from 'src/discord/discord.module.js';
import { GatewayIntentBits } from 'discord.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env',
    }),
    DiscordModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('DISCORD_TOKEN'),
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
