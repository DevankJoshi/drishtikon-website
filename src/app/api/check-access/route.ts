import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ hasAccess: false });
        }

        const { data, error } = await supabase
            .from("access_grants")
            .select("email")
            .eq("email", email.toLowerCase().trim())
            .maybeSingle();

        if (error) {
            console.error("Supabase query error:", error);
            return NextResponse.json({ hasAccess: false });
        }

        return NextResponse.json({ hasAccess: !!data });
    } catch (err) {
        console.error("Check access error:", err);
        return NextResponse.json({ hasAccess: false });
    }
}
