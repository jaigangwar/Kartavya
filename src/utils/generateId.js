/**
 * Generates a realistic patient ID.
 * Format: KAR-OPD-YYYY-XXXXX
 */
export function generatePatientId() {
  const year = new Date().getFullYear();
  const seq = Math.floor(10000 + Math.random() * 90000);
  return `KAR-OPD-${year}-${seq}`;
}
