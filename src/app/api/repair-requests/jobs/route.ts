import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    const body = await request.json();

    const supabase = await createClient();

    if (!body.request_id || !body.scheduled_date) {
        return NextResponse.json(
            { error: "Request and scheduled date are required." },
            { status: 400 }
        );
    }

    const { data: existingJob } = await supabase
        .from("jobs")
        .select("id")
        .eq("request_id", body.request_id)
        .maybeSingle();

    if (existingJob) {
        return NextResponse.json(
            { error: "A job already exists for this request." },
            { status: 400 }
        );
    }

    const { data: job, error } = await supabase
        .from("jobs")
        .insert({
            request_id: body.request_id,
            scheduled_date: body.scheduled_date,
            scheduled_time: body.scheduled_time || null,
            status: "scheduled",
            notes: body.notes || null,
        })
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
        job,
    });
}