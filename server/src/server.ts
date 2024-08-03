import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001; 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json()); 

const signs = ['C', 'L', 'O', 'W'] as const;
const rewards: Record<typeof signs[number], number> = {
  C: 10,
  L: 20,
  O: 30,
  W: 40
};

const getRandomSign = (): typeof signs[number] => {
  return signs[Math.floor(Math.random() * signs.length)];
};

// Spin endpoint first stage - the server return random spin result and reward
app.post('/spin', (req: Request, res: Response) => {
  const result = [getRandomSign(), getRandomSign(), getRandomSign()];
  const allMatch = result.every(sign => sign === result[0]);
  const reward = allMatch ? rewards[result[0]] : 0;

  res.json({ result, reward });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
