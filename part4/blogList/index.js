import { PORT } from "./utils/config.js";
import { info } from "./utils/logger.js";
import app from "./app.js";
app.listen(PORT, () => {
  info(`listen to ${PORT}`);
});
