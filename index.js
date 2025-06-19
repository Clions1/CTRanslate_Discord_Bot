require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  EmbedBuilder
} = require('discord.js');
const { translateText, getCharacterLimit } = require('./deepl-service');

// Discord bot için gerekli izinleri tanımlama
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message] // DM mesajları için gerekli
});

// Bot hazır olduğunda çalışacak fonksiyon
client.on('ready', () => {
  console.log(`${client.user.tag} çevrimiçi oldu!`);
  
  // Bot durumunu ayarla
  client.user.setActivity('DM: TR → EN Çeviri', { type: 'PLAYING' });
});

// DM mesajlarını yakalamak için
client.on('messageCreate', async (message) => {
  // Botun kendi mesajlarını görmezden gel
  if (message.author.bot) return;
  
  // Sadece DM mesajlarını işle
  if (!message.guild) {
    try {
      // Kullanıcıya yazıyor bilgisi gönder
      await message.channel.sendTyping();
      
      // Çeviriyi yap
      const translationResult = await translateText(message.content);
      
      // Karakter kullanım bilgilerini al
      const charLimit = await getCharacterLimit();
      
      // Çevirilmiş metni ve karakter limitini içeren bir embed oluştur
      const translationEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🔄 Çeviri Sonucu')
        .addFields(
          { name: '🇹🇷 Türkçe (Orijinal)', value: message.content },
          { name: '🇬🇧 İngilizce (Çeviri)', value: `# **${translationResult.translatedText}**` },
          { name: 'Karakter Limiti', value: `${charLimit.used} / ${charLimit.limit} (${charLimit.remaining} kaldı)` }
        )
        .setTimestamp();
      
      // Butonları ekle
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('delete_message')
            .setLabel('Sil')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('retry_translation')
            .setLabel('Yeniden Çevir')
            .setStyle(ButtonStyle.Secondary),
        );
      
      // Embed ve butonları içeren mesajı gönder
      await message.reply({ embeds: [translationEmbed], components: [row] });
    } catch (error) {
      console.error('Çeviri hatası:', error);
      message.reply('Çeviri yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  }
});

// Buton tıklamalarını işle
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;
  
  // Sil butonuna tıklandığında
  if (interaction.customId === 'delete_message') {
    // Orijinal mesajı ve cevap mesajını sil
    await interaction.message.delete();
    await interaction.reply({ content: 'Mesaj silindi.', ephemeral: true });
  }
  
  // Yeniden çevir butonuna tıklandığında
  if (interaction.customId === 'retry_translation') {
    try {
      await interaction.deferUpdate();
      
      // Orijinal mesajı al
      const originalMessage = interaction.message.embeds[0].fields[0].value;
      
      // Yeniden çeviri yap
      const translationResult = await translateText(originalMessage);
      
      // Karakter kullanım bilgilerini al
      const charLimit = await getCharacterLimit();
      
      // Yeni embed oluştur
      const newEmbed = EmbedBuilder.from(interaction.message.embeds[0])
        .spliceFields(1, 1, { name: '🇬🇧 İngilizce (Çeviri)', value: `# **${translationResult.translatedText}**` })
        .spliceFields(2, 1, { name: 'Karakter Limiti', value: `${charLimit.used} / ${charLimit.limit} (${charLimit.remaining} kaldı)` })
        .setTimestamp();
      
      // Mesajı güncelle
      await interaction.message.edit({ embeds: [newEmbed] });
    } catch (error) {
      console.error('Yeniden çeviri hatası:', error);
      await interaction.reply({ content: 'Yeniden çeviri yapılırken bir hata oluştu.', ephemeral: true });
    }
  }
});

// Hata durumunda
client.on('error', (error) => {
  console.error('Discord botu hatası:', error);
});

// Discord'a bağlan
client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('Discord\'a bağlanırken hata oluştu:', err);
});
