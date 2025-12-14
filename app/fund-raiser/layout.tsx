import { Metadata } from 'next';
import AuthenticatedLayout from '@/components/authenticated-layout';

export const metadata: Metadata = {
  title: 'Fund Raiser | Crystul',
  description: 'Discover and apply for various funding schemes and opportunities for your startup.',
};

export default function FundRaiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
