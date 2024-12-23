import app from "./app";
import DatabaseConnection from "./database/DatabaseConnection";

const serverPort = process.env.SERVER_PORT || 3000;
const dbUrl = process.env.DB_URL || "noDbUrlSet";

DatabaseConnection.getInstance().setUrl(dbUrl);

app.listen(serverPort, () => {
  console.log("Node server running");
});
