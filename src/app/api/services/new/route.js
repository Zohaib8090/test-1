import getDb from '../../../../../db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { seller_id, title, description, category, price, platform_fee } = body;

    const db = await getDb();
    const result = await db.run(`
      INSERT INTO services (seller_id, title, description, category, price, platform_fee)
      VALUES (?, ?, ?, ?, ?, ?)
    `, seller_id, title, description, category, price, platform_fee);

    return NextResponse.json({ id: result.lastID, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
