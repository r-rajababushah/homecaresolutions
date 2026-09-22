"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    requestId: string;
};

export default function CreateJobForm({ requestId }: Props) {
    const router = useRouter();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        const response = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                request_id: requestId,
                scheduled_date: date,
                scheduled_time: time || null,
                notes: notes || null,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error || "Failed to create job.");
            setLoading(false);
            return;
        }

        router.push(`/admin/jobs/${data.job.id}`);
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-slate-200 bg-white p-6"
        >
            <h2 className="text-lg font-semibold">
                Create Job
            </h2>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                    Scheduled Date
                </label>

                <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                    Scheduled Time
                </label>

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                    Notes
                </label>

                <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="Technician notes..."
                />
            </div>

            {error && (
                <p className="mt-4 text-sm text-red-600">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create Job"}
            </button>
        </form>
    );
}