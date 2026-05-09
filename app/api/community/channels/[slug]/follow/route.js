import { NextResponse } from 'next/server';
import { getSessionUserFromRequest } from '@/backend/auth/session-user';
import { toggleFollowChannel } from '@/backend/community/service';

export async function POST(request, { params }) {
  try {
    const user = await getSessionUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ ok: false, message: 'Sign in to follow channels.' }, { status: 401 });
    }

    const result = await toggleFollowChannel({
      slug: params.slug,
      userId: user.id,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to update follow status.' },
      { status: 400 }
    );
  }
}
