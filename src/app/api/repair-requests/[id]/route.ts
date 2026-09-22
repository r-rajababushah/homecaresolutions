import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Props) {
    const { id } = await params;
    const body = await request.json();

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("repair_requests")
        .update({
            status: body.status,
            estimated_cost: body.estimated_cost ?? null,
            notes: body.notes ?? null,
        })
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
        request: data,
    });
}