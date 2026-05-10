import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME, toSafeUser } from '@/lib/session';

export async function GET(request) {
  try {
    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId || !ObjectId.isValid(sessionId)) {
      return NextResponse.json({ ok: true, user: null });
    }

    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: new ObjectId(sessionId) });

    if (!user) {
      return NextResponse.json({ ok: true, user: null });
    }

    return NextResponse.json({ ok: true, user: toSafeUser(user) });
  } catch (error) {
    console.error('API /me error:', error);
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load session.' },
      { status: 500 }
    );
  }
}
