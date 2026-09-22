import ServiceCard from "@/components/public/ServiceCard";
import { createClient } from "@/lib/supabase/server";

export default async function ServicesPage() {
    const supabase = await createClient();

    const { data: services, error } = await supabase
        .from("services")
        .select("name, slug, description")
        .eq("active", true)
        .order("name");

    if (error) {
        throw new Error("Failed to load services");
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-16">
            <div className="max-w-2xl">
                <p className="font-semibold text-[#0861D5]">OUR SERVICES</p>

                <h1 className="mt-2 text-4xl font-bold">
                    Appliance Repair Services
                </h1>

                <p className="mt-4 text-slate-600">
                    Repair and servicing for common home appliances in Kathmandu
                    Valley.
                </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services?.map((service) => (
                    <ServiceCard
                        key={service.slug}
                        service={service}
                    />
                ))}
            </div>
        </main>
    );
}