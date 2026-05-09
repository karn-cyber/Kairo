import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME, toSafeUser } from '@/lib/session';

export async function getSessionUserFromRequest(request) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId || !ObjectId.isValid(sessionId)) {
    return null;
  }

  const db = await getDb();
  const user = await db.collection('users').findOne({ _id: new ObjectId(sessionId) });

  return toSafeUser(user);
}
