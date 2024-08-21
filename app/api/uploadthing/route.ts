import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

//import { utapi } from "@/lib/uploadthing";
import { UTApi } from "uploadthing/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    const newUrl = data.url.substring(data.url.lastIndexOf("/") + 1);
    const utapi = new UTApi();
    await utapi.deleteFiles(newUrl);

    return Response.json({ success: true });
  }
  catch {
    return Response.json({ success: false });
  }
}
