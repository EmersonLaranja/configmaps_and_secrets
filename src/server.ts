import 'reflect-metadata'
import app from "./app";
import { AppDataSource } from "./database/data-source";

const PORT = process.env.SERVER_PORT || 3333

//database connection
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error(error);
    });

//server connection
app.listen(PORT, () => {
    console.log(`Server running on http://localhost/${PORT}`);
});

export default app;
