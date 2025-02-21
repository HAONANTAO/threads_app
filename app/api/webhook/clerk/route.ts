import { Webhook, WebhookRequiredHeaders } from "svix";
import { NextResponse } from "next/server";
import { IncomingHttpHeaders } from "http";
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
  data: Record<string, string | number | Record<string, string>[]>;
  object: "event";
  type: EventType;
};

export const POST = async (request: Request) => {
  try {
    const payload = await request.json();
    const header = request.headers;

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

    const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET);
    const evnt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as Event;

    if (!evnt) {
      return NextResponse.json({ message: "Invalid event" }, { status: 400 });
    }

    const eventType: EventType = evnt.type;
    console.log("Received event:", eventType, evnt.data);

    switch (eventType) {
      case "organization.created": {
        const { id, name, slug, logo_url, image_url, created_by } =
          evnt.data as {
            id: string;
            name: string;
            slug: string;
            logo_url?: string;
            image_url?: string;
            created_by: string;
          };

        await createCommunity(
          id,
          name,
          slug,
          logo_url ?? image_url ?? "",
          "org bio",
          created_by,
        );
        return NextResponse.json(
          { message: "Organization created" },
          { status: 201 },
        );
      }

      case "organizationMembership.created": {
        const { organization, public_user_data } = evnt.data as {
          organization: { id: string };
          public_user_data: { user_id: string };
        };

        await addMemberToCommunity(organization.id, public_user_data.user_id);
        return NextResponse.json({ message: "Member added" }, { status: 201 });
      }

      case "organizationMembership.deleted": {
        const { organization, public_user_data } = evnt.data as {
          organization: { id: string };
          public_user_data: { user_id: string };
        };

        await removeUserFromCommunity(
          public_user_data.user_id,
          organization.id,
        );
        return NextResponse.json(
          { message: "Member removed" },
          { status: 201 },
        );
      }

      case "organization.deleted": {
        const { id } = evnt.data as { id: string };
        await deleteCommunity(id);
        return NextResponse.json(
          { message: "Organization deleted" },
          { status: 201 },
        );
      }

      default:
        console.warn("Unhandled event type:", eventType);
        return NextResponse.json({ message: "Event ignored" }, { status: 200 });
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(err) },
      { status: 500 },
    );
  }
};
