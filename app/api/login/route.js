import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME, toSafeUser } from '@/lib/session';
import { verifyPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Email and password are required.' }, { status: 400 });
    }

    const db = await getDb();
    const users = db.collection('users');
    const user = await users.findOne({ email });

    if (user && !user.passwordHash) {
      return NextResponse.json(
        { ok: false, message: 'This account needs a password. Use Create account once to set your password.' },
        { status: 409 }
      );
    }

    if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ ok: false, message: 'Invalid email or password.' }, { status: 401 });
    }

    const now = new Date();
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          lastSeenAt: now,
          updatedAt: now,
        },
      }
    );

    const refreshedUser = await users.findOne({ _id: user._id });
    const response = NextResponse.json({ ok: true, user: toSafeUser(refreshedUser) });

    response.cookies.set(SESSION_COOKIE_NAME, String(user._id), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to sign in.' },
      { status: 500 }
    );
  }
}
