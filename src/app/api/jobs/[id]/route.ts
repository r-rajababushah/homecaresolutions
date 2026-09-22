import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
    const { id } = await params;
    const body = await request.json();

    const supabase = await createClient();

    const updates: Record<string, unknown> = {};

    if (body.status !== undefined) {
        updates.status = body.status;
    }

    if (body.scheduled_date !== undefined) {
        updates.scheduled_date = body.scheduled_date;
    }

    if (body.scheduled_time !== undefined) {
        updates.scheduled_time = body.scheduled_time || null;
    }

    if (body.final_cost !== undefined) {
        updates.final_cost = body.final_cost || null;
    }

    if (body.notes !== undefined) {
        updates.notes = body.notes || null;
    }

    if (body.status === "completed") {
        updates.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
        .from("jobs")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        job: data,
    });
}