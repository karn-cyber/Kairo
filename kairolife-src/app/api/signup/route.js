import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body.fullName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const role = String(body.role || 'traveller').trim();

    if (!fullName || !email) {
      return NextResponse.json(
        { ok: false, message: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const result = await db.collection('signup_leads').insertOne({
      fullName,
      email,
      role,
      createdAt: new Date()
    });

    return NextResponse.json({ ok: true, insertedId: result.insertedId.toString() });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to save signup.' },
      { status: 500 }
    );
  }
}
