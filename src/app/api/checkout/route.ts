import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-expect-error - ignore stripe version mismatch
    apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, email } = body;

        // Validate the amount (min ₹15)
        if (!amount || amount < 15) {
            return NextResponse.json(
                { error: "Invalid amount. Minimum is ₹15." },
                { status: 400 }
            );
        }

        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "A valid email is required." },
                { status: 400 }
            );
        }

        // Convert amount to the smallest currency unit (paise for INR)
        const unitAmount = Math.round(amount * 100);
        const origin = req.headers.get("origin");

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "DRISHTIKON EP — Early Access",
                            description: "Lifetime streaming access to the full DRISHTIKON EP.",
                            images: [
                                "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=800&auto=format&fit=crop",
                            ],
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/?success=true&email=${encodeURIComponent(email)}`,
            cancel_url: `${origin}/?canceled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("Stripe Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}
