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
    
    // Department Selection
    whereToGo: "Where would you like to go?",
    whereToGoSub: "Select your department or describe your problem.",
    aiSuggestion: "AI-Powered Department Suggestion",
    aiSuggestionSub: "Don't know which department? Describe your symptoms and our ML model will suggest the right department automatically.",
    searchDept: "Search departments...",
    noDeptMatch: "No departments match your search.",
    describeProblem: "Don't know the department? Describe your problem",
    describeSymptomsPlaceholder: "Describe your symptoms or health problem...",
    mlSuggestedDept: "ML Suggested Department",
    useSuggestion: "Use Suggestion",
    selectedDept: "Selected",
    
    // Review
    reviewRegistration: "Review Registration",
    reviewSub: "Verify your information before generating the OPD slip.",
    patientInfoTitle: "Patient Information",
    verificationTitle: "Verification",
    aadhaarVerified: "Verified",
    notProvided: "Not Provided",
    opdDetailsTitle: "OPD Details",
    department: "Department",
    problemSymptoms: "Problem / Symptoms",
    editDetails: "Edit Details",
    generateSlip: "Generate OPD Slip",
    
    // Success
    regCompleted: "Registration Completed",
    regSuccessSub: "Your OPD slip has been generated successfully.",
    patientId: "Patient ID",
    viewSlip: "View OPD Slip",
    newReg: "New Registration",
    
    // Aadhaar Verification specific
    scanning: "Scanning...",
    holdSteady: "Please hold steady",
    clickToSimulate: "Click to simulate biometric scan",
    identityVerified: "Identity Verified!",
    proceeding: "Proceeding to next step...",
    skipVerification: "Skip verification for now",
    
    // Progress Bar Steps
    step1: "Department",
    step2: "Patient Details",
    step3: "Verification",
    step4: "Review",
    step5: "OPD Slip",
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
    
    // Department Selection
    whereToGo: "आप कहाँ जाना चाहेंगे?",
    whereToGoSub: "अपना विभाग चुनें या अपनी समस्या का वर्णन करें।",
    aiSuggestion: "एआई (AI) द्वारा विभाग का सुझाव",
    aiSuggestionSub: "विभाग नहीं जानते? अपने लक्षणों का वर्णन करें और हमारा एआई स्वचालित रूप से सही विभाग का सुझाव देगा।",
    searchDept: "विभाग खोजें...",
    noDeptMatch: "आपकी खोज से कोई विभाग मेल नहीं खाता।",
    describeProblem: "विभाग नहीं जानते? अपनी समस्या का वर्णन करें",
    describeSymptomsPlaceholder: "अपने लक्षणों या स्वास्थ्य समस्या का वर्णन करें...",
    mlSuggestedDept: "एआई द्वारा सुझाया गया विभाग",
    useSuggestion: "सुझाव का प्रयोग करें",
    selectedDept: "चयनित",
    
    // Review
    reviewRegistration: "पंजीकरण की समीक्षा करें",
    reviewSub: "ओपीडी पर्ची (OPD Slip) बनाने से पहले अपनी जानकारी जांच लें।",
    patientInfoTitle: "मरीज़ की जानकारी",
    verificationTitle: "सत्यापन (Verification)",
    aadhaarVerified: "सत्यापित (Verified)",
    notProvided: "उपलब्ध नहीं (Not Provided)",
    opdDetailsTitle: "ओपीडी विवरण",
    department: "विभाग (Department)",
    problemSymptoms: "समस्या / लक्षण",
    editDetails: "विवरण संपादित करें",
    generateSlip: "ओपीडी पर्ची बनाएं (Generate)",
    
    // Success
    regCompleted: "पंजीकरण पूरा हुआ",
    regSuccessSub: "आपकी ओपीडी पर्ची सफलतापूर्वक बना दी गई है।",
    patientId: "मरीज़ आईडी (Patient ID)",
    viewSlip: "ओपीडी पर्ची देखें",
    newReg: "नया पंजीकरण",
    
    // Aadhaar Verification specific
    scanning: "स्कैन हो रहा है...",
    holdSteady: "कृपया स्थिर रहें",
    clickToSimulate: "सिम्युलेट करने के लिए क्लिक करें",
    identityVerified: "पहचान सत्यापित (Verified)!",
    proceeding: "अगले चरण पर जा रहे हैं...",
    skipVerification: "अभी के लिए सत्यापन छोड़ें (Skip)",

    // Progress Bar Steps
    step1: "विभाग",
    step2: "मरीज़ का विवरण",
    step3: "सत्यापन",
    step4: "समीक्षा",
    step5: "ओपीडी पर्ची",
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
