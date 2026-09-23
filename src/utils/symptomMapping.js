/**
 * Demo symptom-to-department mapping.
 * Uses simple keyword matching — NOT ML.
 * Sufficient for hackathon demonstration.
 */

const mappings = [
  {
    keywords: ['fever', 'cold', 'cough', 'weakness', 'body ache', 'flu', 'headache', 'fatigue', 'vomiting', 'diarrhea', 'nausea', 'throat'],
    department: 'General Medicine',
  },
  {
    keywords: ['bone', 'fracture', 'knee', 'joint', 'back pain', 'spine', 'shoulder', 'hip', 'ankle', 'sprain', 'arthritis'],
    department: 'Orthopedics',
  },
  {
    keywords: ['heart', 'chest pain', 'blood pressure', 'bp', 'palpitation', 'cardiac', 'heartbeat'],
    department: 'Cardiology',
  },
  {
    keywords: ['brain', 'nerve', 'seizure', 'migraine', 'numbness', 'paralysis', 'stroke', 'dizziness', 'memory'],
    department: 'Neurology',
  },
  {
    keywords: ['child', 'baby', 'infant', 'pediatric', 'newborn', 'toddler', 'kid'],
    department: 'Pediatrics',
  },
  {
    keywords: ['pregnancy', 'period', 'menstrual', 'gynec', 'women', 'uterus', 'ovary', 'pcos', 'delivery'],
    department: 'Gynecology',
  },
  {
    keywords: ['skin', 'rash', 'acne', 'eczema', 'allergy', 'itch', 'fungal', 'hair loss', 'pigment'],
    department: 'Dermatology',
  },
  {
    keywords: ['ear', 'nose', 'throat', 'hearing', 'sinus', 'tonsil', 'snoring', 'voice'],
    department: 'ENT',
  },
  {
    keywords: ['eye', 'vision', 'sight', 'blind', 'cataract', 'spectacle', 'glasses', 'retina'],
    department: 'Ophthalmology',
  },
  {
    keywords: ['blood test', 'lab', 'pathology', 'biopsy', 'sample', 'report'],
    department: 'Pathology',
  },
  {
    keywords: ['x-ray', 'xray', 'scan', 'mri', 'ct scan', 'ultrasound', 'sonography', 'imaging'],
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
