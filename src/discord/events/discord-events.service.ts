import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { Client, Guild, GuildMember, PartialGuildMember, Role } from 'discord.js';

@Injectable()
export class DiscordEventsService implements OnModuleInit {
    constructor(
        @Inject('DISCORD_CLIENT') private readonly client: Client,
    ) { }

    public onModuleInit(): void {
        this.setupEventListeners();
    }

    
    private setupEventListeners(): void {
        this.client.on('guildCreate', (guild) => this.handleGuildCreate(guild));
        this.client.on('guildDelete', (guild) => this.handleGuildDelete(guild));

        this.client.on('guildMemberAdd', (member) => this.handleGuildMemberAdd(member));
        this.client.on('guildMemberRemove', (member) => this.handleGuildMemberRemove(member));

        this.client.on('roleCreate', (role) => this.handleRoleCreate(role));
        this.client.on('roleDelete', (role) => this.handleRoleDelete(role));
        this.client.on('roleUpdate', (oldRole, newRole) => this.handleRoleUpdate(oldRole, newRole));
    }

    
    private handleGuildCreate(guild: Guild): void {
        console.log(`Бот добавлен на сервер: ${guild.name}`);
    }

    
    private handleGuildDelete(guild: Guild): void {
        console.log(`Бот удален с сервера: ${guild.name}`);
    }

    
    private async handleGuildMemberAdd(member: GuildMember | PartialGuildMember): Promise<void> {
        const fullMember = member.partial ? await member.fetch() : member;
        console.log(`Новый участник на сервере: ${fullMember.user.tag}`);
    }

    
    private async handleGuildMemberRemove(member: GuildMember | PartialGuildMember): Promise<void> {
        const fullMember = member.partial ? await member.fetch() : member;
        console.log(`Участник покинул сервер: ${fullMember.user.tag}`);
    }

    
    private handleRoleCreate(role: Role): void {
        console.log(`Создана новая роль: ${role.name} на сервере ${role.guild.name}`);
    }

    
    private handleRoleDelete(role: Role): void {
        console.log(`Роль удалена: ${role.name} на сервере ${role.guild.name}`);
    }

    
    private handleRoleUpdate(oldRole: Role, newRole: Role): void {
        console.log(`Роль обновлена: ${oldRole.name} -> ${newRole.name} на сервере ${newRole.guild.name}`);
    }
}