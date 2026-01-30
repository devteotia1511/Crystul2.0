import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/home" className="relative">
      <span className="text-2xl font-bold text-white [text-shadow:-0.5px_-0.5px_0_#fff,0.5px_-0.5px_0_#fff,-0.5px_0.5px_0_#fff,0.5px_0.5px_0_#fff]">
        Crystul
      </span>
      <span className="absolute inset-0 text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        Crystul
      </span>
    </Link>
  );
}
