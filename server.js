require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/*
Serve all html/css/js files
*/
app.use(express.static(__dirname));

/*
Open index.html when localhost:3000 loads
*/
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});

/*
Model Create API
*/
app.post("/api/model/create", async (req, res) => {

    try {

        console.log("Received Payload");

        console.log(req.body);

        /*
        Temporary Success Response
        */

        res.status(200).json({
            success: true
        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            success:false
        });

    }

});

app.listen(3000, () => {

    console.log(
        "Server Running On Port 3000"
    );

});
