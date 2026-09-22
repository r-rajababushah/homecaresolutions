import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    const [
        { count: totalRequests },
        { count: newRequests },
        { count: confirmedRequests },
        { count: completedJobs },
        { data: recentRequests },
    ] = await Promise.all([
        supabase
            .from("repair_requests")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("repair_requests")
            .select("*", { count: "exact", head: true })
            .eq("status", "new"),

        supabase
            .from("repair_requests")
            .select("*", { count: "exact", head: true })
            .eq("status", "confirmed"),

        supabase
            .from("jobs")
            .select("*", { count: "exact", head: true })
            .eq("status", "completed"),

        supabase
            .from("repair_requests")
            .select(`
        id,
        status,
        created_at,
        problem,
        customers (
          name,
          phone
        ),
        services (
          name
        )
      `)
            .order("created_at", { ascending: false })
            .limit(5),
    ]);

    const stats = [
        {
            label: "Total Requests",
            value: totalRequests ?? 0,
        },
        {
            label: "New Requests",
            value: newRequests ?? 0,
        },
        {
            label: "Confirmed",
            value: confirmedRequests ?? 0,
        },
        {
            label: "Completed Jobs",
            value: completedJobs ?? 0,
        },
    ];

    return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">
                    Dashboard
                </h1>

                <p className="mt-2 text-slate-600">
                    Overview of your repair business.
                </p>
            </div>

            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-slate-200 bg-white p-6"
                    >
                        <p className="text-sm text-slate-500">
                            {stat.label}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </section>

            <section className="mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Recent Requests
                    </h2>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    {recentRequests?.length ? (
                        <div className="divide-y divide-slate-200">
                            {recentRequests.map((request) => {
                                const customer = Array.isArray(request.customers)
                                    ? request.customers[0]
                                    : request.customers;

                                const service = Array.isArray(request.services)
                                    ? request.services[0]
                                    : request.services;

                                return (
                                    <div
                                        key={request.id}
                                        className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {customer?.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {service?.name}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {request.problem}
                                            </p>
                                        </div>

                                        <div className="text-left sm:text-right">
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize">
                                                {request.status}
                                            </span>

                                            <p className="mt-2 text-sm text-slate-500">
                                                {customer?.phone}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="p-6 text-slate-500">
                            No repair requests yet.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}