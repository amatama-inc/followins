import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | Followins",
  description: "Kebijakan privasi Followins. Kami memprioritaskan keamanan data Anda dengan sistem 100% Client-Side.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
