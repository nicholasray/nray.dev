import { getLicenseFileText } from "generate-license-file";
import * as url from "url";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export async function GET() {
  const licenses: string = await getLicenseFileText(
    path.join(__dirname, "../../package.json"),
  );

  return new Response(licenses);
}
