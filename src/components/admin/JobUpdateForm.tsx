"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    jobId: string;
    currentStatus: string;
    currentCost: number | null;
    currentNotes: string | null;
};

const statuses = [
    "scheduled",
    "in_progress",
    "completed",
    "cancelled",
];

export default function JobUpdateForm({
    jobId,
    currentStatus,
    currentCost,
    currentNotes,
}: Props) {
    const router = useRouter();

    const [status, setStatus] = useState(currentStatus);
    const [cost, setCost] = useState(currentCost?.toString() || "");
    const [notes, setNotes] = useState(currentNotes || "");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setSaving(true);
        setMessage("");

        const response = await fetch(`/api/jobs/${jobId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status,
                final_cost: cost ? Number(cost) : null,
                notes: notes || null,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.error || "Failed to update job.");
            setSaving(false);
            return;
        }

        setMessage("Job updated.");
        setSaving(false);
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-xl border border-slate-200 bg-white p-6"
        >
            <h2 className="text-lg font-semibold">
                Update Job
            </h2>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                    Status
                </label>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                    {statuses.map((item) => (
                        <option key={item} value={item}>
                            {item.replace("_", " ").toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                    Final Cost (NPR)
                </label>

                <input
                    type="number"
                    min="0"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                    placeholder="e.g. 3500"
                />
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-medium">
                    Notes
                </label>

                <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                />
            </div>

            <button
                type="submit"
                disabled={saving}
                className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
                {saving ? "Saving..." : "Save Changes"}
            </button>

            {message && (
                <p className="mt-3 text-sm text-slate-600">
                    {message}
                </p>
            )}
        </form>
    );
}