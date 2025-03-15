import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, LayoutDashboard, Briefcase, Menu, X, Globe } from "lucide-react";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  // Function to toggle language
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"; // Set direction
  };

  return (
<div
  className={`flex transition-all duration-300 ${
    isOpen ? (isRTL ? "mr-64" : "ml-64") : (isRTL ? "mr-16" : "ml-16")
  }`}
>
  {/* Sidebar */}
  <div
    className={`h-screen bg-gray-200 text-black p-4 fixed top-0 transition-all duration-300 ${
      isOpen ? "w-64" : "w-16"
    } ${isRTL ? "right-0" : "left-0"}`}
  >
    {/* Toggle Button */}
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 bg-white text-black rounded-full shadow-md"
      style={isRTL ? { right: "1rem" } : { left: "1rem" }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>

    {/* Sidebar Navigation */}
    <nav className="mt-10 space-y-4">
      <Link
        to="/"
        className={`flex items-center gap-2 p-2 rounded font-semibold duration-300 ${
          isActive("/") ? "bg-blue-500 text-white" : "hover:bg-gray-500 hover:text-white"
        }`}
      >
        <Home className="h-5 w-5" />
        {isOpen && t("home")}
      </Link>

      <Link
        to="/dashboard"
        className={`flex items-center gap-2 p-2 rounded font-semibold duration-300 ${
          isActive("/dashboard") ? "bg-blue-500 text-white" : "hover:bg-gray-500 hover:text-white"
        }`}
      >
        <LayoutDashboard className="h-5 w-5" />
        {isOpen && t("dashboard")}
      </Link>

      <Link
        to="/investment"
        className={`flex items-center gap-2 p-2 rounded font-semibold duration-300 ${
          isActive("/investment") ? "bg-blue-500 text-white" : "hover:bg-gray-500 hover:text-white"
        }`}
      >
        <Briefcase className="h-5 w-5" />
        {isOpen && t("investment_table")}
      </Link>
    </nav>

    {/* Language Switcher Button */}
    <Button onClick={toggleLanguage} className="mt-6 w-full bg-black text-white p-2 rounded flex items-center gap-2">
      {!isOpen ? <Globe className="h-5 w-5" /> : t("toggle_language")}
    </Button>
  </div>
</div>
  );
}
