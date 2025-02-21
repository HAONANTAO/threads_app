import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo,
} from "@/lib/actions/community.actions";

type EventType =
  | "organization.created"
  | "organizationInvitation.created"
  | "organizationMembership.created"
  | "organizationMembership.deleted"
  | "organization.updated"
  | "organization.deleted";

type Event = {
  data: Record<string, any>;
  object: "event";
  type: EventType;
};

export const POST = async (request: Request) => {
  try {
    const payload = await request.json();
    const header = headers();

    const heads = {
      "svix-id": header.get("svix-id"),
      "svix-timestamp": header.get("svix-timestamp"),
      "svix-signature": header.get("svix-signature"),
    };

    if (!process.env.NEXT_CLERK_WEBHOOK_SECRET) {
      console.error("Missing Webhook Secret");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 },
      );
    }

    console.log("Webhook Secret:", process.env.NEXT_CLERK_WEBHOOK_SECRET);
    console.log("Received Headers:", heads);
    console.log("Received Payload:", JSON.stringify(payload, null, 2));

    const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET);
    let evnt: Event;

    try {
      evnt = wh.verify(
        JSON.stringify(payload),
        heads as IncomingHttpHeaders & WebhookRequiredHeaders,
      ) as Event;
    } catch (err) {
      console.error("Webhook verification failed:", err);
      return NextResponse.json(
        { message: "Webhook verification failed", error: String(err) },
        { status: 400 },
      );
    }

    if (!evnt?.data) {
      console.error("Event data is missing:", evnt);
      return NextResponse.json(
        { message: "Event data missing" },
        { status: 400 },
      );
    }

    console.log("Received event:", evnt.type, evnt.data);

    if (evnt.type === "organizationMembership.created") {
      try {
        const organization = evnt?.data?.organization;
        const user = evnt?.data?.public_user_data;

        if (!organization?.id || !user?.user_id) {
          console.error("Invalid organization or user data:", evnt.data);
          return NextResponse.json(
            { message: "Invalid data structure" },
            { status: 400 },
          );
        }

        console.log(
          `Adding member ${user.user_id} to community ${organization.id}`,
        );
        await addMemberToCommunity(organization.id, user.user_id);
        return NextResponse.json({ message: "Member added" }, { status: 201 });
      } catch (err) {
        console.error("Error adding member:", err.message);
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(err) },
      { status: 500 },
    );
  }
};
