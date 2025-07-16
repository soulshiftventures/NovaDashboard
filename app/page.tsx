import { Redis } from '@upstash/redis';  
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';  

export const dynamic = 'force-dynamic';  

const redis = Redis.fromEnv();  

export default async function Home() {  
  let streams = 1; // Default  
  let revenue = 25000; // Default  
  let users = 100; // Default  
  try {  
    streams = (await redis.get<number>('novaos:streams:active')) || 1;  
    revenue = (await redis.get<number>('revenue')) || 25000;  
    users = (await redis.get<number>('users')) || 100;  
  } catch (error) {  
    console.error('Redis fetch error:', error); // Log for Vercel monitoring  
  }  

  const chartData = [  
    { name: 'Streams', value: streams },  
    { name: 'Revenue', value: revenue / 1000 }, // Scale for chart visibility  
    { name: 'Users', value: users },  
  ];  

  return (  
    <main className="p-8">  
      <h1 className="text-2xl font-bold mb-4">NovaOS Dashboard</h1>  
      <div className="grid grid-cols-3 gap-4 mb-8">  
        <div className="p-4 border rounded">  
          <h2>Active Streams</h2>  
          <p className="text-4xl">{streams}</p>  
        </div>  
        <div className="p-4 border rounded">  
          <h2>Revenue ($)</h2>  
          <p className="text-4xl">{revenue}</p>  
        </div>  
        <div className="p-4 border rounded">  
          <h2>Users</h2>  
          <p className="text-4xl">{users}</p>  
        </div>  
      </div>  
      <h2 className="text-xl font-bold mb-4">Metrics Overview</h2>  
      <BarChart width={600} height={300} data={chartData}>  
        <XAxis dataKey="name" />  
        <YAxis domain={[0, 26]} ticks={[0, 6.5, 13, 19.5, 26]} /> // Scaled ticks  
        <Tooltip />  
        <Bar dataKey="value" fill="#8884d8" />  
      </BarChart>  
    </main>  
  );  
}  
