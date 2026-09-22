export default function RecentWork() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <p className="font-semibold text-[#0861D5]">RECENT WORK</p>

            <h2 className="mt-2 text-3xl font-bold">
                Recent repair work
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="aspect-[4/3] rounded-2xl bg-slate-200"
                    />
                ))}
            </div>
        </section>
    );
}