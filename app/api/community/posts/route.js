import { NextResponse } from 'next/server';
import { getSessionUserFromRequest } from '@/backend/auth/session-user';
import { createPost, ensureCommunitySeed, listPosts } from '@/backend/community/service';

export async function GET(request) {
  try {
    await ensureCommunitySeed();
    const { searchParams } = new URL(request.url);
    const channel = searchParams.get('channel') || '';
    const q = searchParams.get('q') || '';

    const posts = await listPosts({ channel, query: q });

    return NextResponse.json({ ok: true, posts });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load posts.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getSessionUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ ok: false, message: 'Sign in to create posts.' }, { status: 401 });
    }

    const body = await request.json();

    const post = await createPost({
      user,
      channelSlug: body.channelSlug,
      title: body.title,
      body: body.body,
      imageDataUrl: body.imageDataUrl,
      attachedPackage: body.attachedPackage,
    });

    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to create post.' },
      { status: 400 }
    );
  }
}
