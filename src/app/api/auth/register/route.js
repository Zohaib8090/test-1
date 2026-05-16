import { NextResponse } from 'next/server';
import getDb from '../../../../../db';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password, university, department, skills } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();

    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await db.run(`
      INSERT INTO users (name, email, password, skills, avatar) 
      VALUES (?, ?, ?, ?, ?)
    `,
      name, 
      email, 
      hashedPassword, 
      skills ? skills.join(', ') : '', 
      `https://i.pravatar.cc/150?u=${email}`
    );

    return NextResponse.json({ success: true, userId: result.lastID }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
