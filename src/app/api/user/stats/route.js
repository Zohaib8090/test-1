import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import getDb from '@/../db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const userId = session.user.id;

    // Earnings (sum of confirmed bookings where current user is seller)
    const earnings = await db.get(`
      SELECT SUM(total_amount) as total 
      FROM bookings 
      JOIN services ON bookings.service_id = services.id 
      WHERE services.seller_id = ? AND bookings.status = 'confirmed'
    `, userId);

    // Active Services
    const services = await db.get('SELECT COUNT(*) as count FROM services WHERE seller_id = ?', userId);

    // Total Clients (unique buyer_ids for current user's services)
    const clients = await db.get(`
      SELECT COUNT(DISTINCT buyer_id) as count 
      FROM bookings 
      JOIN services ON bookings.service_id = services.id 
      WHERE services.seller_id = ?
    `, userId);

    // Recent bookings (as seller)
    const recentAsSeller = await db.all(`
      SELECT bookings.*, services.title as service_title, users.name as buyer_name, users.avatar as buyer_avatar
      FROM bookings
      JOIN services ON bookings.service_id = services.id
      JOIN users ON bookings.buyer_id = users.id
      WHERE services.seller_id = ?
      ORDER BY bookings.created_at DESC
      LIMIT 5
    `, userId);

    return NextResponse.json({
      earnings: earnings.total || 0,
      serviceCount: services.count || 0,
      clientCount: clients.count || 0,
      rating: 5.0,
      recentBookings: recentAsSeller
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
