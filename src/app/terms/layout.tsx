import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | Followins",
  description: "Syarat dan Ketentuan penggunaan Followins. Silakan baca aturan penggunaan layanan kami.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
