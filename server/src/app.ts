import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import corsOptions from './config/cors-options';
import authRoute from "./modules/auth/auth.route";
import responseMiddleware from './middlewares/response-middleware';
import errorMiddleware from './middlewares/error-middleware';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());

app.use(responseMiddleware);

app.get('/test', async (req, res) => {
  return res.success("working");
});

app.use("/api/auth", authRoute);

app.use(errorMiddleware);

export default app
