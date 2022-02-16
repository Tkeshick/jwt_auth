const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const router = require('./routes/ingex.js')
dotenv.config();

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// const corsOptions = {
//   origin: ['http://localhost:3000', 'http://localhost:5000'],
//   optionsSuccessStatus: 200,
//   credentials: true,
// };
// app.use(cors(corsOptions));



app.use('/api', router)

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Сервер не упал на ${PORT} порту :)`);
    });
  } catch (error) {
    console.log(error);
  }
}

start()
