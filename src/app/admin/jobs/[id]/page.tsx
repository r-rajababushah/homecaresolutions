import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import JobUpdateForm from "@/components/admin/JobUpdateForm";

type Props = {
    params: Promise<{ id: string }>;
};

type Payment = {
    id: string;
    amount: number;
    method: string;
    status: string;
};

export default async function JobDetailPage({ params }: Props) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: job } = await supabase
        .from("jobs")
        .select(`
      *,
      repair_requests (
        problem,
        brand,
        model,
        customers (
          name,
          phone,
          address,
          area
        ),
        services (
          name
        )
      ),
      payments (
        id,
        amount,
        method,
        status,
        paid_at
      )
    `)
        .eq("id", id)
        .single();

    if (!job) {
        notFound();
    }

    const request = Array.isArray(job.repair_requests)
        ? job.repair_requests[0]
        : job.repair_requests;

    const customer = Array.isArray(request?.customers)
        ? request.customers[0]
        : request?.customers;

    const service = Array.isArray(request?.services)
        ? request.services[0]
        : request?.services;

    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <Link
                href="/admin/jobs"
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back to Jobs
            </Link>

            <div className="mt-6">
                <h1 className="text-3xl font-bold text-slate-900">
                    Job Details
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Job ID: {job.id}
                </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                <section className="rounded-xl border border-slate-200 bg-white p-6">
                    <h2 className="text-lg font-semibold">
                        Customer
                    </h2>

                    <div className="mt-4 space-y-2 text-sm">
                        <p>
                            <strong>Name:</strong> {customer?.name}
                        </p>

                        <p>
                            <strong>Phone:</strong> {customer?.phone}
                        </p>

                        <p>
                            <strong>Area:</strong> {customer?.area}
                        </p>

                        <p>
                            <strong>Address:</strong> {customer?.address}
                        </p>
                    </div>
                </section>

                <section className="rounded-xl border border-slate-200 bg-white p-6">
                    <h2 className="text-lg font-semibold">
                        Repair
                    </h2>

                    <div className="mt-4 space-y-2 text-sm">
                        <p>
                            <strong>Service:</strong> {service?.name}
                        </p>

                        <p>
                            <strong>Brand:</strong> {request?.brand || "Not provided"}
                        </p>

                        <p>
                            <strong>Model:</strong> {request?.model || "Not provided"}
                        </p>

                        <p>
                            <strong>Problem:</strong> {request?.problem}
                        </p>
                    </div>
                </section>
            </div>

            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold">
                    Schedule
                </h2>

                <div className="mt-4 space-y-2 text-sm">
                    <p>
                        <strong>Date:</strong> {job.scheduled_date}
                    </p>

                    <p>
                        <strong>Time:</strong>{" "}
                        {job.scheduled_time || "Not specified"}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="capitalize">
                            {job.status.replace("_", " ")}
                        </span>
                    </p>
                </div>
            </section>

            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold">
                    Payment
                </h2>

                {job.payments?.length ? (
                    <div className="mt-4 space-y-3">
                        {job.payments.map((payment: Payment) => (
                            <div
                                key={payment.id}
                                className="rounded-lg bg-slate-50 p-4 text-sm"
                            >
                                <p>
                                    <strong>Amount:</strong> NPR {payment.amount}
                                </p>

                                <p>
                                    <strong>Method:</strong>{" "}
                                    {payment.method.replace("_", " ")}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {payment.status}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-3 text-sm text-slate-500">
                        No payments recorded.
                    </p>
                )}
            </section>
            <JobUpdateForm
                jobId={job.id}
                currentStatus={job.status}
                currentCost={job.final_cost}
                currentNotes={job.notes}
            />
        </main>
    );
}