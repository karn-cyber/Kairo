import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'reels-db.json');

function loadDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load reels DB', err);
  }
  // fallback
  return [];
}

function saveToDB(arr) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(arr, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write reels DB', err);
  }
}

export async function GET(request) {
  try {
    // Optional: implement filtering by creator, search, etc.
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId');

    const all = loadDB();
    let filteredReels = all;
    if (creatorId) {
      filteredReels = all.filter(r => r.creatorId === creatorId);
    }

    return NextResponse.json({
      success: true,
      data: filteredReels,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.videoUrl) {
      return NextResponse.json(
        { success: false, error: 'Title and video URL are required' },
        { status: 400 }
      );
    }

    const all = loadDB();
    const newReel = {
      id: `reel_${Date.now()}`,
      videoUrl: body.videoUrl,
      title: body.title,
      description: body.description || '',
      creatorId: body.creatorId || `user_${Date.now()}`,
      creatorName: body.creatorName || 'Anonymous',
      createdAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      comments: [],
    };

    all.unshift(newReel);
    saveToDB(all);

    return NextResponse.json({
      success: true,
      data: newReel,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
