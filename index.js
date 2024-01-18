import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Bienvenido a mi API con Node js y Express 😀");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
