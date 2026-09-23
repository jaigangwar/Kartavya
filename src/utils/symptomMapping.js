/**
 * Demo symptom-to-department mapping.
 * Uses simple keyword matching — NOT ML.
 * Sufficient for hackathon demonstration.
 */

const mappings = [
  {
    keywords: ['fever', 'cold', 'cough', 'weakness', 'body ache', 'flu', 'fatigue', 'vomiting', 'diarrhea', 'nausea', 'bukhar', 'khansi', 'jukam', 'kamzori', 'ulti', 'dard', 'pet dard', 'बुखार', 'खांसी', 'जुकाम', 'कमज़ोरी', 'कमजोरी', 'उल्टी', 'दर्द', 'पेट दर्द', 'थकान', 'खासी'],
    department: 'General Medicine',
  },
  {
    keywords: ['bone', 'fracture', 'knee', 'joint', 'back pain', 'spine', 'shoulder', 'hip', 'ankle', 'sprain', 'arthritis', 'haddi', 'ghutna', 'kamar', 'kandha', 'moch', 'हड्डी', 'घुटना', 'कमर', 'कंधा', 'मोच', 'जोड़ों', 'जोड़'],
    department: 'Orthopedics',
  },
  {
    keywords: ['heart', 'chest pain', 'blood pressure', 'bp', 'palpitation', 'cardiac', 'heartbeat', 'dil', 'chhati', 'ghabrahat', 'दिल', 'छाती', 'घबराहट', 'बीपी', 'रक्तचाप', 'धड़कन'],
    department: 'Cardiology',
  },
  {
    keywords: ['brain', 'nerve', 'seizure', 'migraine', 'numbness', 'paralysis', 'stroke', 'memory', 'dimag', 'nas', 'lakwa', 'bhool', 'दिमाग', 'नस', 'लकवा', 'भूल', 'दौरा'],
    department: 'Neurology',
  },
  {
    keywords: ['child', 'baby', 'infant', 'pediatric', 'newborn', 'toddler', 'kid', 'bacha', 'bache', 'shishu', 'बच्चा', 'बच्चे', 'शिशु', 'बाल'],
    department: 'Pediatrics',
  },
  {
    keywords: ['pregnancy', 'period', 'menstrual', 'gynec', 'women', 'uterus', 'ovary', 'pcos', 'delivery', 'mahavari', 'garbhavati', 'mahila', 'bachadani', 'माहवारी', 'गर्भवती', 'महिला', 'बच्चेदानी', 'गर्भावस्था'],
    department: 'Gynecology',
  },
  {
    keywords: ['skin', 'rash', 'acne', 'eczema', 'allergy', 'itch', 'fungal', 'hair loss', 'pigment', 'tvacha', 'khujli', 'daane', 'baal', 'bal', 'त्वचा', 'खुजली', 'दाने', 'बाल', 'मुंहासे'],
    department: 'Dermatology',
  },
  {
    keywords: ['ear', 'nose', 'throat', 'hearing', 'sinus', 'tonsil', 'snoring', 'voice', 'kaan', 'kan', 'naak', 'nak', 'gala', 'awaz', 'कान', 'नाक', 'गला', 'आवाज़', 'आवाज', 'headache', 'sir dard', 'sir', 'सिर दर्द', 'सिर', 'चक्कर', 'chakkar', 'chakker', 'chkkar', 'dizziness'],
    department: 'ENT',
  },
  {
    keywords: ['eye', 'vision', 'sight', 'blind', 'cataract', 'spectacle', 'glasses', 'retina', 'aankh', 'ankh', 'nazar', 'chashma', 'आंख', 'आँख', 'नज़र', 'नजर', 'चश्मा'],
    department: 'Ophthalmology',
  },
  {
    keywords: ['blood test', 'lab', 'pathology', 'biopsy', 'sample', 'report', 'khoon', 'khun ki janch', 'test', 'खून', 'जांच', 'रिपोर्ट', 'रक्त'],
    department: 'Pathology',
  },
  {
    keywords: ['x-ray', 'xray', 'scan', 'mri', 'ct scan', 'ultrasound', 'sonography', 'imaging', 'एक्स-रे', 'एक्सरे', 'स्कैन', 'अल्ट्रासाउंड'],
    department: 'Radiology',
  },
];

/**
 * Takes a symptoms string, returns the best matching department or null.
 */
export function suggestDepartment(symptoms) {
  if (!symptoms || symptoms.trim().length < 2) return null;

  const text = symptoms.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const { keywords, department } of mappings) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = department;
    }
  }

  return bestMatch;
}

export function translateToMedicalTerms(symptoms) {
  if (!symptoms) return '';
  const text = symptoms.toLowerCase();
  
  const translations = [
    { hi: 'बुखार', en: 'Fever' },
    { hi: 'bukhar', en: 'Fever' },
    { hi: 'खांसी', en: 'Cough' },
    { hi: 'खासी', en: 'Cough' },
    { hi: 'khansi', en: 'Cough' },
    { hi: 'जुकाम', en: 'Cold/Coryza' },
    { hi: 'चक्कर', en: 'Dizziness/Vertigo' },
    { hi: 'chakkar', en: 'Dizziness/Vertigo' },
    { hi: 'chakker', en: 'Dizziness/Vertigo' },
    { hi: 'chkkar', en: 'Dizziness/Vertigo' },
    { hi: 'उल्टी', en: 'Vomiting' },
    { hi: 'ulti', en: 'Vomiting' },
    { hi: 'पेट दर्द', en: 'Abdominal Pain' },
    { hi: 'pet dard', en: 'Abdominal Pain' },
    { hi: 'सिर दर्द', en: 'Headache' },
    { hi: 'sir dard', en: 'Headache' },
    { hi: 'headache', en: 'Headache' },
    { hi: 'दर्द', en: 'Pain' },
    { hi: 'dard', en: 'Pain' },
    { hi: 'कमज़ोरी', en: 'Weakness' },
    { hi: 'कमजोरी', en: 'Weakness' },
    { hi: 'थकान', en: 'Fatigue' },
    { hi: 'हड्डी', en: 'Bone' },
    { hi: 'घुटना', en: 'Knee' },
    { hi: 'कमर', en: 'Back' },
    { hi: 'कंधा', en: 'Shoulder' },
    { hi: 'मोच', en: 'Sprain' },
    { hi: 'दिल', en: 'Cardiac' },
    { hi: 'छाती', en: 'Chest' },
    { hi: 'घबराहट', en: 'Palpitations' },
    { hi: 'बीपी', en: 'Blood Pressure' },
    { hi: 'दिमाग', en: 'Neurological' },
    { hi: 'नस', en: 'Nerve' },
    { hi: 'लकवा', en: 'Paralysis' },
    { hi: 'भूल', en: 'Memory loss' },
    { hi: 'दौरा', en: 'Seizures' },
    { hi: 'बच्चा', en: 'Pediatric' },
    { hi: 'शिशु', en: 'Infant' },
    { hi: 'माहवारी', en: 'Menstrual' },
    { hi: 'गर्भवती', en: 'Pregnancy' },
    { hi: 'बच्चेदानी', en: 'Uterus' },
    { hi: 'त्वचा', en: 'Skin' },
    { hi: 'खुजली', en: 'Pruritus / Itching' },
    { hi: 'दाने', en: 'Rash' },
    { hi: 'कान', en: 'Ear' },
    { hi: 'नाक', en: 'Nose' },
    { hi: 'गला', en: 'Throat' },
    { hi: 'आंख', en: 'Eye' },
    { hi: 'नज़र', en: 'Vision' },
    { hi: 'खून', en: 'Blood' },
    { hi: 'जांच', en: 'Test' },
  ];

  let matchedTerms = [];
  // Sort translations by length descending to match longer phrases first
  const sortedTranslations = [...translations].sort((a, b) => b.hi.length - a.hi.length);

  let tempText = text;
  for (const { hi, en } of sortedTranslations) {
    if (tempText.includes(hi)) {
      if (!matchedTerms.includes(en)) {
        matchedTerms.push(en);
      }
      // Remove matched word so it doesn't match smaller sub-words
      tempText = tempText.replace(new RegExp(hi, 'g'), '');
    }
  }

  if (matchedTerms.length > 0) {
    return matchedTerms.join(', ');
  }

  return symptoms;
}

/**
 * All available departments.
 */
export const departments = [
  'General Medicine',
  'Orthopedics',
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Gynecology',
  'Dermatology',
  'ENT',
  'Ophthalmology',
  'Pathology',
  'Microbiology / Biochemistry',
  'Radiology',
  'Physiology',
];
