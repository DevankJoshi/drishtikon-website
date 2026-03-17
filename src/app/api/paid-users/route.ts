import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
    try {
        // Check for authorization header (optional - you can add a secret key for security)
        const authHeader = req.headers.get("authorization");
        const secretKey = process.env.ADMIN_SECRET_KEY;

        // If you want to protect this endpoint, uncomment below:
        // if (!secretKey || authHeader !== `Bearer ${secretKey}`) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        // Get all paid users from access_grants table
        const { data: paidUsers, error } = await supabase
            .from("access_grants")
            .select("email, created_at")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase query error:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        const totalCount = paidUsers?.length || 0;

        return NextResponse.json({
            success: true,
            totalPaidUsers: totalCount,
            paidEmails: paidUsers?.map((user) => ({
                email: user.email,
                paidAt: user.created_at,
            })) || [],
            message: `${totalCount} user(s) have purchased access to DRISHTIKON EP`,
        });
    } catch (err) {
        console.error("Get paid users error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
