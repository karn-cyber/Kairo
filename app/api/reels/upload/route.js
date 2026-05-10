import fs from 'fs';
import path from 'path';
import { getSessionUserFromRequest } from '@/backend/auth/session-user';

const DB_PATH = path.join(process.cwd(), 'data', 'reels-db.json');

function loadDB() {
  try {
    if (fs.existsSync(DB_PATH)) return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (e) {
    console.error(e);
  }
  return [];
}

function saveDB(arr) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(arr, null, 2), 'utf8');
  } catch (e) { console.error(e); }
}

export async function POST(req) {
  try {
    const user = await getSessionUserFromRequest(req);
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Sign in to upload reels.' }), { status: 401 });
    }

    const body = await req.json();
    const { filename, contentBase64, title, description, creatorName } = body;
    if (!filename || !contentBase64) {
      return new Response(JSON.stringify({ success: false, error: 'filename and contentBase64 required' }), { status: 400 });
    }

    const reelsDir = path.join(process.cwd(), 'Reels');
    if (!fs.existsSync(reelsDir)) fs.mkdirSync(reelsDir, { recursive: true });

    const safeName = path.basename(filename);
    const filePath = path.join(reelsDir, safeName);
    const buffer = Buffer.from(contentBase64, 'base64');
    fs.writeFileSync(filePath, buffer);

    const db = loadDB();
    const newReel = {
      id: `reel_${Date.now()}`,
      videoUrl: `/api/reels/files/${safeName}`,
      thumbnailUrl: '',
      creator: {
        id: String(user.id),
        name: user.fullName || creatorName || 'Kairo Life',
        handle: user.email === 'findyourkairo@gmail.com' ? 'kairolife' : 'you',
        avatarUrl: '',
        isVerified: Boolean(user.isAdmin),
        isFollowing: false,
      },
      caption: title || '',
      location: '',
      linkedTripId: null,
      linkedTripTitle: null,
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
      postedAt: new Date().toISOString(),
    };
    db.unshift(newReel);
    saveDB(db);

    return new Response(JSON.stringify({ success: true, data: newReel }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
