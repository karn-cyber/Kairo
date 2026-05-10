import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const name = params.name;
    const safeName = path.basename(name); // prevent path traversal
    const reelsDir = path.join(process.cwd(), 'Reels');
    const filePath = path.join(reelsDir, safeName);

    if (!fs.existsSync(filePath)) {
      return new Response('Not found', { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const file = fs.readFileSync(filePath);

    const headers = new Headers();
    headers.set('Content-Type', 'video/mp4');
    headers.set('Content-Length', String(stat.size));

    return new Response(file, { status: 200, headers });
  } catch (err) {
    return new Response(err.message || 'Server error', { status: 500 });
  }
}
