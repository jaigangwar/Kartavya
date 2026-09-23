'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    // Instructions
    formInstructions: "Please fill out the form using English. Ensure all details exactly match your Aadhaar card for quick verification.",
    aadhaarInstructions: "Place your Aadhaar card in the scanner. Wait for the green confirmation checkmark.",
    kioskWelcome: "Welcome to KARTAVYA",
    kioskSub: "Register for your OPD appointment in just a few simple steps. No paperwork needed.",
    tapToStart: "Tap to Start Registration",
    
    // Labels
    patientDetails: "Patient Details",
    patientDetailsSub: "Please fill in the patient information below.",
    patientName: "Patient Name",
    fatherName: "Father's Name / Guardian Name",
    age: "Age",
    sex: "Sex",
    male: "Male",
    female: "Female",
    maritalStatus: "Marital Status",
    contactDetails: "Contact Details",
    mobile: "Mobile Number",
    email: "Email ID (Optional)",
    address: "Full Address",
    continue: "Continue",
    back: "Back",
    scanAadhaar: "Scan Aadhaar",
    verifyIdentity: "Verify Your Identity",
    verifyIdentitySub: "Quick identity verification using your Aadhaar card.",
  },
  hi: {
    // Instructions
    formInstructions: "कृपया फॉर्म भरें। त्वरित सत्यापन के लिए सुनिश्चित करें कि सभी विवरण आपके आधार कार्ड से बिल्कुल मेल खाते हैं।",
    aadhaarInstructions: "अपना आधार कार्ड स्कैनर में रखें। हरे रंग के पुष्टिकरण चिह्न की प्रतीक्षा करें।",
    kioskWelcome: "कर्तव्य में आपका स्वागत है",
    kioskSub: "बस कुछ ही आसान चरणों में अपनी ओपीडी (OPD) अपॉइंटमेंट के लिए पंजीकरण करें। कोई कागजी कार्रवाई नहीं।",
    tapToStart: "पंजीकरण शुरू करने के लिए टैप करें",
    
    // Labels
    patientDetails: "मरीज़ का विवरण (Patient Details)",
    patientDetailsSub: "कृपया नीचे मरीज़ की जानकारी भरें।",
    patientName: "मरीज़ का नाम",
    fatherName: "पिता / अभिभावक का नाम",
    age: "उम्र (Age)",
    sex: "लिंग (Sex)",
    male: "पुरुष",
    female: "महिला",
    maritalStatus: "वैवाहिक स्थिति",
    contactDetails: "संपर्क विवरण",
    mobile: "मोबाइल नंबर",
    email: "ईमेल आईडी (वैकल्पिक)",
    address: "पूरा पता",
    continue: "आगे बढ़ें (Continue)",
    back: "पीछे (Back)",
    scanAadhaar: "आधार स्कैन करें",
    verifyIdentity: "अपनी पहचान सत्यापित करें",
    verifyIdentitySub: "अपने आधार कार्ड का उपयोग करके त्वरित पहचान सत्यापन।",
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('kartavya-lang');
    if (saved && (saved === 'en' || saved === 'hi')) setLang(saved);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kartavya-lang', newLang);
    }
  };

  const t = (key) => translations[lang][key] || translations['en'][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
