export const SESSION_COOKIE_NAME = 'kairo_session';

export function getDisplayNameFromEmail(email) {
  const localPart = String(email || '').split('@')[0].replace(/[._-]+/g, ' ').trim();

  if (!localPart) {
    return 'Kairo user';
  }

  return localPart
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toSafeUser(user) {
  if (!user) {
    return null;
  }

  return {
    id: String(user._id),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    source: user.source || 'signup',
    createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
    updatedAt: user.updatedAt ? new Date(user.updatedAt).toISOString() : null,
  };
}
