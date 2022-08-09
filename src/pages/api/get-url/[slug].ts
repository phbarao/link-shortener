import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db/client';

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query['slug'];

  if (!slug || typeof slug !== 'string') {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: 'please use with a slug' }));
    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=1000000, stale-while-revalidate');

    res.send(JSON.stringify({ message: 'slug not found' }));
    return;
  }

  return res.json(data);
};

export default getUrl;