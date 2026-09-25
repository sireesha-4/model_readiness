require("dotenv").config();
const express = require("express");
const axios = require("axios");
const session = require("express-session");
const path = require("path");
const fs = require("fs");
const createAIRouter =
    require("./ai/aiRoutes");

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

function toODataDate(value) {

    if (!value) {
        return null;
    }

    if (
        typeof value === "string" &&
        value.startsWith("/Date(")
    ) {
        return value;
    }

    const date =
        new Date(value + "T00:00:00Z");

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return `/Date(${date.getTime()})/`;
}

// =============================
// CREATE MODEL API
// =============================

app.post("/api/model/create", async (req, res) => {

    console.log("======================================");
    console.log("CREATE MODEL API HIT");
    console.log("======================================");

    try {

        if (!req.session.sapAuth) {

            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }


        const CREATE_URL =
            `${ODATA_URL}Model_setupSet`;


        console.log(
            "SAP CREATE URL:",
            CREATE_URL
        );


        console.log(
            "FRONTEND PAYLOAD:"
        );

        console.log(
            JSON.stringify(
                req.body,
                null,
                2
            )
        );


        // =====================================
        // PREPARE SAP PAYLOAD
        // =====================================

        const payload = {
            ...req.body
        };


        // OData Decimal properties

        payload.B1kbetr =
            payload.B1kbetr !== "" &&
            payload.B1kbetr !== undefined
                ? String(payload.B1kbetr)
                : "0";

        payload.B1kpein =
            payload.B1kpein !== "" &&
            payload.B1kpein !== undefined
                ? String(payload.B1kpein)
                : "0";

        payload.Brkbetr =
            payload.Brkbetr !== "" &&
            payload.Brkbetr !== undefined
                ? String(payload.Brkbetr)
                : "0";

        payload.Brkpein =
            payload.Brkpein !== "" &&
            payload.Brkpein !== undefined
                ? String(payload.Brkpein)
                : "0";


        // =====================================
        // CONVERT DATES TO ODATA V2 DATETIME
        // =====================================

        payload.B1datab =
            payload.Selkzb1 === "X"
                ? toODataDate(payload.B1datab)
                : null;

        payload.B1datbi =
            payload.Selkzb1 === "X"
                ? toODataDate(
                    payload.B1datbi ||
                    "9999-12-31"
                )
                : null;

        payload.Brdatab =
            payload.Selkzbr === "X"
                ? toODataDate(payload.Brdatab)
                : null;

        payload.Brdatbi =
            payload.Selkzbr === "X"
                ? toODataDate(
                    payload.Brdatbi ||
                    "9999-12-31"
                )
                : null;


        console.log(
            "FINAL SAP ODATA PAYLOAD:"
        );

        console.log(
            JSON.stringify(
                payload,
                null,
                2
            )
        );


        // =====================================
        // FETCH CSRF TOKEN AND SAP SESSION
        // =====================================

        const csrfResponse =
            await axios.get(
                ODATA_URL,
                {
                    headers: {

                        Authorization:
                            req.session.sapAuth,

                        "X-CSRF-Token":
                            "Fetch",

                        Accept:
                            "application/json",

                        "sap-client":
                            "800"
                    }
                }
            );


        const token =
            csrfResponse.headers[
                "x-csrf-token"
            ];


        const cookies =
            csrfResponse.headers[
                "set-cookie"
            ] || [];


        console.log(
            "CSRF Token Received:",
            Boolean(token)
        );


        console.log(
            "SAP Cookie Count:",
            cookies.length
        );


        if (!token) {

            return res.status(500).json({
                success: false,
                message:
                    "SAP CSRF token was not returned"
            });
        }


        const cookieHeader =
            cookies
                .map(cookie =>
                    cookie.split(";")[0]
                )
                .join("; ");


        // =====================================
        // POST TO MODEL_SETUPSET
        // =====================================

        console.log(
            "Calling SAP Model_setupSet..."
        );


        const sapResponse =
            await axios.post(
                CREATE_URL,
                payload,
                {
                    headers: {

                        Authorization:
                            req.session.sapAuth,

                        "X-CSRF-Token":
                            token,

                        Cookie:
                            cookieHeader,

                        Accept:
                            "application/json",

                        "Content-Type":
                            "application/json",

                        "sap-client":
                            "800"
                    },

                    validateStatus:
                        function (status) {

                            return status >= 200 &&
                                   status < 300;
                        }
                }
            );


        console.log(
            "======================================"
        );

        console.log(
            "SAP CREATE SUCCESS"
        );

        console.log(
            "======================================"
        );


        console.log(
            "SAP Status:",
            sapResponse.status
        );


        console.log(
            "SAP Response:"
        );

        console.log(
            JSON.stringify(
                sapResponse.data,
                null,
                2
            )
        );


        return res.status(200).json({

            success: true,

            message:
                "SAP CREATE_ENTITY triggered successfully",

            data:
                sapResponse.data
        });

    }
    catch (error) {

        console.error(
            "======================================"
        );

        console.error(
            "SAP CREATE FAILED"
        );

        console.error(
            "======================================"
        );


        console.error(
            "Error:",
            error.message
        );


        if (error.response) {

            console.error(
                "SAP HTTP STATUS:",
                error.response.status
            );


            console.error(
                "SAP ERROR BODY:"
            );


            console.error(
                JSON.stringify(
                    error.response.data,
                    null,
                    2
                )
            );
        }


        let message =
            error.message ||
            "SAP create request failed";


        const sapError =
            error.response?.data?.error;


        if (sapError) {

            if (
                typeof sapError.message ===
                "string"
            ) {

                message =
                    sapError.message;
            }

            else if (
                sapError.message?.value
            ) {

                message =
                    sapError.message.value;
            }
        }


        return res.status(500).json({

            success: false,

            message: message,

            sapStatus:
                error.response?.status || null,

            sapError:
                error.response?.data || null
        });
    }
});

// =====================================================
// AI ROUTES
// =====================================================

app.use(
    "/api/ai",
    createAIRouter({
        ODATA_URL: ODATA_URL,
        SAP_CLIENT: "800"
    })
);

// =============================
// MODEL Search and Change
// =============================
app.get("/api/model/get", async (req, res) => {
 
    console.log("===== /api/model/get Triggered =====");
    console.log(req.query);
 
    try {
 
        if (!req.session.sapAuth) {
 
            return res.status(401).json({
                error: "Please login first"
            });
        }
 
        const model = req.query.model;
        const country = req.query.country;
 
        const requestedFields =
            `Matnr='${model}',Country='${country}'`;
 
        const url =
            `${process.env.ODATA_URL2}(${requestedFields})?$format=json`;
 
        console.log("Calling:");
        console.log(url);
 
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
///=============================
app.put("/api/model/change", async (req, res) => {
 
    console.log("===== API HIT =====");
    console.log("changedFields:", req.body);
 
    try {
        if (!req.session.sapAuth) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }
        const changedFields = req.body;
 
        console.log("Calling SAP URL:");
        console.log(process.env.ODATA_URL2);
 
        const SERVICE_ROOT =
            "https://vhbnubsdci.rise.brother.com:44300/sap/opu/odata/sap/ZTEST_OD_SRV/";
 
        const csrfResponse = await axios.get(
            SERVICE_ROOT,
            {
                headers: {
                    Authorization: req.session.sapAuth,
                    "x-csrf-token": "Fetch",
                    "sap-client": "800"
                }
            }
        );
 
        const token =
            csrfResponse.headers["x-csrf-token"];
 
        const cookies =
            csrfResponse.headers["set-cookie"];
 
        const sapResponse = await axios.post(
            process.env.ODATA_URL2,
            changedFields,
            {
                headers: {
                    Authorization: req.session.sapAuth,
                    "x-csrf-token": token,
                    "Cookie": cookies.join("; "),
                    "Content-Type": "application/json",
                    "sap-client": "800"
                }
            }
        );
 
        console.log("SAP Success");
 
        res.status(200).json({
            success: true
        });
 
    } catch (error) {
 
        console.log("SAP Error:");
        console.log(error.response?.data || error.message);
 
        res.status(500).json({
            success: false
        });
 
    }
 
});

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});