import { NextResponse } from 'next/server';
import getDb from '@/../db';

export async function GET() {
  try {
    const db = await getDb();
    const users = await db.all('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
