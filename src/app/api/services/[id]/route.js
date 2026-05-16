import getDb from '../../../../../db';
import { NextResponse } from 'next/server';

export async function GET(request, { params: paramsPromise }) {
  try {
    const params = await paramsPromise;
    const db = await getDb();
    const service = await db.get(`
      SELECT services.*, users.name as seller_name, users.avatar as seller_avatar, users.skills as seller_skills
      FROM services
      JOIN users ON services.seller_id = users.id
      WHERE services.id = ?
    `, params.id);

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
