import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("i18nextLng") || "en"; // Load from localStorage

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        dashboard: "Dashboard",
        investment_table: "Investments",
        toggle_language: "Switch Language",
        invest_table: "Investment Table",
        add_investment: "Add Investment ",
        investmentname: "Investment Name",
        amount: "Amount",
        roi: "ROI",
        actions: "Actions",
        total_investments: "Total Investments",
        average_roi: "Average ROI",
        roi_trends: "ROI Trends",
      },
    },
    ar: {
      translation: {
        home: "الرئيسية",
        dashboard: "لوحة التحكم",
        investment_table: "الاستثمارات",
        toggle_language: "تغيير اللغة",
        invest_table:"جدول الأستثمار",
        add_investment: "اضف أستثمار ",
        investmentname:"أسم الأستثمار",
        amount:"المبلغ",
        roi:"العائد",
        actions:"أجراء",
        total_investments:"مجموع الأستثمارات",
        average_roi:"متوسط العائد",
        roi_trends:"اتجاه العائد على الأستثمار"
      },
    },
  },
  lng: savedLanguage, // Set initial language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
