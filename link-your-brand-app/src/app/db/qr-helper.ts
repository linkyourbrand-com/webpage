import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-');
}

/**
 * Generate a PNG QR code for an event URL, save to `public/uploads`, and
 * return both the absolute filesystem path and a public URL path.
 *
 * @returns { filePath: string, publicPath: string }
 */
export async function generateEventQr(eventUrl: string, filename = ''): Promise<{ filePath: string; publicPath: string }> {
  if (!filename) filename = `event-qr-${Date.now()}.png`;
  filename = sanitizeFilename(filename);

  const dataUrl = await QRCode.toDataURL(eventUrl, { type: 'image/png' });
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');

  const outDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, filename);
  await fs.writeFile(outPath, Buffer.from(base64, 'base64'));

  // publicPath is relative to the site's root
  const publicPath = path.posix.join('/uploads', filename);
  return { filePath: outPath, publicPath };
}

// Note: this module is intended to be imported and used from server-side code
// (API routes or server components). If you want a CLI test, run a small
// Node script that imports this module rather than relying on `require.main`.
