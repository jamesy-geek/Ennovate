import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validation
    const { name, email, department, year, interests, motivation } = body;
    if (!name || !email || !department || !year || !interests?.length || motivation?.length < 40) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    // In a real build, we'd use Resend here. 
    // For now, we'll log it and simulate success.
    console.log("New Application Received:", body);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
