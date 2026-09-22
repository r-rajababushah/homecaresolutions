import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        title: "AC Repair",
        description: "Diagnosis and repair for common AC problems.",
        href: "/services/ac-repair",
    },
    {
        title: "Refrigerator Repair",
        description: "Repair for cooling and other refrigerator problems.",
        href: "/services/refrigerator-repair",
    },
    {
        title: "Washing Machine Repair",
        description: "Diagnosis and repair for washing machines.",
        href: "/services/washing-machine-repair",
    },
];

export default function ServicePreview() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="max-w-2xl">
                <p className="font-semibold text-[#0861D5]">OUR SERVICES</p>

                <h2 className="mt-2 text-3xl font-bold">
                    Appliance repair services
                </h2>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
                {services.map((service) => (
                    <Link
                        key={service.href}
                        href={service.href}
                        className="group rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <h3 className="text-xl font-semibold">{service.title}</h3>

                        <p className="mt-3 text-slate-600">
                            {service.description}
                        </p>

                        <span className="mt-6 flex items-center gap-2 font-medium text-[#0861D5]">
                            View Service
                            <ArrowRight
                                size={17}
                                className="transition group-hover:translate-x-1"
                            />
                        </span>
                    </Link>
                ))}
            </div>

            <div className="mt-8">
                <Link
                    href="/services"
                    className="font-semibold text-[#0861D5]"
                >
                    View all services →
                </Link>
            </div>
        </section>
    );
}