import i18n from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "models": "Models",
          "ready": "Ready",
          "pending": "Training",
          "predictionResult": "result",
          "upload csv": "upload CSV",
          "sign out": "sign out",
          "user info": "User Info",
        }
      },
      ja: {
        translation: {
          "models": "モデル一覧",
          "ready": "準備ができました",
          "pending": "学習中",
          "predictionResult": "予測結果",
          "upload csv": "CSVアップロード",
          "sign out": "ログアウト",
          "user info": "ユーザー情報",
        }
      }
    },
    lng: "ja",
    fallbackLng: "ja",

    interpolation: {
      escapeValue: false
    }
  });


