import type { NextApiRequest, NextApiResponse } from 'next'


type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Success' });
  if (req.method === 'POST') {
    console.log(req.body);
    const { data } = req.body;

    console.log('Data received:', data);

    res.status(200).json({ message: 'Received data successfully!' });
  } else {

    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
