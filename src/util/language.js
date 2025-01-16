// src/utils/language.js
const languageConfig = {
    zh: {
      name: 'Chinese',
      native: '中文',
      group: 'Asian',
      description: 'Chinese (Mandarin)'
    },
    en: {
      name: 'English',
      native: 'English',
      group: 'European',
      description: 'English (US)'
    },
    // ...
  };
  
  export const getLanguageInfo = (code) => {
    return languageConfig[code] || { name: code || 'Unknown' };
  };
  
  export const getLanguageName = (code) => {
    return getLanguageInfo(code).name;
  };
  
  export const getLanguageNativeName = (code) => {
    return getLanguageInfo(code).native || getLanguageInfo(code).name;
  };