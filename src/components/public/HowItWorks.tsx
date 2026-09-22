const steps = [
    ["01", "Contact Us", "Call or message us about your appliance problem."],
    ["02", "Share Details", "Send the appliance information, photos and location."],
    ["03", "Schedule", "Agree on a suitable date and time for the visit."],
    ["04", "Repair", "The technician visits and completes the repair."],
];

export default function HowItWorks() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <p className="font-semibold text-[#0861D5]">HOW IT WORKS</p>

            <h2 className="mt-2 text-3xl font-bold">
                From problem to repair
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-4">
                {steps.map(([number, title, description]) => (
                    <div key={number}>
                        <span className="text-sm font-bold text-[#0861D5]">
                            {number}
                        </span>

                        <h3 className="mt-3 font-semibold">{title}</h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}