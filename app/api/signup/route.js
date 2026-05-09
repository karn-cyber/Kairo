import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME, getDisplayNameFromEmail, toSafeUser } from '@/lib/session';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');
    const role = String(body.role || 'traveller').trim();
    const resolvedFullName = fullName || getDisplayNameFromEmail(email);

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const users = db.collection('users');
    const now = new Date();

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      if (!existingUser.passwordHash) {
        await users.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              fullName: resolvedFullName,
              role,
              passwordHash: hashPassword(password),
              updatedAt: now,
              lastSeenAt: now,
              source: 'signup',
            },
          }
        );

        const recoveredUser = await users.findOne({ _id: existingUser._id });
        const recoveredResponse = NextResponse.json({
          ok: true,
          user: toSafeUser(recoveredUser),
        });

        recoveredResponse.cookies.set(SESSION_COOKIE_NAME, String(existingUser._id), {
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
        });

        return recoveredResponse;
      }

      return NextResponse.json(
        { ok: false, message: 'Account already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    const insertResult = await users.insertOne({
      fullName: resolvedFullName,
      email,
      role,
      passwordHash: hashPassword(password),
      createdAt: now,
      updatedAt: now,
      lastSeenAt: now,
    });

    const savedUser = await users.findOne({ _id: insertResult.insertedId });

    const response = NextResponse.json({
      ok: true,
      user: toSafeUser(savedUser),
    });

    if (savedUser?._id) {
      response.cookies.set(SESSION_COOKIE_NAME, String(savedUser._id), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to save signup.' },
      { status: 500 }
    );
  }
}
