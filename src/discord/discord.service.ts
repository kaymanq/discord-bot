import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Client, Guild, GuildMember, Role } from 'discord.js';

@Injectable()
export class DiscordService {
    constructor(
        @Inject('DISCORD_CLIENT') private readonly client: Client,
    ) { }

    async getGuild(guildId: string): Promise<Guild> {
        const guild = await this.client.guilds.fetch(guildId).catch(() => null);
        if (!guild) {
            throw new NotFoundException(`Guild with ID ${guildId} not found.`);
        }
        return guild;
    }

    async getMember(guildId: string, userId: string): Promise<GuildMember> {
        const guild = await this.getGuild(guildId);
        const member = await guild.members.fetch(userId).catch(() => null);
        if (!member) {
            throw new NotFoundException(`User with ID ${userId} not found in guild ${guildId}.`);
        }
        return member;
    }

    async getRole(guildId: string, roleId: string): Promise<Role> {
        const guild = await this.getGuild(guildId);
        const role = await guild.roles.fetch(roleId).catch(() => null);
        if (!role) {
            throw new NotFoundException(`Role with ID ${roleId} not found in guild ${guildId}.`);
        }
        return role;
    }

    async addRole(guildId: string, userId: string, roleId: string): Promise<void> {
        const member = await this.getMember(guildId, userId);
        const role = await this.getRole(guildId, roleId);
        await member.roles.add(role);
    }

    async removeRole(guildId: string, userId: string, roleId: string): Promise<void> {
        const member = await this.getMember(guildId, userId);
        const role = await this.getRole(guildId, roleId);
        await member.roles.remove(role);
    }
}