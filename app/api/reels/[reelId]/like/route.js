import { NextResponse } from 'next/server';

// Add like/unlike logic
export async function POST(request, { params }) {
  try {
    const { reelId } = params;
    const body = await request.json();
    const { action } = body; // 'like' or 'unlike'

    if (!['like', 'unlike'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
    }

    // Placeholder: this would connect to database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: `Reel ${action}d successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
