import { NextResponse } from 'next/server';
import { getSessionUserFromRequest } from '@/backend/auth/session-user';
import { createChannel, ensureCommunitySeed, listChannels } from '@/backend/community/service';

export async function GET(request) {
  try {
    await ensureCommunitySeed();
    const user = await getSessionUserFromRequest(request);
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';

    const channels = await listChannels({
      query: q,
      userId: user?.id || null,
    });

    return NextResponse.json({ ok: true, channels });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load channels.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getSessionUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ ok: false, message: 'Sign in to create channels.' }, { status: 401 });
    }

    const body = await request.json();
    const channel = await createChannel({
      name: body.name,
      description: body.description,
      user,
    });

    return NextResponse.json({ ok: true, channel }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to create channel.' },
      { status: 400 }
    );
  }
}
