import type { MetadataRoute } from "next";
import { urlDoSite } from "@/dados/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", urlDoSite).toString(),
  };
}
