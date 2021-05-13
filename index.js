const Discord = require('discord.js')
const client = new Discord.Client();
const token = 'ODQxOTU3ODI5OTQxNjU3NjAw.YJuUVQ.eUd3UGzWSpwSEG9m4xsG4xYa8hM';
const moment = require('moment')
const ms = require('ms')

const activities = [
  "개발자 : ! MOON#9999",
  "Developer : ! MOON#9999",
  `${client.guilds.cache.size} 개의 서버`,
  `Run with ${client.guilds.cache.size} Server`,
  `${client.guilds.cache.get('720254006831611914').members.cache.filter(member => !member.user.bot).size} 명의 사용자`,
  `Run with ${client.guilds.cache.get('720254006831611914').members.cache.filter(member => !member.user.bot).size} People`
];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`)
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];
    client.user.setActivity(newActivity);
  }, 10000);
});

  client.on('message', message => {
		if(message.content === '!업타임' || message.content === '!up') {
			if(message.author.bot) return;  
			const embed = new Discord.MessageEmbed()
			.setDescription("업타임 측정중입니다...");
			const embed2 = new Discord.MessageEmbed()
			.setTitle("봇 작동시간")
			.setDescription(`\`${ms(client.uptime, { long: true })}\``)
			.setColor('RANDOM');
			message.channel.send(embed).then (message => {
				setTimeout(function() {
				  message.edit(embed2)
				}, 2000);
			})
		}
		});

		client.on('message', message => {
			if(message.content === '!핑' || message.content === '!ping' || message.content === '!p') {
				const Wping = new Discord.MessageEmbed()
				.setDescription('핑 측정중...');
				const Dping = new Discord.MessageEmbed()
				.setDescription(`퐁! | 🏓 ${Date.now() - message.createdTimestamp}ms | API핑 ${Math.round(client.ws.ping)}ms`)
				.setColor('RANDOM');
				message.channel.send(Wping).then(msg => {
					msg.edit(Dping)
			})
		}
	});


client.on('guildMemberAdd', (member) => {
    const channel = member.guild.channels.cache.get('841261899681103886')
   // member.roles.add("834563134013964309")

    channel.send(`<@${member.id}> 님이 입장하셨습니다.\n계정생성일 : ${moment(member.user.createdTimestamp).locale('ko').format('ll dddd LTS')} , ${moment(member.user.createdTimestamp).locale('ko').fromNow()}`) 
});

client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.get('841265116480536576')

  channel.send(`${member.user.tag}님이 퇴장하셨습니다.`)
});

client.on('message', message => {
    if(message.content === '!인증') {
      if(message.guild !== null){
        if(message.channel.id !== "841992490902224906") return;
        }
      let load = new Discord.MessageEmbed()
      .setDescription('처리중입니다..')
      .setAuthor(message.guild.name, 'https://cdn.discordapp.com/emojis/835050095455502368.gif?v=1')
      .setColor('#14aec3')
      message.channel.send(load).then(msg => {
        msg.delete({ timeout: 5000});
      })
      message.react('✔️')
      let embed = new Discord.MessageEmbed()
      .setTitle("인증완료.")
      .setDescription(`${message.guild.name}서버를 정상적으로 이용하실 수 있습니다.`)
      .setAuthor(message.guild.name)
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setColor('#14aec3')
      message.member.roles.add("841263913407479838")
      //message.member.roles.remove("제거할역할ID")
      message.author.send(embed)
    }
  });

  
client.login(token)