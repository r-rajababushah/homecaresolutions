import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-slate-50">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
                <div>
                    <h2 className="text-xl font-bold text-[#0861D5]">
                        HomeCare Repair
                    </h2>

                    <p className="mt-3 text-sm text-slate-600">
                        Appliance repair and service in Kathmandu.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold">Services</h3>

                    <div className="mt-3 space-y-2 text-sm">
                        <Link href="/services/ac-repair">AC Repair</Link>
                        <Link href="/services/refrigerator-repair">
                            Refrigerator Repair
                        </Link>
                        <Link href="/services/washing-machine-repair">
                            Washing Machine Repair
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Contact</h3>

                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                        <p>Kathmandu Valley</p>
                        <p>Phone: YOUR_NUMBER</p>
                        <p>WhatsApp available</p>
                    </div>
                </div>
            </div>

            <div className="border-t py-4 text-center text-sm text-slate-500">
                © 2026 HomeCare Repair. All rights reserved.
            </div>
        </footer>
    );
}