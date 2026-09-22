import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: service } = await supabase
        .from("services")
        .select("name, description")
        .eq("slug", slug)
        .eq("active", true)
        .single();

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: `${service.name} | HomeCare Solutions`,
        description: service.description,
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: service } = await supabase
        .from("services")
        .select("*")
        .eq("slug", slug)
        .eq("active", true)
        .single();

    if (!service) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <div className="max-w-3xl">
                <p className="mb-3 text-sm font-medium text-blue-600">
                    HomeCare Solutions
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    {service.name}
                </h1>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                    {service.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                        href="/request-repair"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Request Repair
                    </Link>

                    <a
                        href="https://wa.me/YOUR_NUMBER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
                    >
                        WhatsApp Us
                    </a>
                </div>
            </div>

            <section className="mt-16 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-900">Describe the problem</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Tell us what is happening with your appliance.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-900">Share your location</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Provide your area and address so the technician can reach you.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-900">Get confirmation</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        We will contact you to discuss the request and schedule the visit.
                    </p>
                </div>
            </section>
        </main>
    );
}