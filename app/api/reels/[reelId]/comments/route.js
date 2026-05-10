import { NextResponse } from 'next/server';

// Add comment logic
export async function GET(request, { params }) {
  try {
    const { reelId } = params;

    // Placeholder: fetch comments from database
    const comments = [];

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

    // Placeholder: save comment to database
    const newComment = {
      id: Date.now(),
      reelId,
      text,
      authorId: authorId || 'anon',
      authorName: authorName || 'Anonymous',
      createdAt: new Date(),
      likes: 0,
    };

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
