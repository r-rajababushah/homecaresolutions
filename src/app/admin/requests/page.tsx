import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function RequestsPage() {
    const supabase = await createClient();

    const { data: requests, error } = await supabase
        .from("repair_requests")
        .select(`
      id,
      status,
      problem,
      brand,
      model,
      preferred_date,
      preferred_time,
      estimated_cost,
      created_at,
      customers (
        name,
        phone,
        area
      ),
      services (
        name
      )
    `)
        .order("created_at", { ascending: false });

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
                Repair Requests
            </h1>

            <p className="mt-2 text-slate-600">
                Manage incoming customer requests.
            </p>

            <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
                {requests?.length ? (
                    <div className="divide-y divide-slate-200">
                        {requests.map((request) => {
                            const customer = Array.isArray(request.customers)
                                ? request.customers[0]
                                : request.customers;

                            const service = Array.isArray(request.services)
                                ? request.services[0]
                                : request.services;

                            return (
                                <Link
                                    key={request.id}
                                    href={`/admin/requests/${request.id}`}
                                    className="block p-5 hover:bg-slate-50"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h2 className="font-semibold text-slate-900">
                                                {customer?.name}
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {service?.name}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {request.problem}
                                            </p>

                                            <p className="mt-2 text-sm text-slate-500">
                                                {customer?.phone} · {customer?.area}
                                            </p>
                                        </div>

                                        <div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize">
                                                {request.status}
                                            </span>

                                            {request.preferred_date && (
                                                <p className="mt-2 text-sm text-slate-500">
                                                    {request.preferred_date}
                                                    {request.preferred_time &&
                                                        ` · ${request.preferred_time}`}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <p className="p-6 text-slate-500">
                        No repair requests yet.
                    </p>
                )}
            </div>
        </main>
    );
}