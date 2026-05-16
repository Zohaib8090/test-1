import getDb from '../../../../db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { service_id, buyer_id, total_amount } = body;

    const db = await getDb();
    const result = await db.run(`
      INSERT INTO bookings (service_id, buyer_id, status, total_amount)
      VALUES (?, ?, 'requested', ?)
    `, service_id, buyer_id, total_amount);

    return NextResponse.json({ id: result.lastID, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const db = await getDb();
    const bookings = await db.all(`
      SELECT bookings.*, services.title as service_title, users.name as seller_name
      FROM bookings
      JOIN services ON bookings.service_id = services.id
      JOIN users ON services.seller_id = users.id
      WHERE bookings.buyer_id = ?
      ORDER BY bookings.created_at DESC
    `, userId);

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
