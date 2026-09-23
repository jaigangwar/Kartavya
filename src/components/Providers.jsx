'use client';

import { RegistrationProvider } from '@/context/RegistrationContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RegistrationProvider>{children}</RegistrationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
