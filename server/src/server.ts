import express, { Request, Response } from 'express';
import cors from 'cors';
import sequelize from './sequelizeConfig';
import { v4 as uuidv4 } from 'uuid';
import Session from './models/Session';

const app = express();
const port = 3001; 
const initial_credits = 10;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json()); 

//DB connection
sequelize.authenticate().then(() => {
  console.log('Connection to DB has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the DB: ', error);
});

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

const shouldReRoll = (credits: number): boolean => {
  if (credits > 60) return Math.random() < 0.6; // 60% chance
  if (credits > 40) return Math.random() < 0.3; // 30% chance
  return false;
};

// Start session endpoint - creates new session with initial credits
// returns the session id and credits to the client
app.post('/start-session', async (req: Request, res: Response) => {
  try {
    const sessionId = uuidv4()
    await Session.create({ sessionId, credits: initial_credits });
    res.json({ sessionId, initialCredits: initial_credits });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Can't start new session` });
  }
});

// Spin endpoint - rolling 3 random signs according the roll policy 
// returns the result and session's credits to the client
app.post('/spin', async (req: Request, res: Response) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'SessionId is required' });
  }

  try {
    const session = await Session.findOne({
      where: { sessionId },
    });

    if(!session) {
      return res.status(400).json({ error: 'SessionId not found' });
    }

    let result = [getRandomSign(), getRandomSign(), getRandomSign()];

    // Reroll validation according rolling policy
    if (shouldReRoll(session.credits)) {
      result = [getRandomSign(), getRandomSign(), getRandomSign()];
    }

    const allMatch = result.every(sign => sign === result[0]);
    const reward = allMatch ? rewards[result[0]] : -1;

    await Session.update({ credits: sequelize.literal(`credits + ${reward}`) }, { where: { sessionId } });
    const updatedSession = await Session.findOne({ where: { sessionId } });
    
    res.json({ result, credits: updatedSession?.credits });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Server error - can't complete spin.` });
  }
});

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('DB and tables synchronized.');

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error synchronizing DB:', error);
  }
}

startServer();
