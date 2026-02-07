export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const banks = [
    { 
      id: 'dab', 
      name: 'Da Afghanistan Bank', 
      swift: 'DAFGAFKA',
      branches: ['Kabul', 'Herat', 'Mazar-i-Sharif', 'Kandahar']
    },
    { 
      id: 'azizi', 
      name: 'Azizi Bank', 
      swift: 'AZIZAFKA',
      branches: ['Kabul', 'Herat', 'Jalalabad']
    },
    { 
      id: 'aib', 
      name: 'Afghanistan International Bank', 
      swift: 'AFIBAFKA',
      branches: ['Kabul', 'Herat', 'Mazar-i-Sharif']
    }
  ];
  
  res.json({ success: true, banks });
}
