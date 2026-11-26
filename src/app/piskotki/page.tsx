import { LegalPage, legalMetadata } from "@/components/site/legal-page";
import { cookies } from "@/content/legal";

export const metadata = legalMetadata(cookies);

export default function Page() {
  return <LegalPage doc={cookies} />;
}
