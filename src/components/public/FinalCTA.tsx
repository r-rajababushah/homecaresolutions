import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export default function FinalCTA() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="rounded-3xl bg-[#0861D5] px-6 py-12 text-center text-white md:px-12">
                <h2 className="text-3xl font-bold md:text-4xl">
                    Need appliance repair?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-blue-100">
                    Contact us with your appliance problem, and we&apos;ll discuss the
                    next steps.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="tel:YOUR_NUMBER"
                        className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-[#0861D5]"
                    >
                        <Phone size={18} />
                        Call Now
                    </a>

                    <a
                        href="https://wa.me/YOUR_NUMBER"
                        className="flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-semibold"
                    >
                        <MessageCircle size={18} />
                        WhatsApp
                    </a>

                    <Link
                        href="/request-repair"
                        className="rounded-lg border border-white/30 px-5 py-3 font-semibold"
                    >
                        Request Repair
                    </Link>
                </div>
            </div>
        </section>
    );
}