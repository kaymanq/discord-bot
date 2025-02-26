import { Injectable, Inject } from '@nestjs/common';
import { Client, Guild, GuildMember, Role } from 'discord.js';

@Injectable()
export class DiscordService {
    constructor(
        @Inject('DISCORD_CLIENT') private readonly client: Client,
    ) { }

    public async getGuild(guildId: string): Promise<Guild | null> {
        const guild = this.client.guilds.cache.get(guildId);
        if (guild) return guild;

        return this.client.guilds.fetch(guildId).catch(() => null);
    }

    public async getMember(guildId: string, userId: string): Promise<GuildMember | null> {
        const guild = await this.getGuild(guildId);
        if (!guild) return null;

        const member = guild.members.cache.get(userId);
        if (member) return member;

        return guild.members.fetch(userId).catch(() => null);
    }

    public async getRole(guildId: string, roleId: string): Promise<Role | null> {
        const guild = await this.getGuild(guildId);
        if (!guild) return null;

        const role = guild.roles.cache.get(roleId);
        if (role) return role;

        return guild.roles.fetch(roleId).catch(() => null);
    }

    public async addRole(guildId: string, userId: string, roleId: string): Promise<void> {
        const member = await this.getMember(guildId, userId);
        const role = await this.getRole(guildId, roleId);

        if (member && role) {
            await member.roles.add(role);
        }
    }

    public async removeRole(guildId: string, userId: string, roleId: string): Promise<void> {
        const member = await this.getMember(guildId, userId);
        const role = await this.getRole(guildId, roleId);

        if (member && role) {
            await member.roles.remove(role);
        }
    }

    public getGuilds(): Guild[] {
        return Array.from(this.client.guilds.cache.values());
    }
}