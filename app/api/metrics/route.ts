import { NextResponse } from 'next/server';
import Redis from 'ioredis';

export async function GET() {
  const redis = new Redis({ host: 'localhost', port: 6379 });
  const streamsActive = await redis.get('novaos:streams:active') || 1; // Fallback to 1
  const metrics = {
    streamsActive: Number(streamsActive),
    revenue: 25000,
    users: 100,
    lastUpdated: new Date().toISOString(),
  };
  redis.quit();
  return NextResponse.json(metrics);
}
