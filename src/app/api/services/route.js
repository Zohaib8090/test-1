import getDb from '../../../../db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  let sql = `
    SELECT services.*, users.name as seller_name, users.avatar as seller_avatar 
    FROM services 
    JOIN users ON services.seller_id = users.id
    WHERE 1=1
  `;
  const params = [];

  if (query) {
    sql += ` AND (title LIKE ? OR description LIKE ?)`;
    params.push(`%${query}%`, `%${query}%`);
  }

  if (category) {
    sql += ` AND category = ?`;
    params.push(category);
  }

  try {
    const db = await getDb();
    const services = await db.all(sql, ...params);
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
