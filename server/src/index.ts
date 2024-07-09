import app from "./app";
import { config } from "./config";
import logger from "./utils/logger";

app.listen(config.port, async () => {
    logger.info(`App is running at http://localhost:${config.port}`);
});