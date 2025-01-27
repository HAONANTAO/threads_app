# 				***The Mock_Threads_APP***

# **Table Of Content**:

-- [**Description**](#**Description**)

-- [**Version**](#**Version**)

-- [**Prerequisites**](#**Prerequisites**)

-- [**Quick Start**](#**Quick_Start**)

-- [**Features**](#**Features**)

-- [**Core Functionality**](#**Core_Functionality**)

-- [**Advanced Features**](#**Advanced_Features**)

-- [**Project Architecture**](#**Project_Architecture**)

-- [**Tech Stack**](#**Tech_Stack**)

-- [**API Documentation**](#**API_Documentation**)

-- [**Demo**](#**Demo**)

--[**Snippet**]

-- [**Resources**](#**Resources**)

-- [**Roadmap**](#**Roadmap**)

-- [**Contact Information**](#**Contact_Information**)

-- [**License**](#**License**)

# **Description**

# **Version**：

# **Prerequisites**：

- 

# **Quick_Start**：

### **Clone the Repository**

- Open your terminal and navigate to the directory where you want to store the project. Then run the following Git command:

  ```
  git clone https://github.com/HAONANTAO/GameHub.git
  cd Mock_AI_ChatBot
  ```



### Install Dependencies

- For both the front-end and back-end, run `npm i` in the root project directory. This will install all the packages listed in the `dependencies` and `devDependencies` sections of the `package.json` files for both parts of the application.
- The back-end uses packages like `axios`, `bcrypt`, and `express` for handling HTTP requests, user authentication, and server setup respectively. The front-end depends on libraries such as `react`, `@mui/material` for building the user interface.

```
npm install
```



### Running the Code

- Start the Backend first then running the Frontend.

  ```
  npm run dev
  ```

  

# **Features**：

👉 **Authentication**: Authentication using Clerk for email, password, and social logins (Google and GitHub) with a comprehensive profile management system.

👉 **Visually Appealing Home Page**: A visually appealing home page showcasing the latest threads for an engaging user experience.

👉 **Create Thread Page**: A dedicated page for users to create threads, fostering community engagement

👉 **Commenting Feature**: A commenting feature to facilitate discussions within threads.

👉 **Nested Commenting**: Commenting system with nested threads, providing a structured conversation flow.

👉 **User Search with Pagination**: A user search feature with pagination for easy exploration and discovery of other users.

👉 **Activity Page**: Display notifications on the activity page when someone comments on a user's thread, enhancing user engagement.

👉 **Profile Page**: User profile pages for showcasing information and enabling modification of profile settings.

👉 **Create and Invite to Communities**: Allow users to create new communities and invite others using customizable template emails.

👉 **Community Member Management**: A user-friendly interface to manage community members, allowing role changes and removals.

👉 **Admin-Specific Community Threads**: Enable admins to create threads specifically for their community.

👉 **Community Search with Pagination**: A community search feature with pagination for exploring different communities.

👉 **Community Profiles**: Display community profiles showcasing threads and members for a comprehensive overview.

👉 **Figma Design Implementation**: Transform Figma designs into a fully functional application with pixel-perfect and responsive design.

👉 **Blazing-Fast Performance**: Optimal performance and instantaneous page switching for a seamless user experience.

👉 **Server Side Rendering**: Utilize Next.js with Server Side Rendering for enhanced performance and SEO benefits.

👉 **MongoDB with Complex Schemas**: Handle complex schemas and multiple data populations using MongoDB.

👉 **File Uploads with UploadThing**: File uploads using UploadThing for a seamless media sharing experience.

👉 **Real-Time Events Listening**: Real-time events listening with webhooks to keep users updated.

👉 **Middleware, API Actions, and Authorization**: Utilize middleware, API actions, and authorization for robust application security.

👉 **Next.js Layout Route Groups**: New Next.js layout route groups for efficient routing

👉 **Data Validation with Zod**: Data integrity with data validation using Zod

👉 **Form Management with React Hook Form**: Efficient management of forms with React Hook Form for a streamlined user input experience.

and many more, including code architecture and reusability

# **Core_Functionality**：



# **Advanced_Features**：


# **Project_Architecture**：



# **Tech_Stack**：

# **API_Documentation**：

### 



# **Snippets**：

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>clerk.route.ts</code></summary>


```typescript
/* eslint-disable camelcase */
// Resource: https://clerk.com/docs/users/sync-data-to-your-backend
// Above article shows why we need webhooks i.e., to sync data to our backend

// Resource: https://docs.svix.com/receiving/verifying-payloads/why
// It's a good practice to verify webhooks. Above article shows why we should do it
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

// Resource: https://clerk.com/docs/integration/webhooks#supported-events
// Above document lists the supported events
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
  const payload = await request.json();
  const header = headers();

  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };

  // Activitate Webhook in the Clerk Dashboard.
  // After adding the endpoint, you'll see the secret on the right side.
  const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

  let evnt: Event | null = null;

  try {
    evnt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const eventType: EventType = evnt?.type!;

  // Listen organization creation event
  if (eventType === "organization.created") {
    // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
    // Show what evnt?.data sends from above resource
    const { id, name, slug, logo_url, image_url, created_by } =
      evnt?.data ?? {};

    try {
      // @ts-ignore
      await createCommunity(
        // @ts-ignore
        id,
        name,
        slug,
        logo_url || image_url,
        "org bio",
        created_by
      );

      return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Listen organization invitation creation event.
  // Just to show. You can avoid this or tell people that we can create a new mongoose action and
  // add pending invites in the database.
  if (eventType === "organizationInvitation.created") {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations#operation/CreateOrganizationInvitation
      console.log("Invitation created", evnt?.data);

      return NextResponse.json(
        { message: "Invitation created" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Listen organization membership (member invite & accepted) creation
  if (eventType === "organizationMembership.created") {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/CreateOrganizationMembership
      // Show what evnt?.data sends from above resource
      const { organization, public_user_data } = evnt?.data;
      console.log("created", evnt?.data);

      // @ts-ignore
      await addMemberToCommunity(organization.id, public_user_data.user_id);

      return NextResponse.json(
        { message: "Invitation accepted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Listen member deletion event
  if (eventType === "organizationMembership.deleted") {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/DeleteOrganizationMembership
      // Show what evnt?.data sends from above resource
      const { organization, public_user_data } = evnt?.data;
      console.log("removed", evnt?.data);

      // @ts-ignore
      await removeUserFromCommunity(public_user_data.user_id, organization.id);

      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Listen organization updation event
  if (eventType === "organization.updated") {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/UpdateOrganization
      // Show what evnt?.data sends from above resource
      const { id, logo_url, name, slug } = evnt?.data;
      console.log("updated", evnt?.data);

      // @ts-ignore
      await updateCommunityInfo(id, name, slug, logo_url);

      return NextResponse.json({ message: "Member removed" }, { status: 201 });
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  // Listen organization deletion event
  if (eventType === "organization.deleted") {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/DeleteOrganization
      // Show what evnt?.data sends from above resource
      const { id } = evnt?.data;
      console.log("deleted", evnt?.data);

      // @ts-ignore
      await deleteCommunity(id);

      return NextResponse.json(
        { message: "Organization deleted" },
        { status: 201 }
      );
    } catch (err) {
      console.log(err);

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
};
```

</details>

# **Demo**：





# **Resources**：



## Short-Term (Next 1 - 2 Weeks)



# **Contact Information**：

Aaron(HAONAN) TAO

email:873190199@qq.com

github:https://github.com/HAONANTAO

linkin:https://www.linkedin.com/in/haonan-tao-aaron

# **License**：

This project is licensed under the MIT License, which is detailed as follows:

## MIT License Text

Permission is hereby freely granted to any individual or entity that obtains a copy of this software, along with its associated documentation files (collectively referred to as the "Software"). Recipients have unrestricted rights to engage with the Software. This includes, but is not limited to, the rights to use, duplicate, adapt, merge, publish, disseminate, sublicense, and even sell copies of the Software. Moreover, those who receive the Software are also permitted to carry out the same actions, subject to the conditions below.

It is mandatory that the above-mentioned copyright notice and this permission notice be incorporated into all copies, or any substantial segments, of the Software.

The Software is offered on an "as is" basis. There are no warranties of any kind, whether expressed or implied. This encompasses, but is not restricted to, warranties regarding merchantability, suitability for a specific purpose, and non-infringement. Under no circumstances shall the authors or copyright holders be held accountable for any claims, damages, or other liabilities. These could arise from actions related to contracts, torts, or other legal causes, and be directly or indirectly connected to the Software, or any activities performed using it.

By opting for the MIT license, our intention is to foster an open, collaborative development ecosystem. Developers are at liberty to fork the project, enhance it, and integrate it into their own undertakings, provided that they preserve the relevant copyright notices. This license is favored for its straightforwardness and permissive nature, which spurs a diverse array of contributions from the open-source community. Whether you're an independent coder eager to experiment with the code, or a large enterprise looking to build upon our groundwork, the MIT license endows you with the necessary freedom.

