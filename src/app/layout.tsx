import './globals.css';
import { InitApp } from './init-app';
export const metadata = {
  title: 'Code-Example',
  description: 'Coding skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        id="layout-container"
        style={{ display: 'block', position: 'relative' }}
      >
        <InitApp>{children}</InitApp>
      </body>
    </html>
  );
}
