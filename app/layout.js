import './globals.css';

export const metadata = {
  title: 'Koperasi MPA',
  description: 'Created by Coz',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
