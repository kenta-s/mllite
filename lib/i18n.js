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
          "Sign up": "Sign up",
          "Email Address": "Email Address",
          "Password": "Password(at least 6 characters)",
          "Password confirmation": "Password(confirmation)",
          "Forgot password?": "Forgot password?",
          "Already have an account? Sign In": "Already have an account? Sign In",
          "Create Account for Free": "Free trial",
          "Email is invalid": "Email is invalid",
          "Email is not an email": "Email is invalid",
          "Registration is not completed yet": "Registration is not completed yet",
          "Confirmation email has been sent": "Confirmation email has been sent. Please confirm your email box.",
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
          "Sign up": "アカウント登録",
          "Email Address": "メールアドレス",
          "Password": "パスワード(6字以上)",
          "Password confirmation": "パスワード(確認用)",
          "Forgot password?": "パスワードをお忘れですか?",
          "Already have an account? Sign In": "アカウントをお持ちの方はこちらからログイン",
          "Create Account for Free": "アカウント作成（無料）",
          "Email is invalid": "メールアドレスが不正です",
          "Email is not an email": "メールアドレスが不正です",
          "Registration is not completed yet": "登録はまだ完了していません",
          "Confirmation email has been sent": "認証メールが送信されました。メール内のリンクから登録を完了してください。しばらく経っても届かない場合は迷惑メールフォルダをご確認ください。",
        }
      }
    },
    lng: "ja",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });


