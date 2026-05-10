import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'reels-db.json');

function loadDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load reels DB', err);
  }
  return [];
}

function saveToDB(arr) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(arr, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write reels DB', err);
  }
}

export async function POST(request, { params }) {
  try {
    const { reelId } = params;
    const body = await request.json();
    const { action, userId } = body; // 'like' or 'unlike', userId of the liker

    if (!['like', 'unlike'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }

    const reels = loadDB();
    const reelIndex = reels.findIndex(r => r.id === reelId);

    if (reelIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Reel not found' },
        { status: 404 }
      );
    }

    const reel = reels[reelIndex];

    // Initialize likedBy array if it doesn't exist
    if (!reel.likedBy) {
      reel.likedBy = [];
    }

    const userLikeIndex = reel.likedBy.indexOf(userId);

    if (action === 'like') {
      if (userLikeIndex === -1) {
        reel.likedBy.push(userId);
        reel.likes = (reel.likes || 0) + 1;
      }
    } else if (action === 'unlike') {
      if (userLikeIndex !== -1) {
        reel.likedBy.splice(userLikeIndex, 1);
        reel.likes = Math.max(0, (reel.likes || 0) - 1);
      }
    }

    reels[reelIndex] = reel;
    saveToDB(reels);

    return NextResponse.json({
      success: true,
      message: `Reel ${action}d successfully`,
      reel: {
        id: reel.id,
        likes: reel.likes,
        isLiked: reel.likedBy.includes(userId),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
