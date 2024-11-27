import type { Post, Prisma } from '@prisma/client';
import {
	Client,
	Embed,
	GatewayIntentBits,
	TextChannel,
	type APIEmbed,
	type Channel,
	type EmbedData
} from 'discord.js';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

let channels: Channel[] = [];

client.once('ready', () => {
	console.log(`Logged in as ${client.user?.tag}!`);
	client.guilds.cache.forEach((guild) => {
		guild.channels.cache.find((channel) => {
			if (channel.isTextBased() && channel.isSendable() && channel.name === 'voidposting') {
				channels.push(channel);
			}
		});
	});
	console.log(`Found ${channels.length} channels to post to`);
});

if (process.env.BOT_ENABLED === 'true') {
	console.log('Bot enabled, logging in');
	client.login(process.env.DISCORD_BOT_TOKEN);
} else {
	console.log('Bot disabled, not logging in');
}

export const sendPostToChannels = async (post: Post) => {
	if (!client || !client.isReady()) return;
	if (post.unlisted) return;

	const title = post.description ? post.description : undefined;
	const fullPostUrl = `https://thevoid.kopymatic.com/posts/${post.category}/${post.url}`;
	const message = `Babe wake up new void post just dropped\n${fullPostUrl}`;

	const embed: APIEmbed = {
		title: title,
		description: post.body,
		url: fullPostUrl,
		color: 0x000000
	};

	channels.forEach((channel) => {
		let newChannel = channel as TextChannel;
		newChannel.send({ content: message, embeds: [embed] });
	});
};
