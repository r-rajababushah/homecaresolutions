const reasons = [
    {
        title: "Doorstep Service",
        description: "We visit customers at their location.",
    },
    {
        title: "Multiple Appliances",
        description: "Repair support for common home appliances.",
    },
    {
        title: "Direct Communication",
        description: "Contact us directly by phone or WhatsApp.",
    },
    {
        title: "Clear Communication",
        description: "Discuss the problem and expected repair cost before work.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-16">
                <p className="font-semibold text-[#0861D5]">WHY US</p>

                <h2 className="mt-2 text-3xl font-bold">
                    Simple, convenient repair service
                </h2>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {reasons.map((reason) => (
                        <div key={reason.title} className="rounded-xl bg-white p-6">
                            <h3 className="font-semibold">{reason.title}</h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}