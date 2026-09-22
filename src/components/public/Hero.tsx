import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export default function Hero() {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
                <div>
                    <p className="mb-3 font-semibold text-[#0861D5]">
                        KATHMANDU APPLIANCE REPAIR
                    </p>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                        AC, Refrigerator & Washing Machine Repair
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                        Reliable appliance repair and servicing at your doorstep in
                        Kathmandu Valley.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="tel:YOUR_NUMBER"
                            className="flex items-center gap-2 rounded-lg bg-[#0861D5] px-5 py-3 font-semibold text-white"
                        >
                            <Phone size={18} />
                            Call Now
                        </a>

                        <a
                            href="https://wa.me/YOUR_NUMBER"
                            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>

                        <Link
                            href="/request-repair"
                            className="rounded-lg border border-slate-300 px-5 py-3 font-semibold"
                        >
                            Request Repair
                        </Link>
                    </div>
                </div>

                <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-slate-200">
                    <span className="text-slate-500">
                        Business / Technician Image
                    </span>
                </div>
            </div>
        </section>
    );
}