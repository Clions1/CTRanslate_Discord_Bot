# CTRanslate Discord Bot

![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Bu bot, Discord DM üzerinden gönderilen Türkçe mesajları İngilizce'ye çeviren bir bot uygulamasıdır. DeepL API kullanarak hızlı ve doğru çeviriler sağlar.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Gereksinimler](#gereksinimler)
- [Discord Bot Oluşturma](#discord-bot-oluşturma)
- [DeepL API Anahtarı Alma](#deepl-api-anahtarı-alma)
- [Kurulum](#kurulum)
- [GitHub'a Yükleme](#githuba-yükleme)
- [Kullanım](#kullanım)
- [Sorun Giderme](#sorun-giderme)
- [Katkıda Bulunma](#katkıda-bulunma)
- [İletişim](#i̇letişim)
- [Lisans](#lisans)

## ✨ Özellikler

- Discord DM'den gelen Türkçe mesajları İngilizce'ye otomatik çevirme
- Çevirilerin vurgulanmış ve büyük yazı tipiyle gösterilmesi
- Kalan DeepL API karakter limitini anlık olarak takip etme
- "Sil" ve "Yeniden Çevir" butonlarıyla kolay kullanım
- Bayrak emojileriyle görsel zenginlik
- Yerel olarak çalıştırma imkanı

## 📋 Gereksinimler

- [Node.js](https://nodejs.org/) (v16.0.0 veya üstü)
- [npm](https://www.npmjs.com/) (Node.js ile birlikte gelir)
- Discord hesabı ve uygulaması
- DeepL API anahtarı (ücretsiz plan bile yeterlidir)
- Git (isteğe bağlı, GitHub'a yüklemek için)

## 🤖 Discord Bot Oluşturma

1. [Discord Developer Portal](https://discord.com/developers/applications)'a gidin
2. Sağ üstteki "New Application" butonuna tıklayın
3. Botunuza bir isim verin ve "Create" butonuna tıklayın
4. Sol menüden "Bot" sekmesine geçin
5. "Add Bot" butonuna tıklayın ve onaylayın
6. **ÖNEMLİ:** "Message Content Intent" seçeneğini açın (Bu, botun mesaj içeriklerini okuyabilmesi için gereklidir)
7. Bot token'ını "Reset Token" butonuna tıklayarak alın ve güvenli bir yere kaydedin
8. Sol menüden "OAuth2" > "URL Generator"a gidin
9. Scopes kısmından "bot" seçin
10. Bot Permissions kısmından en azından şu izinleri seçin:
    - Read Messages/View Channels
    - Send Messages
    - Use External Emojis
    - Add Reactions
    - Embed Links
11. Oluşturulan URL'yi kullanarak botunuzu sunucunuza ekleyin
12. Bot'u uygulamalarıma ekle butonuna tıklayın
13. Ve Bot hazır .

## 🔑 DeepL API Anahtarı Alma

1. [DeepL API sayfasına](https://www.deepl.com/pro-api) gidin
2. "Sign up for free" seçeneğini tıklayın
3. Gerekli bilgileri doldurarak bir hesap oluşturun
4. Hesabınızı doğrulayın ve DeepL hesabınıza giriş yapın
5. Hesap ayarlarından API anahtarınızı bulun ve kopyalayın

## 🚀 Kurulum

### Yerel Kurulum

1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/kullaniciadiniz/ctranslate-discord-bot.git
   cd ctranslate-discord-bot
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyası oluşturun ve Discord token ve DeepL API anahtarınızı ekleyin:
   ```bash
   touch .env
   echo "DISCORD_TOKEN=discord_token_buraya" >> .env
   echo "DEEPL_API_KEY=deepl_api_key_buraya" >> .env
   ```
   Ya da doğrudan `.env` dosyasını bir metin editörüyle düzenleyin.

4. Botu başlatın:
   ```bash
   npm start
   ```

### Yapılandırma

`.env` dosyası içinde aşağıdaki değişkenleri ayarlayabilirsiniz:

```
DISCORD_TOKEN=discord_bot_token_buraya
DEEPL_API_KEY=deepl_api_key_buraya
```


## 💬 Kullanım

1. Discord'da bot ile doğrudan mesaj (DM) başlatın
2. Türkçe bir mesaj yazın ve gönderin
3. Bot mesajınızı İngilizce'ye çevirecek ve cevap olarak gönderecektir
4. Çeviri sonucu ile birlikte kalan API karakter limitinizi göreceksiniz
5. "Sil" butonu ile çeviriyi silebilir, "Yeniden Çevir" butonu ile tekrar çevirebilirsiniz

## 🔧 Sorun Giderme

### Bot Çalışmıyor/Cevap Vermiyor

- Discord Developer Portal'da "Message Content Intent" açık olduğundan emin olun
- `.env` dosyasındaki token ve API anahtarının doğru olduğunu kontrol edin
- Discord'un API değişikliklerine göre `discord.js` sürümünün güncel olduğunu kontrol edin

### API Limiti Hatası

- DeepL API'nin ücretsiz planı aylık 500.000 karakter ile sınırlıdır
- Limit aşıldığında, bir sonraki ay başına kadar bekleyin veya ücretli plana geçiş yapın

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen:

1. Bu repoyu forklayın
2. Yeni bir feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Amazing feature added'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📧 İletişim

Sorularınız için: [Email gönder](mailto:clionjob@gmail.com)

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakınız.

---

**Türkçe:** Bu bot, çeviri için DeepL API'sini kullanır. Bu proje DeepL GmbH ile bağlantılı değildir.  
**English:** This bot uses the DeepL API for translation. This project is not affiliated with DeepL GmbH.