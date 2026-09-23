'use client';

import { RegistrationProvider } from '@/context/RegistrationContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <RegistrationProvider>{children}</RegistrationProvider>
    </ThemeProvider>
  );
}
