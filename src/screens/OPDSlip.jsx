'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useRegistration } from '@/context/RegistrationContext';
import BubbleSelector from '@/components/BubbleSelector';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Download, RotateCcw, ArrowLeft, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const investigationOptions = [
  { value: 'Pathology', label: 'Pathology' },
  { value: 'Microbiology', label: 'Microbiology' },
  { value: 'Radiology', label: 'Radiology' },
  { value: 'Physiology', label: 'Physiology' },
];

const triageOptions = [
  { value: 'Routine', label: 'Routine', color: '#27ae60' },
  { value: 'Priority', label: 'Priority', color: '#2980b9' },
  { value: 'Urgent', label: 'Urgent', color: '#e67e22' },
  { value: 'Emergency', label: 'Emergency', color: '#c0392b' },
];

const omrDays = ['1', '2', '3', '5', '7', '10', '15'];
const omrMonths = ['1', '2', '3', '6'];

export default function OPDSlip({ isKiosk = false }) {
  const { data, slipData, updateSlipData, resetRegistration, prevStep } = useRegistration();
  const slipRef = useRef(null);
  const router = useRouter();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (typeof window === 'undefined') return;
    const html2pdf = (await import('html2pdf.js')).default;
    const element = slipRef.current;
    if (!element) return;

    html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: `OPD-Slip-${data.patientId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  const handleNewRegistration = () => {
    resetRegistration();
    if (!isKiosk) {
      router.push('/');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* ─── Action Bar ─── */}
      <div className="no-print glass border-b border-white/20 sticky top-0 z-10 mb-4 sm:mb-8">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={prevStep} className="btn-ghost text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="btn-secondary text-sm py-2 px-4">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button onClick={handleDownload} className="btn-primary text-sm py-2 px-4">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button onClick={handleNewRegistration} className="btn-ghost text-sm py-2 px-4 text-danger hover:bg-danger/10 hover:text-danger">
              <RotateCcw className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      </div>

      {/* ─── OPD Slip Document ─── */}
      <div className={`${isKiosk ? 'px-4 pb-12' : 'px-4 pb-12'} flex justify-center`}>
        <div
          ref={slipRef}
          className="opd-slip bg-white w-full shadow-2xl border border-slate-200"
          style={{ maxWidth: '210mm', padding: '24px 28px', minHeight: '297mm', position: 'relative' }}
        >
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full border-[20px] border-black flex items-center justify-center">
              <span className="text-8xl font-bold tracking-widest uppercase transform -rotate-45">Kartavya</span>
            </div>
          </div>

          <div className="relative z-10">
            {/* ══════════ HEADER ══════════ */}
            <div className="opd-slip-header flex justify-between items-end mb-4">
              <div className="flex-1">
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '1px', margin: 0, textTransform: 'uppercase', color: '#1a5276' }}>
                  Rohilkhand Medical College and Hospital
                </h1>
                <p style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', margin: '4px 0 0', textTransform: 'uppercase', color: '#444' }}>
                  OPD Registration Slip
                </p>
              </div>
              <div className="text-right">
                <QRCodeSVG
                  value={`https://kartavya.hospital/nav/${data.patientId}`}
                  size={50}
                  level="L"
                />
                <p style={{ fontSize: '8px', color: '#666', marginTop: '2px' }}>Main Navigation</p>
              </div>
            </div>

            {/* ══════════ DEPARTMENT & DOCTOR ══════════ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>Department:</span>
                  <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a5276' }}>{data.department}</span>
                  {data.symptoms && (
                    <span style={{ fontSize: '9px', background: '#eaf2f8', color: '#2980b9', padding: '2px 6px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Sparkles size={10} /> AI Assigned
                    </span>
                  )}
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#666' }}>Doctor Name:</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', borderBottom: '1px dashed #999', display: 'inline-block', minWidth: '200px', marginLeft: '6px' }}>
                    {data.doctorName || 'Dr. '}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: '#666' }}>Date: </span>
                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{data.registrationDate}</span>
              </div>
            </div>

            {/* ══════════ PATIENT INFO ROW ══════════ */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '11px',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '10px',
              marginBottom: '16px',
              background: '#fafafa',
              padding: '10px',
              borderRadius: '4px'
            }}>
              <div style={{ flex: '1 1 120px' }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase' }}>Patient ID</span><br />
                <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '13px', color: '#c0392b' }}>{data.patientId}</span>
              </div>
              <div style={{ flex: '2 1 180px' }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase' }}>Patient Name</span><br />
                <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{data.patientName}</span>
              </div>
              <div style={{ flex: '1 1 80px' }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase' }}>Age / Sex</span><br />
                <span style={{ fontWeight: '600' }}>{data.age} Y / {data.sex.charAt(0)}</span>
              </div>
              <div style={{ flex: '2 1 160px' }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase' }}>Father / Guardian</span><br />
                <span style={{ fontWeight: '600' }}>{data.fatherName}</span>
              </div>
              <div style={{ flex: '1 1 100px' }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase' }}>Mobile</span><br />
                <span style={{ fontWeight: '600' }}>{data.mobile}</span>
              </div>
              <div style={{ flex: '3 1 100%', marginTop: '4px' }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase' }}>Address</span><br />
                <span style={{ fontWeight: '500' }}>{data.address}</span>
              </div>
            </div>

            {/* ══════════ MAIN BODY — 2 COLUMNS ══════════ */}
            <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '16px', minHeight: '450px' }}>
              
              {/* ─── LEFT COLUMN ─── */}
              <div style={{ borderRight: '1px solid #ddd', paddingRight: '12px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Investigation */}
                <div style={{ marginBottom: '16px' }}>
                  <BubbleSelector
                    label="Investigation"
                    options={investigationOptions}
                    value={slipData.investigation}
                    onChange={(v) => updateSlipData('investigation', v)}
                    compact
                  />
                  
                  {/* Investigation Nav QR */}
                  <div style={{ marginTop: '10px', textAlign: 'center', background: '#f8f9fa', padding: '8px', border: '1px solid #eee', borderRadius: '4px' }}>
                    <p style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '4px', color: '#1a5276' }}>Investigation Nav</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <QRCodeSVG
                        value={`https://kartavya.hospital/nav/investigation/${data.patientId}`}
                        size={48}
                        level="L"
                      />
                    </div>
                  </div>
                </div>

                {/* Advice */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', flex: 1 }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#333', marginBottom: '6px' }}>
                    Advice
                  </p>
                  <textarea
                    value={slipData.advice}
                    onChange={(e) => updateSlipData('advice', e.target.value)}
                    placeholder="Notes..."
                    style={{
                      width: '100%', height: '100px', border: '1px dashed #ccc', borderRadius: '4px',
                      padding: '6px', fontSize: '10px', fontFamily: 'inherit', resize: 'none', outline: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>

                {/* Follow-Up OMR */}
                <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginTop: 'auto' }}>
                  <p style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#333', marginBottom: '8px' }}>
                    Follow-Up
                  </p>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '9px', color: '#666', display: 'block', marginBottom: '4px' }}>DAYS</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {omrDays.map(d => (
                        <div key={`day-${d}`} 
                          onClick={() => updateSlipData('followUpDay', d)}
                          className={`omr-bubble ${slipData.followUpDay === d ? 'filled' : ''}`}>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span style={{ fontSize: '9px', color: '#666', display: 'block', marginBottom: '4px' }}>MONTHS</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {omrMonths.map(m => (
                        <div key={`month-${m}`}
                          onClick={() => updateSlipData('followUpMonth', m)}
                          className={`omr-bubble ${slipData.followUpMonth === m ? 'filled' : ''}`}>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* ─── RIGHT COLUMN ─── */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                
                {/* Triage - Horizontal layout to save space */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  marginBottom: '12px',
                  background: '#f8f9fa',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #eee'
                }}>
                  <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Triage:</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {triageOptions.map((opt) => (
                      <label key={opt.value} style={{ display: 'flex', items: 'center', gap: '4px', cursor: 'pointer' }}>
                        <input 
                          type="radio" 
                          name="triage" 
                          checked={slipData.triagePriority === opt.value}
                          onChange={() => updateSlipData('triagePriority', opt.value)}
                          style={{ margin: 0, accentColor: opt.color }}
                        />
                        <span style={{ fontSize: '11px', fontWeight: slipData.triagePriority === opt.value ? 'bold' : 'normal', color: slipData.triagePriority === opt.value ? opt.color : '#555' }}>
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Prescription Area */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a5276', lineHeight: 1 }}>Rx</span>
                  <span style={{ fontSize: '11px', color: '#888', marginTop: '6px', fontStyle: 'italic' }}>Clinical Notes & Prescription</span>
                </div>
                
                <div style={{
                  flex: 1,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  position: 'relative',
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #e8e8e8 23px, #e8e8e8 24px)',
                  backgroundSize: '100% 24px',
                  backgroundAttachment: 'local'
                }}>
                  {/* Symptoms prefill */}
                  {data.symptoms && (
                    <div style={{
                      position: 'absolute',
                      top: '4px',
                      left: '8px',
                      right: '8px',
                      fontSize: '11px',
                      color: '#444',
                      background: 'rgba(255,255,255,0.8)',
                      padding: '2px 4px'
                    }}>
                      <span style={{ fontWeight: 'bold' }}>C/O:</span> {data.symptoms}
                    </div>
                  )}
                  {/* Hidden textarea just to allow typing on the lines if needed in demo */}
                  <textarea 
                    style={{
                      width: '100%', height: '100%', background: 'transparent', border: 'none', resize: 'none',
                      lineHeight: '24px', padding: '0 8px', outline: 'none', fontSize: '14px',
                      marginTop: data.symptoms ? '24px' : '0'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ══════════ FOOTER ══════════ */}
            <div style={{
              marginTop: '20px',
              borderTop: '2px solid #1a1a1a',
              paddingTop: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '9px',
              color: '#666',
            }}>
              <span>System Gen ID: {data.patientId}</span>
              <span>Valid for 15 days from Date of Registration</span>
              <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>KARTAVYA — Automating Care</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
