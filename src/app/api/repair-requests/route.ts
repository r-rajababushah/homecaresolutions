import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const serviceId = formData.get("service_id")?.toString();
    const brand = formData.get("brand")?.toString().trim() || null;
    const model = formData.get("model")?.toString().trim() || null;
    const problem = formData.get("problem")?.toString().trim();
    const address = formData.get("address")?.toString().trim();
    const area = formData.get("area")?.toString().trim();
    const preferredDate =
        formData.get("preferred_date")?.toString() || null;
    const preferredTime =
        formData.get("preferred_time")?.toString() || null;

    if (
        !name ||
        !phone ||
        !serviceId ||
        !problem ||
        !address ||
        !area
    ) {
        return NextResponse.json(
            { error: "Please fill in all required fields." },
            { status: 400 }
        );
    }

    const supabase = await createClient();

    const { data: customer, error: customerError } = await supabase
        .from("customers")
        .insert({
            name,
            phone,
            address,
            area,
        })
        .select("id")
        .single();

    if (customerError) {
        return NextResponse.json(
            { error: customerError.message },
            { status: 500 }
        );
    }

    const { data: repairRequest, error: requestError } = await supabase
        .from("repair_requests")
        .insert({
            customer_id: customer.id,
            service_id: serviceId,
            brand,
            model,
            problem,
            preferred_date: preferredDate,
            preferred_time: preferredTime,
        })
        .select("id")
        .single();

    if (requestError) {
        return NextResponse.json(
            { error: requestError.message },
            { status: 500 }
        );
    }

    // Upload photos
    const photos = formData.getAll("photos") as File[];

    for (const photo of photos) {
        if (!photo.size) continue;

        const fileExtension = photo.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${repairRequest.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from("repair-photos")
            .upload(filePath, photo);

        if (uploadError) {
            console.error("Photo upload failed:", uploadError);
            continue;
        }

        await supabase.from("job_photos").insert({
            request_id: repairRequest.id,
            storage_path: filePath,
        });
    }

    return NextResponse.json({
        success: true,
        requestId: repairRequest.id,
    });
}