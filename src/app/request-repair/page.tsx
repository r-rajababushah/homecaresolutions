import { createClient } from "@/lib/supabase/server";

export default async function RequestRepairPage() {
    const supabase = await createClient();

    const { data: services } = await supabase
        .from("services")
        .select("id, name")
        .eq("active", true)
        .order("name");

    return (
        <main className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="text-4xl font-bold text-slate-900">
                Request a Repair
            </h1>

            <p className="mt-3 text-slate-600">
                Tell us about your appliance problem. We will contact you to confirm
                the request.
            </p>

            <form
                className="mt-10 space-y-6"
                action="/api/repair-requests"
                method="POST"
                encType="multipart/form-data"
            >
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Name
                    </label>
                    <input
                        name="name"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder="Your name"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Phone
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder="98XXXXXXXX"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Service
                    </label>
                    <select
                        name="service_id"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    >
                        <option value="">Select a service</option>

                        {services?.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Brand
                        </label>
                        <input
                            name="brand"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                            placeholder="Samsung, LG, Haier..."
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Model
                        </label>
                        <input
                            name="model"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                            placeholder="Model number"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Problem
                    </label>
                    <textarea
                        name="problem"
                        required
                        rows={5}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder="Describe the problem..."
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Photos
                    </label>

                    <input
                        name="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    />

                    <p className="mt-2 text-sm text-slate-500">
                        You can upload photos of the appliance or problem.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Address
                    </label>
                    <textarea
                        name="address"
                        required
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder="Your address"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Area
                    </label>
                    <input
                        name="area"
                        required
                        className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        placeholder="e.g. Baneshwor"
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Preferred Date
                        </label>
                        <input
                            name="preferred_date"
                            type="date"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Preferred Time
                        </label>
                        <input
                            name="preferred_time"
                            type="time"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                    Submit Repair Request
                </button>
            </form>
        </main>
    );
}