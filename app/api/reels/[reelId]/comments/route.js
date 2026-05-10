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

export async function GET(request, { params }) {
  try {
    const { reelId } = params;
    const reels = loadDB();
    const reel = reels.find(r => r.id === reelId);

    if (!reel) {
      return NextResponse.json(
        { success: false, error: 'Reel not found' },
        { status: 404 }
      );
    }

    const comments = reel.comments || [];
    return NextResponse.json({
      success: true,
      data: comments,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { reelId } = params;
    const body = await request.json();
    const { text, authorId, authorName } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Comment text is required' },
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

    // Initialize comments array if it doesn't exist
    if (!reel.comments) {
      reel.comments = [];
    }

    const newComment = {
      id: `comment_${Date.now()}`,
      reelId,
      text,
      authorId: authorId || 'anon',
      authorName: authorName || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    reel.comments.unshift(newComment);
    
    reels[reelIndex] = reel;
    saveToDB(reels);

    return NextResponse.json({
      success: true,
      data: newComment,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
