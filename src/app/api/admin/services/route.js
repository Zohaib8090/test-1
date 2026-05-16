import { NextResponse } from 'next/server';
import getDb from '@/../db';

export async function GET() {
  try {
    const db = await getDb();
    const services = await db.all(`
      SELECT services.*, users.name as seller_name 
      FROM services 
      JOIN users ON services.seller_id = users.id 
      WHERE services.status = 'pending'
      ORDER BY services.created_at DESC
    `);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, status } = await request.json();
    const db = await getDb();
    await db.run('UPDATE services SET status = ? WHERE id = ?', status, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
