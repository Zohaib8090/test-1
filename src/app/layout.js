import './globals.css';
import NavigationWrapper from '@/components/NavigationWrapper';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  title: 'SkillBridge | Student Service Exchange',
  description: 'A platform for students to offer and find reliable help on campus.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <NavigationWrapper>
            {children}
          </NavigationWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
