import { NextResponse } from 'next/server';
import { getSessionUserFromRequest } from '@/backend/auth/session-user';
import { ensureCommunitySeed, getSidebarData } from '@/backend/community/service';

export async function GET(request) {
  try {
    await ensureCommunitySeed();
    const user = await getSessionUserFromRequest(request);

    const data = await getSidebarData({ userId: user?.id || null });

    return NextResponse.json({ ok: true, ...data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load sidebar.' },
      { status: 500 }
    );
  }
}
