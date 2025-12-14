import Link from 'next/link';

export default function Logo() {
  return (
    <Link
      href="/home"
      className="block m-2 rounded-full overflow-hidden bg-background/80 border border-border hover:border-primary transition-colors duration-300"
    >
      <div className="w-full h-20 flex items-center justify-center">
        <img
          src="/crystul.png"
          alt="Crystul Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </Link>
  );
}
