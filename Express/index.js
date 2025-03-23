const express = require("express");
const { tokenMiddleware } = require("./middelwaretoken");
require("dotenv").config();

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send({ status: 1, msg: "Home Page" });
});

app.get("/news", tokenMiddleware, (req, res) => {
    res.send({ status: 1, msg: "This Is News Page" });
});

app.get("/new/:id", (req, res) => {
    const data = req.params.id;
    res.send({ status: 1, msg: `This Is News Page for ID: ${data}` });
});

app.get("/product", (req, res) => {
    res.send({ status: 1, msg: "This Is Product Page" });
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.json({
        status: 1,
        msg: "You Are Logged In...",
        data: req.body,
        queryData: req.query,
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
