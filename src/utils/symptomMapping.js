/**
 * Demo symptom-to-department mapping.
 * Uses simple keyword matching — NOT ML.
 * Sufficient for hackathon demonstration.
 */

const mappings = [
  {
    keywords: ['fever', 'cold', 'cough', 'weakness', 'body ache', 'flu', 'headache', 'fatigue', 'vomiting', 'diarrhea', 'nausea', 'throat', 'bukhar', 'khansi', 'jukam', 'kamzori', 'chakker', 'chakkar', 'ulti', 'dard', 'pet dard', 'बुखार', 'खांसी', 'जुकाम', 'कमज़ोरी', 'कमजोरी', 'चक्कर', 'उल्टी', 'दर्द', 'पेट दर्द', 'थकान', 'खासी'],
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
    keywords: ['brain', 'nerve', 'seizure', 'migraine', 'numbness', 'paralysis', 'stroke', 'dizziness', 'memory', 'dimag', 'nas', 'lakwa', 'bhool', 'दिमाग', 'नस', 'लकवा', 'भूल', 'दौरा', 'चक्कर'],
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
    keywords: ['ear', 'nose', 'throat', 'hearing', 'sinus', 'tonsil', 'snoring', 'voice', 'kaan', 'kan', 'naak', 'nak', 'gala', 'awaz', 'कान', 'नाक', 'गला', 'आवाज़', 'आवाज'],
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
