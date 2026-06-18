import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Clerk webhook handler for user events
 * Handles user.created event to initialize credits for new users
 * 
 * Setup in Clerk Dashboard:
 * 1. Go to Webhooks in your Clerk dashboard
 * 2. Add endpoint: https://your-domain.com/api/webhooks/clerk
 * 3. Subscribe to: user.created
 * 4. Copy the signing secret and add to .env.local as CLERK_WEBHOOK_SECRET
 */
export async function POST(req: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log("=================================================");
  console.log(`[${timestamp}] [Clerk Webhook] 🎯 Webhook endpoint called`);
  console.log("=================================================");
  
  try {
    // Get the webhook secret from environment
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    console.log(`[${timestamp}] [Clerk Webhook] 🔑 Webhook secret configured:`, !!webhookSecret);

    if (!webhookSecret) {
      console.error(`[${timestamp}] [Clerk Webhook] ❌ CLERK_WEBHOOK_SECRET is NOT configured in environment variables`);
      console.error(`[${timestamp}] [Clerk Webhook] ❌ Available env vars:`, Object.keys(process.env).filter(k => k.includes('CLERK') || k.includes('WEBHOOK')));
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Get the headers and body
    const headerPayload = req.headers;
    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    console.log(`[${timestamp}] [Clerk Webhook] 📋 Svix headers present:`);
    console.log(`[${timestamp}]   - svix-id: ${svixId ? '✅ Present' : '❌ Missing'}`);
    console.log(`[${timestamp}]   - svix-timestamp: ${svixTimestamp ? '✅ Present' : '❌ Missing'}`);
    console.log(`[${timestamp}]   - svix-signature: ${svixSignature ? '✅ Present' : '❌ Missing'}`);

    // Get the raw body as a Buffer to preserve exact bytes for signature verification
    console.log(`[${timestamp}] [Clerk Webhook] 📦 Reading request body...`);
    const rawBody = await req.arrayBuffer();
    const body = Buffer.from(rawBody).toString("utf8");
    
    console.log(`[${timestamp}] [Clerk Webhook] 📦 Raw body size: ${body.length} bytes`);
    console.log(`[${timestamp}] [Clerk Webhook] 📦 Raw body preview:`, body.substring(0, 200));

    // Parse and verify the payload
    let payload: WebhookEvent;

    if (svixId && svixTimestamp && svixSignature) {
      console.log(`[${timestamp}] [Clerk Webhook] 🔐 All Svix headers present, verifying signature...`);
      try {
        const wh = new Webhook(webhookSecret);
        payload = wh.verify(body, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        }) as WebhookEvent;
        console.log(`[${timestamp}] [Clerk Webhook] ✅ Signature verified successfully!`);
      } catch (signatureErr) {
        console.error(`[${timestamp}] [Clerk Webhook] ❌ Signature verification failed:`, signatureErr instanceof Error ? signatureErr.message : signatureErr);
        return NextResponse.json(
          { error: "Invalid webhook signature", details: signatureErr instanceof Error ? signatureErr.message : "Unknown error" },
          { status: 400 }
        );
      }
    } else {
      // Parse without verification (development only)
      console.warn(`[${timestamp}] [Clerk Webhook] ⚠️ Missing Svix headers, parsing without verification (DEV MODE ONLY)`);
      try {
        payload = JSON.parse(body) as WebhookEvent;
        console.log(`[${timestamp}] [Clerk Webhook] ✅ Body parsed successfully (unverified)`);
      } catch (parseErr) {
        console.error(`[${timestamp}] [Clerk Webhook] ❌ Failed to parse body as JSON:`, parseErr instanceof Error ? parseErr.message : parseErr);
        return NextResponse.json(
          { error: "Invalid JSON body", details: parseErr instanceof Error ? parseErr.message : "Unknown error" },
          { status: 400 }
        );
      }
    }
    
    // Log the webhook event
    console.log(`[${timestamp}] [Clerk Webhook] 📨 Event type received: "${payload.type}"`);
    console.log(`[${timestamp}] [Clerk Webhook] 📨 Full payload:`, JSON.stringify(payload, null, 2));

    // Handle user.created event
    if (payload.type === "user.created") {
      console.log(`[${timestamp}] [Clerk Webhook] ✅ Event type matched: user.created`);
      
      const userId = payload.data?.id;
      console.log(`[${timestamp}] [Clerk Webhook] 👤 User ID: ${userId}`);

      if (!userId) {
        console.error(`[${timestamp}] [Clerk Webhook] ❌ No user ID found in payload.data`);
        console.error(`[${timestamp}] [Clerk Webhook] ❌ Full data object:`, JSON.stringify(payload.data, null, 2));
        return NextResponse.json(
          { error: "Invalid payload - missing user ID" },
          { status: 400 }
        );
      }

      // Check if user balance already exists (prevent duplicate credits)
      console.log(`[${timestamp}] [Clerk Webhook] 🔍 Checking if user balance already exists in database...`);
      try {
        const existingBalance = await prisma.userBalance.findUnique({
          where: { userId },
        });

        if (existingBalance) {
          console.log(`[${timestamp}] [Clerk Webhook] ⚠️ User ${userId} already has balance: ${existingBalance.credits} credits`);
          console.log(`[${timestamp}] [Clerk Webhook] ⚠️ Skipping initialization to prevent duplicate credits`);
          return NextResponse.json({
            success: true,
            message: "User balance already exists (duplicate webhook prevented)",
            credits: existingBalance.credits,
            userId: userId,
          });
        }
        console.log(`[${timestamp}] [Clerk Webhook] ✅ No existing balance found, proceeding with initialization`);
      } catch (dbErr) {
        console.error(`[${timestamp}] [Clerk Webhook] ❌ Database error checking user balance:`, dbErr instanceof Error ? dbErr.message : dbErr);
        throw dbErr;
      }

      // Create initial balance of 100 credits
      console.log(`[${timestamp}] [Clerk Webhook] 💰 Creating new UserBalance record with 100 credits for user: ${userId}`);
      try {
        const userBalance = await prisma.userBalance.create({
          data: {
            userId,
            credits: 100,
          },
        });

        console.log(`[${timestamp}] [Clerk Webhook] ✅ SUCCESS! UserBalance created:`);
        console.log(`[${timestamp}]   - User ID: ${userBalance.userId}`);
        console.log(`[${timestamp}]   - Credits: ${userBalance.credits}`);
        console.log(`[${timestamp}] [Clerk Webhook] 💾 Database record:`, JSON.stringify(userBalance, null, 2));

        return NextResponse.json({
          success: true,
          message: "User balance initialized successfully",
          credits: userBalance.credits,
          userId: userId,
        }, { status: 200 });
      } catch (createErr) {
        console.error(`[${timestamp}] [Clerk Webhook] ❌ Database error creating user balance:`, createErr instanceof Error ? createErr.message : createErr);
        console.error(`[${timestamp}] [Clerk Webhook] ❌ Error details:`, createErr);
        throw createErr;
      }
    } else {
      // For other event types, just acknowledge receipt
      console.log(`[${timestamp}] [Clerk Webhook] ℹ️ Event type '${payload.type}' is not handled (only 'user.created' is processed)`);
      console.log(`[${timestamp}] [Clerk Webhook] ℹ️ Acknowledging receipt of ${payload.type} event`);
      return NextResponse.json({ 
        success: true, 
        message: `Event '${payload.type}' received but not processed` 
      }, { status: 200 });
    }
  } catch (error) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [Clerk Webhook] ❌❌❌ ERROR processing webhook`);
    console.error(`[${timestamp}] [Clerk Webhook] Error type:`, error?.constructor?.name);
    console.error(`[${timestamp}] [Clerk Webhook] Error message:`, error instanceof Error ? error.message : String(error));
    console.error(`[${timestamp}] [Clerk Webhook] Error details:`, error);
    if (error instanceof Error) {
      console.error(`[${timestamp}] [Clerk Webhook] Stack trace:`, error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Webhook processing failed", 
        details: error instanceof Error ? error.message : String(error),
        type: error?.constructor?.name
      },
      { status: 500 }
    );
  }
}
