import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RequestUpdateForm from "@/components/admin/RequestUpdateForm";
import CreateJobForm from "@/components/admin/CreateJobForm";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function RequestDetailPage({ params }: Props) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: request } = await supabase
        .from("repair_requests")
        .select(`
      *,
      customers (
        name,
        phone,
        address,
        area
      ),
      services (
        name
      ),
      job_photos (
        id,
        storage_path,
        created_at
      )
    `)
        .eq("id", id)
        .single();

    if (!request) {
        notFound();
    }

    const customer = Array.isArray(request.customers)
        ? request.customers[0]
        : request.customers;

    const service = Array.isArray(request.services)
        ? request.services[0]
        : request.services;

    return (
        <main className="mx-auto max-w-5xl px-4 py-10">
            <Link
                href="/admin/requests"
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back to Requests
            </Link>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Repair Request
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Request ID: {request.id}
                    </p>
                </div>

                <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-medium capitalize">
                    {request.status}
                </span>
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
                        Repair Details
                    </h2>

                    <div className="mt-4 space-y-2 text-sm">
                        <p>
                            <strong>Service:</strong> {service?.name}
                        </p>

                        <p>
                            <strong>Brand:</strong> {request.brand || "Not provided"}
                        </p>

                        <p>
                            <strong>Model:</strong> {request.model || "Not provided"}
                        </p>

                        <p>
                            <strong>Problem:</strong> {request.problem}
                        </p>

                        <p>
                            <strong>Preferred date:</strong>{" "}
                            {request.preferred_date || "Not specified"}
                        </p>

                        <p>
                            <strong>Preferred time:</strong>{" "}
                            {request.preferred_time || "Not specified"}
                        </p>

                        <p>
                            <strong>Estimated cost:</strong>{" "}
                            {request.estimated_cost
                                ? `NPR ${request.estimated_cost}`
                                : "Not estimated"}
                        </p>
                    </div>
                </section>

            </div>

            <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold">
                    Photos
                </h2>

                {request.job_photos?.length ? (
                    <div className="mt-4 space-y-2">
                        {request.job_photos.map(
                            (photo: {
                                id: string;
                                storage_path: string;
                            }) => (
                                <p
                                    key={photo.id}
                                    className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600"
                                >
                                    {photo.storage_path}
                                </p>
                            ),
                        )}
                    </div>
                ) : (
                    <p className="mt-3 text-sm text-slate-500">
                        No photos uploaded.
                    </p>
                )}
            </section>
            <RequestUpdateForm
                requestId={request.id}
                currentStatus={request.status}
                currentCost={request.estimated_cost}
                currentNotes={request.notes}
            />
            {request.status === "confirmed" && (
                <div className="mt-6">
                    <CreateJobForm requestId={request.id} />
                </div>
            )}
        </main>
    );
}