import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function Navbar() {
    return (
        <header className="border-b bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-xl font-bold text-[#0861D5]">
                    HomeCare Repair
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    <Link href="/services">Services</Link>
                    <Link href="/areas">Areas</Link>
                    <Link href="/about">About</Link>
                    <Link href="/gallery">Gallery</Link>
                    <Link href="/contact">Contact</Link>

                    <a
                        href="https://wa.me/YOUR_NUMBER"
                        className="flex items-center gap-2 rounded-lg bg-[#0861D5] px-4 py-2 text-white"
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>
                </nav>

                <button className="md:hidden">
                    Menu
                </button>
            </div>
        </header>
    );
}