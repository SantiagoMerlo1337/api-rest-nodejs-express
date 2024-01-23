import express from "express";
import fs, { read, writeFile } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json", "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return null;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("Bienvenido a mi API con Node js y Express 😀");
});

app.get("/libros", (req, res) => {
    const data = readData();
    if (data) {
        res.json(data.libros);
    } else {
        res.status(500).send("Error al leer los datos");
    }
});

app.get("/libros/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libro = data.libros.find((libro) => libro.id === id);
    res.json(libro);
});

app.post("/libros", (req, res) => {
    const data = readData();
    const body = req.body;
    const nuevoLibro = {
        id: data.libros.length + 1,
        ...body,
    };
    data.libros.push(nuevoLibro);
    writeData(data);
    res.json(nuevoLibro);
});

app.put("/libros/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const libroIndice = data.libros.findIndex((libro) => libro.id === id);
    data.libros[libroIndice] = {
        ...data.libros[libroIndice],
        ...body,
    };
    writeData(data);
    res.json({ message: "Libro actualizado correctamente" });
});

app.delete("/libros/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libroIndice = data.libros.findIndex((libro) => libro.id === id);
    data.libros.splice(libroIndice, 1);
    writeData(data);
    res.json({ message: "Libro borrado correctamente" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
