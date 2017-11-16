import express from 'express';
import mongoose from 'mongoose';

import config from './config/config';
import router from './routes/routes';

mongoose.connect(config.mongoUrl, () => {
    console.log('Db initialized!');
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/simplonBook', router);

app.listen(config.port, () => {
    console.log(`Started on port ${config.port}`);
});