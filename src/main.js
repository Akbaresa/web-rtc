import { logger } from "./app/logging.js";
import { web, server } from "./app/web.js";

web.listen(3000, () => {
    logger.info("Aplikasi sedang berjalan");
});
server.listen(4000, () => {
    logger.info("Aplikasi sedang berjalan");
});