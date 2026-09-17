const express = require("express");
const axios = require("axios");
const session = require("express-session");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// =============================
// CONFIG
// =============================
const ODATA_URL = "https://vhbnubsdci.rise.brother.com:44300/sap/opu/odata/sap/ZTEST_OD_SRV/";

app.use(express.json());

app.use(
    session({
        secret: "model-setup-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        }
    })
);

app.use(express.static(__dirname));

// =============================
// HOME PAGE
// =============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// =============================
// LOGIN
// =============================

app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const authHeader =
            "Basic " +
            Buffer.from(
                `${username}:${password}`
            ).toString("base64");

        await axios.get(
            `${ODATA_URL}$metadata`,
            {
                headers: {
                    Authorization: authHeader,
                    "sap-client": "800"
                }
            }
        );

        req.session.sapAuth = authHeader;

        res.json({
            success: true
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid SAP Credentials"
        });
    }
});

// =============================
// MODEL SEARCH
// =============================

app.get("/api/model", async (req, res) => {
console.log("===== /api/model Triggered =====");
console.log(req.query);
    try {

        if (!req.session.sapAuth) {

            return res.status(401).json({
                error: "Please login first"
            });
        }

        const model = req.query.model;
        const country = req.query.country;

        // const filter =
        //     `$filter=Matnr eq '${model}' and Country eq '${country}'`;

        const requestedFields = `Matnr='${model}',Country='${country}'`;
                             
        const url =
            `${ODATA_URL}Model_detailsSet(${requestedFields})?$format=json`;
            

        console.log("Calling:");
        console.log(url);
        console.log("Session Auth:");
        console.log(req.session.sapAuth);

        const response = await axios.get(
            url,
            {
                headers: {
                    Authorization: req.session.sapAuth,
                    Accept: "application/json",
                    "sap-client": "800"
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log("SAP ERROR:");
        console.log(error.response?.data);
        console.log(error.message);

        res.status(500).json({
            error:
                error.response?.data ||
                error.message
        });
    }
});

// ======================================================
        // MODEL REPORT API
        // ======================================================

        app.get("/api/models", async (req, res) => {

            try {

                if (!req.session.sapAuth) {
                    return res.status(401).json({
                        error: "Please login first"
                    });
                }

                const modelInput =
                    req.query.model || "";

                const country =
                    req.query.country || "";

                const models =
                    modelInput
                        .split(",")
                        .map(x => x.trim())
                        .filter(x => x);

                let finalResults = [];

                for (const model of models) {

                    const filter =
                        `$filter=Matnr eq '${model}' and Country eq '${country}'`;

                    const url =
                        `${ODATA_URL}Model_detailsSet?${filter}&$format=json`;

                    console.log(url);

                    const response =
                        await axios.get(
                            url,
                            {
                                headers: {
                                    Authorization: req.session.sapAuth,
                                    Accept: "application/json",
                                    "sap-client": "800"
                                }
                            }
                        );

                    const rows =
                        response.data?.d?.results || [];

                    finalResults.push(...rows);
                }

                res.json({
                    d: {
                        results: finalResults
                    }
                });

            }
            catch (error) {

                console.log(error.response?.data);
                console.log(error.message);

                res.status(500).json({
                    error: error.message
                });
            }

        });
// =============================
// app.get("/logout", (req, res) => {
//     req.session.destroy();
//     res.json({ success: true });
// });
// =============================
// LOGOUT
// =============================

app.get("/logout", (req, res) => {

    req.session.destroy(err => {

        if (err) {
            return res.status(500).json({
                success: false
            });
        }

        res.json({
            success: true
        });

    });

});

// =============================
// CREATE MODEL API
// =============================

app.post("/api/model/create", async (req, res) => {

    try {

        let existing = [];

        if (fs.existsSync("models.json")) {

            existing = JSON.parse(
                fs.readFileSync(
                    "models.json",
                    "utf8"
                )
            );
        }

        existing.push(req.body);

        fs.writeFileSync(
            "models.json",
            JSON.stringify(
                existing,
                null,
                2
            )
        );

        console.log(
            "MODEL SAVED"
        );

        console.log(
            JSON.stringify(
                req.body,
                null,
                2
            )
        );

        res.json({
            success: true,
            message: "Model Saved Successfully"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


app.get("/api/saved-models", (req, res) => {

    const filePath = path.join(
        __dirname,
        "models.json"
    );

    if (!fs.existsSync(filePath)) {
        return res.json([]);
    }

    const data = JSON.parse(
        fs.readFileSync(
            filePath,
            "utf8"
        )
    );

    res.json(data);

});

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});