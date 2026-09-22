const areas = [
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Baneshwor",
    "Koteshwor",
    "Chabahil",
    "Boudha",
    "Kalanki",
];

export default function ServiceAreas() {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-16">
                <p className="font-semibold text-[#0861D5]">SERVICE AREAS</p>

                <h2 className="mt-2 text-3xl font-bold">
                    Serving customers across Kathmandu Valley
                </h2>

                <div className="mt-8 flex flex-wrap gap-3">
                    {areas.map((area) => (
                        <span
                            key={area}
                            className="rounded-full border bg-white px-4 py-2 text-sm"
                        >
                            {area}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}