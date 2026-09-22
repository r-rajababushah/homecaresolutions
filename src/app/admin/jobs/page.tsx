import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function JobsPage() {
    const supabase = await createClient();

    const { data: jobs, error } = await supabase
        .from("jobs")
        .select(`
      id,
      status,
      scheduled_date,
      scheduled_time,
      final_cost,
      customers:request_id (
        customers (
          name,
          phone
        ),
        services (
          name
        )
      )
    `)
        .order("scheduled_date", { ascending: true });

    if (error) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-10">
                <p className="text-red-600">{error.message}</p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <h1 className="text-3xl font-bold text-slate-900">
                Jobs
            </h1>

            <p className="mt-2 text-slate-600">
                Scheduled and completed repair jobs.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
                {jobs?.length ? (
                    <div className="divide-y divide-slate-200">
                        {jobs.map((job) => {
                            const request = Array.isArray(job.customers)
                                ? job.customers[0]
                                : job.customers;

                            const customer = Array.isArray(request?.customers)
                                ? request.customers[0]
                                : request?.customers;
                            const service = Array.isArray(request?.services)
                                ? request.services[0]
                                : request?.services;

                            return (
                                <Link
                                    key={job.id}
                                    href={`/admin/jobs/${job.id}`}
                                    className="block p-5 hover:bg-slate-50"
                                >
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h2 className="font-semibold">
                                                {customer?.name}
                                            </h2>

                                            <p className="text-sm text-slate-600">
                                                {service?.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {customer?.phone}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize">
                                                {job.status.replace("_", " ")}
                                            </span>

                                            <p className="mt-2 text-sm text-slate-500">
                                                {job.scheduled_date}
                                                {job.scheduled_time &&
                                                    ` · ${job.scheduled_time}`}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p className="p-6 text-slate-500">
                        No jobs yet.
                    </p>
                )}
            </div>
        </main>
    );
}