import { getLicenseFileText } from "generate-license-file";

export async function GET() {
  const licenses: string = await getLicenseFileText("package.json");

  return new Response(licenses);
}
