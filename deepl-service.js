const axios = require('axios');

// DeepL API temel URL'i
const DEEPL_API_URL = 'https://api-free.deepl.com/v2';
const API_KEY = process.env.DEEPL_API_KEY;

/**
 * Metni DeepL API kullanarak Türkçe'den İngilizce'ye çevirir
 * @param {string} text - Çevrilecek Türkçe metin
 * @returns {Promise<Object>} - Çevirilen metin ve ilgili bilgiler
 */
async function translateText(text) {
  if (!text || text.trim() === '') {
    throw new Error('Çevrilecek metin boş olamaz');
  }

  try {
    const response = await axios.post(
      `${DEEPL_API_URL}/translate`,
      {
        text: [text],
        source_lang: 'TR',
        target_lang: 'EN',
      },
      {
        headers: {
          'Authorization': `DeepL-Auth-Key ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      translatedText: response.data.translations[0].text,
      detectedLanguage: response.data.translations[0].detected_source_language,
    };
  } catch (error) {
    console.error('DeepL API çeviri hatası:', error.response?.data || error.message);
    throw new Error('Çeviri yapılırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
  }
}

/**
 * DeepL API'nin karakter kullanım limitini kontrol etme
 * @returns {Promise<Object>} - Kullanım limiti bilgileri
 */
/**
 * DeepL API'nin karakter kullanım limitini kontrol eder
 * @returns {Promise<Object>} - Kullanım limiti bilgileri:
 *   used {number}: Kullanılan karakter sayısı
 *   limit {number}: Toplam karakter limiti
 *   remaining {number}: Kullanılabilir karakter sayısı
 */
async function getCharacterLimit() {
  try {
    const response = await axios.get(`${DEEPL_API_URL}/usage`, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${API_KEY}`,
      },
    });

    const { character_count, character_limit } = response.data;
    
    return {
      used: character_count,
      limit: character_limit,
      remaining: character_limit - character_count
    };
  } catch (error) {
    console.error('DeepL API kullanım limiti hatası:', error.response?.data || error.message);
    throw new Error('API kullanım limiti alınırken hata oluştu: ' + (error.response?.data?.message || error.message));
  }
}

module.exports = {
  translateText,
  getCharacterLimit,
};
