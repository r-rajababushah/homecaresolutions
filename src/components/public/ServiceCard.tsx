import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Service = {
    name: string;
    slug: string;
    description: string | null;
};

export default function ServiceCard({ service }: { service: Service }) {
    return (
        <Link
            href={`/services/${service.slug}`}
            className="group rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-md"
        >
            <h2 className="text-xl font-semibold">{service.name}</h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
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
    );
}