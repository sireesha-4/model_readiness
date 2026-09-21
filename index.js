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

// =====================================================
// AI ASSISTANT HELPERS
// =====================================================

function hasValue(value) {

    return (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    );
}

function sapStatus(value) {

    return (
        String(value || "")
            .toUpperCase() === "X"
    )
        ? "Configured"
        : "Not Configured";
}

function isValidModelQuestion(question) {

    const q =
        String(question || "")
            .toLowerCase()
            .trim();

    /* Words/topics that your current
    read-only assistant understands */
    const validTerms = [

        // General
        "model",
        "material",
        "details",
        "detail",
        "information",
        "summary",
        "status",
        "configured",
        "configuration",
        "available",
        "missing",
        "ready",

        // Pricing
        "pricing",
        "price",
        "b1",
        "br pricing",
        "br price",

        // Warranty
        "warranty",
        "warranties",
        "standard warranty",
        "extended warranty",
        "brother care",

        // Compatibility / Programs
        "compatibility",
        "compatible",
        "program",
        "programs",
        "amazon dart",
        "amazondart",
        "br refresh",
        "brrefresh",
        "barracuda",
        "brother plus",
        "bplus",

        // Orders
        "order",
        "orders",
        "consumable",
        "drum",
        "waste toner",
        "belt",
        "belt unit",
        "claim",
        "claim order",

        // Material fields
        "ean",
        "upc",
        "cross plant",
        "distribution",
        "country"
    ];

    return validTerms.some(
        term => q.includes(term)
    );
}

function buildModelAnswer(
    question,
    data,
    model,
    country
) {

    const q = question
        .toLowerCase()
        .trim();

    // =========================================
    // SPECIFIC PRICING QUESTIONS
    // =========================================

    // BR Pricing only
    if (
        q.includes("br pricing") ||
        q.includes("br price")
    ) {

        return (
            `BR Pricing for model ${model} (${country}) is ` +
            `${sapStatus(data.BrpriceSetup)}.`
        );
    }

    // B1 Pricing only
    if (
        q.includes("b1 pricing") ||
        q.includes("b1 price")
    ) {

        return (
            `B1 Pricing for model ${model} (${country}) is ` +
            `${sapStatus(data.B1priceSetup)}.`
        );
    }

    // =========================================
    // SPECIFIC WARRANTY QUESTIONS
    // =========================================

    // Standard Warranty only
    if (
        q.includes("standard warranty")
    ) {

        let answer =
            `Standard Warranty for model ${model} (${country}) is ` +
            `${sapStatus(data.StandardWarranty)}.`;


        if (
            data.StandardWarranty === "X" &&
            hasValue(
                data.StandardwarrantyLength
            )
        ) {

            answer +=
                ` Duration: ${data.StandardwarrantyLength} ` +
                `${data.StandardwarrantyUnit || ""}.`;
        }

        return answer;
    }

    // Extended Warranty only
    if (
        q.includes("extended warranty")
    ) {

        let answer =
            `Extended Warranty for model ${model} (${country}) is ` +
            `${sapStatus(data.ExtendedWarranty)}.`;


        if (
            data.ExtendedWarranty === "X" &&
            hasValue(
                data.ExtendedwarrantyLength
            )
        ) {

            answer +=
                ` Duration: ${data.ExtendedwarrantyLength} ` +
                `${data.ExtendedwarrantyUnit || ""}.`;
        }


        return answer;
    }

    // Brother Care Warranty only
    if (
        q.includes("brother care")
    ) {

        let answer =
            `Brother Care Warranty for model ${model} (${country}) is ` +
            `${sapStatus(data.BrothercareWarranty)}.`;


        if (
            data.BrothercareWarranty === "X" &&
            hasValue(
                data.BrothercarewarrantyLength
            )
        ) {

            answer +=
                ` Duration: ${data.BrothercarewarrantyLength} ` +
                `${data.BrothercarewarrantyUnit || ""}.`;
        }

        return answer;
    }

    // Barracuda Warranty specifically
    if (
        q.includes("barracuda warranty")
    ) {

        return (
            `Barracuda Warranty for model ${model} (${country}) is ` +
            `${sapStatus(data.BarracudaWarranty)}.`
        );
    }

    // Brother Plus Warranty specifically
    if (
        q.includes("brother plus warranty")
    ) {

        return (
            `Brother Plus Warranty for model ${model} (${country}) is ` +
            `${sapStatus(data.BrotherplusWarranty)}.`
        );
    }

    // =========================================
    // SPECIFIC COMPATIBILITY QUESTIONS
    // =========================================
    // Amazon Dart only
    if (
        q.includes("amazon dart") ||
        q.includes("amazondart")
    ) {

        return (
            `Amazon Dart for model ${model} (${country}) is ` +
            `${sapStatus(data.Amazondart)}.`
        );
    }

    // BR Refresh only
    if (
        q.includes("br refresh") ||
        q.includes("brrefresh")
    ) {

        return (
            `BR Refresh for model ${model} (${country}) is ` +
            `${sapStatus(data.Brrefresh)}.`
        );
    }

    // Barracuda Program only
    if (
        q.includes("barracuda") &&
        !q.includes("warranty")
    ) {

        return (
            `Barracuda for model ${model} (${country}) is ` +
            `${sapStatus(data.Barracuda)}.`
        );
    }

    // Brother Plus Program only
    if (
        (
            q.includes("brother plus") ||
            q.includes("bplus")
        ) &&
        !q.includes("warranty")
    ) {

        return (
            `Brother Plus for model ${model} (${country}) is ` +
            `${sapStatus(data.Bplus)}.`
        );
    }

    // =========================================
    // SPECIFIC ORDER QUESTIONS
    // =========================================

    // Consumable only
    if (
        q.includes("consumable")
    ) {

        return (
            `Consumable Order for model ${model} (${country}) is ` +
            `${sapStatus(
                data.Consumable ||
                data.BackupOrder
            )}.`
        );
    }

    // Drum only
    if (
        q.includes("drum")
    ) {

        return (
            `Drum Order for model ${model} (${country}) is ` +
            `${sapStatus(data.DrumOrder)}.`
        );
    }

    // Waste Toner only
    if (
        q.includes("waste toner")
    ) {

        return (
            `Waste Toner for model ${model} (${country}) is ` +
            `${sapStatus(data.WasteToner)}.`
        );
    }

    // Belt Unit only
    if (
        q.includes("belt unit") ||
        q.includes("belt")
    ) {

        return (
            `Belt Unit for model ${model} (${country}) is ` +
            `${sapStatus(data.BeltUnit)}.`
        );
    }

    // Claim Order only
    if (
        q.includes("claim order") ||
        q.includes("claim")
    ) {

        return (
            `Claim Order for model ${model} (${country}) is ` +
            `${sapStatus(data.Claimorder)}.`
        );
    }

    // =========================================
    // SPECIFIC MATERIAL QUESTIONS
    // =========================================

    if (
        q.includes("ean") ||
        q.includes("upc")
    ) {

        return (
            `EAN / UPC for model ${model} (${country}) is ` +
            `${data.Ean11 || "not available in SAP"}.`
        );
    }

    if (
        q.includes("cross plant")
    ) {

        return (
            `Cross Plant Material status for model ${model} (${country}) is ` +
            `${data.CrossplantMaterial || "not available in SAP"}.`
        );
    }

    // =========================================
    // FULL PRICING QUESTION
    // =========================================

    if (
        q.includes("pricing") ||
        q.includes("price")
    ) {

        const lines = [
            `Pricing information for ${model} (${country}):`,
            `B1 Pricing: ${sapStatus(data.B1priceSetup)}`,
            `BR Pricing: ${sapStatus(data.BrpriceSetup)}`
        ];

        if (
            hasValue(data.Kbetr)
        ) {

            lines.push(
                `Price: ${data.Kbetr} ${data.Konwa || ""}`.trim()
            );
        }

        return lines.join("\n");
    }

    // =========================================
    // FULL WARRANTY QUESTION
    // =========================================

    if (
        q.includes("warranty") ||
        q.includes("warranties")
    ) {

        const lines = [
            `Warranty information for ${model} (${country}):`
        ];

        lines.push(
            `Standard Warranty: ${sapStatus(data.StandardWarranty)}`
        );

        if (
            data.StandardWarranty === "X" &&
            hasValue(
                data.StandardwarrantyLength
            )
        ) {

            lines.push(
                `Standard Duration: ${data.StandardwarrantyLength} ` +
                `${data.StandardwarrantyUnit || ""}`
            );
        }

        lines.push(
            `Extended Warranty: ${sapStatus(data.ExtendedWarranty)}`
        );

        if (
            data.ExtendedWarranty === "X" &&
            hasValue(
                data.ExtendedwarrantyLength
            )
        ) {

            lines.push(
                `Extended Duration: ${data.ExtendedwarrantyLength} ` +
                `${data.ExtendedwarrantyUnit || ""}`
            );
        }

        lines.push(
            `Brother Care: ${sapStatus(data.BrothercareWarranty)}`
        );

        lines.push(
            `Barracuda Warranty: ${sapStatus(data.BarracudaWarranty)}`
        );

        lines.push(
            `Brother Plus Warranty: ${sapStatus(data.BrotherplusWarranty)}`
        );

        return lines.join("\n");
    }

    // =========================================
    // FULL COMPATIBILITY QUESTION
    // =========================================

    if (
        q.includes("compatibility") ||
        q.includes("programs")
    ) {

        return [
            `Compatibility information for ${model} (${country}):`,
            `Amazon Dart: ${sapStatus(data.Amazondart)}`,
            `BR Refresh: ${sapStatus(data.Brrefresh)}`,
            `Barracuda: ${sapStatus(data.Barracuda)}`,
            `Brother Plus: ${sapStatus(data.Bplus)}`
        ].join("\n");
    }

    // =========================================
    // FULL ORDER TYPE QUESTION
    // =========================================

    if (
        q.includes("order types") ||
        q.includes("orders")
    ) {

        return [
            `Order configuration for ${model} (${country}):`,
            `Consumable Order: ${sapStatus(
                data.Consumable ||
                data.BackupOrder
            )}`,
            `Drum Order: ${sapStatus(data.DrumOrder)}`,
            `Waste Toner: ${sapStatus(data.WasteToner)}`,
            `Belt Unit: ${sapStatus(data.BeltUnit)}`,
            `Claim Order: ${sapStatus(data.Claimorder)}`
        ].join("\n");
    }

    // =========================================
    // GENERAL MODEL DETAILS
    // =========================================

    const lines = [
        `SAP model information for ${model} (${country}):`
    ];

    if (
        hasValue(data.Ean11)
    ) {

        lines.push(
            `EAN: ${data.Ean11}`
        );
    }


    if (
        hasValue(
            data.CrossplantMaterial
        )
    ) {

        lines.push(
            `Cross Plant Material: ${data.CrossplantMaterial}`
        );
    }

    lines.push(
        `B1 Pricing: ${sapStatus(data.B1priceSetup)}`
    );

    lines.push(
        `BR Pricing: ${sapStatus(data.BrpriceSetup)}`
    );

    lines.push(
        `Standard Warranty: ${sapStatus(data.StandardWarranty)}`
    );

    lines.push(
        `Amazon Dart: ${sapStatus(data.Amazondart)}`
    );

    lines.push(
        `BR Refresh: ${sapStatus(data.Brrefresh)}`
    );

    return lines.join("\n");
}

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
// =====================================================
// READ-ONLY AI CHAT API
// =====================================================

async function getModelFromSAP(
    model,
    country,
    sapAuth
) {

    const safeModel =
        String(model)
            .replace(/'/g, "''");

    const safeCountry =
        String(country)
            .replace(/'/g, "''");

    const requestedFields =
        `Matnr='${safeModel}',Country='${safeCountry}'`;

    const sapUrl =
        `${ODATA_URL}Model_detailsSet(${requestedFields})?$format=json`;

    console.log(
        "AI SAP REQUEST:",
        sapUrl
    );

    const response =
        await axios.get(
            sapUrl,
            {
                headers: {

                    Authorization:
                        sapAuth,

                    Accept:
                        "application/json",

                    "sap-client":
                        process.env.SAP_CLIENT ||
                        "800"
                }
            }
        );

    return (
        response.data?.d ||
        response.data
    );
}

const AI_SYSTEM_PROMPT = `
You are the Model Readiness AI Assistant.

Your purpose is to answer questions about Brother model readiness
using SAP data supplied by the application.

RULES:

1. You are READ ONLY.

2. Never create, update, modify, delete, or change SAP data.

3. Answer model-related questions only from the SAP context
provided to you.

4. Never invent model information.

5. Never guess missing SAP fields.

6. If information is missing, clearly say:
   "This information was not found in SAP."

7. SAP value "X" means:
   Configured / Enabled / Available.

8. A blank SAP indicator means:
   Not Configured.

9. Explain SAP information using business-friendly wording.

10. Do not expose internal SAP technical details unless the user
explicitly asks for them.

11. Keep answers concise unless the user asks for details.

12. If the user asks whether a model is ready, analyze the available
material, pricing, warranty, compatibility, and order information.

13. If the question cannot be answered from the supplied SAP data,
say that clearly.

14. Never claim that SAP was updated.

15. Never execute write operations.
`;

// =====================================================
// RESET AI CONVERSATION
// =====================================================

app.post(
    "/api/ai/reset",
    (req, res) => {

        // User must still be logged in
        if (!req.session.sapAuth) {

            return res
                .status(401)
                .json({

                    success: false,

                    message:
                        "Please sign in first."
                });
        }

        // Clear only AI conversation memory
        req.session.aiContext = {
            model: "",
            country: ""
        };

        console.log(
            "AI conversation memory cleared"
        );

        return res.json({

            success: true,

            message:
                "New conversation started."
        });
    }
);

app.post(
    "/api/ai/chat",
    async (req, res) => {

        try {

            // ---------------------------------
            // Verify SAP login/session
            // ---------------------------------

            if (!req.session.sapAuth) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            "Please sign in before using the assistant."
                    });
            }

            const question =
                String(
                    req.body.question || ""
                ).trim();

            if (!question) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Please enter a question."
                    });
            }

// ---------------------------------
// Validate Model-related Question
// ---------------------------------

if (!isValidModelQuestion(question)) {

    return res.json({

        success: true,

        answer:
            "I couldn't understand that as a model-related question.\n\n" +

            "I can help with SAP model information such as:\n" +

            "• Model details\n" +
            "• Pricing\n" +
            "• Warranty\n" +
            "• Compatibility and programs\n" +
            "• Order types\n" +
            "• EAN / UPC\n" +
            "• Model readiness\n\n" +

            "Please rephrase the question and try again."
    });
}

            console.log(
                "================================"
            );

            console.log(
                "AI QUESTION:"
            );

            console.log(
                question
            );

            // ---------------------------------
            // READ-ONLY PROTECTION
            // ---------------------------------

            const lowerQuestion =
                question.toLowerCase();

            const blockedActions = [
                "create",
                "delete",
                "update",
                "change",
                "modify",
                "remove"
            ];

            const wantsWrite =
                blockedActions.some(
                    action =>
                        lowerQuestion.includes(
                            action
                        )
                );

            if (wantsWrite) {

                return res.json({

                    success: true,

                    answer:
                        "The Model Readiness Assistant is currently read-only. I can retrieve and explain SAP model information, but I cannot create, change, update, or delete SAP records."
                });
            }

// =========================================
// CONVERSATION MEMORY
// =========================================

if (!req.session.aiContext) {

    req.session.aiContext = {
        model: "",
        country: ""
    };
}

// =========================================
// MODEL EXTRACTION
// =========================================

let model =
    req.session.aiContext.model || "";

let modelWasProvided = false;

/*
Supported examples:

Show model DCPL2550DW US

Show details for model DCPL2550DW US

Material DCPL2550DW US

Model number DCPL2550DW

Material number DCPL2550DW


Important:

"Does this model have BR pricing?"

must NOT interpret "have" as model number.
*/

const modelPatterns = [

    // Model number DCPL2550DW
    /\bmodel\s+number\s*[:#-]?\s*([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)/i,

    // Material number DCPL2550DW
    /\bmaterial\s+number\s*[:#-]?\s*([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)/i,

    // Model: DCPL2550DW
    /\bmodel\s*[:#]\s*([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)/i,

    // Material: DCPL2550DW
    /\bmaterial\s*[:#]\s*([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)/i,

    // Model DCPL2550DW
    /\bmodel\s+([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)/i,

    // Material DCPL2550DW
    /\bmaterial\s+([A-Za-z0-9_-]*\d[A-Za-z0-9_-]*)/i
];

for (const pattern of modelPatterns) {

    const match =
        question.match(pattern);

    if (match) {

        const newModel =
            match[1];

        const previousModel =
            req.session.aiContext.model;

        model =
            newModel;


        /*
        If user explicitly changes to
        another model, reset the old
        country.

        Example:

        Previous:
        DCPL2550DW US

        New:
        model MFCJ1010DW

        Country must be supplied again.
        */

        if (
            previousModel &&
            previousModel.toUpperCase() !==
            newModel.toUpperCase()
        ) {

            req.session.aiContext.country =
                "";
        }

        req.session.aiContext.model =
            newModel;

        modelWasProvided =
            true;

        break;
    }
}

// =========================================
// COUNTRY EXTRACTION
// =========================================

let country =
    req.session.aiContext.country || "";

let countryWasProvided =
    false;

const countryMatch =
    question.match(
        /\b(US|CA|UK|JP)\b/i
    );

if (countryMatch) {

    country =
        countryMatch[1]
            .toUpperCase();

    req.session.aiContext.country =
        country;

    countryWasProvided =
        true;
}

// =========================================
// SAVE FINAL CONVERSATION CONTEXT
// =========================================

if (model) {

    req.session.aiContext.model =
        model;
}

if (country) {

    req.session.aiContext.country =
        country;
}

// =========================================
// VALIDATE MODEL + COUNTRY
// =========================================

if (!model && !country) {

    return res.json({

        success: true,

        answer:
            "I can help with that.\n\n" +

            "Please provide the Model Number " +
            "and Country first.\n\n" +

            "For example:\n" +

            "\"Show details for model " +
            "DCPL2550DW US.\"\n\n" +

            "After that, you can ask follow-up " +
            "questions without repeating the " +
            "Model Number and Country."
    });
}

if (!model) {

    return res.json({

        success: true,

        answer:
            `I know the country is ${country}, ` +
            `but I still need the Model Number.`
    });
}

if (!country) {

    return res.json({

        success: true,

        answer:
            `I found model ${model}, ` +
            `but I need the Country before ` +
            `I can retrieve the correct SAP configuration.\n\n` +

            `For example:\n` +
            `"Show details for model ${model} US."`
    });
}

// =========================================
// DEBUG CONVERSATION MEMORY
// =========================================

console.log(
    "AI CONVERSATION CONTEXT:",
    {
        model: model,
        country: country,
        modelWasProvided: modelWasProvided,
        countryWasProvided: countryWasProvided
    }
);

            // ---------------------------------
            // Escape OData strings
            // ---------------------------------

            const safeModel =
                model.replace(
                    /'/g,
                    "''"
                );

            const safeCountry =
                country.replace(
                    /'/g,
                    "''"
                );

            // ---------------------------------
            // Build SAP OData URL
            // ---------------------------------

            const requestedFields =
                `Matnr='${safeModel}',Country='${safeCountry}'`;

            const sapUrl =
                `${ODATA_URL}Model_detailsSet(${requestedFields})?$format=json`;

            console.log(
                "AI SAP REQUEST:"
            );

            console.log(
                sapUrl
            );

            // ---------------------------------
            // SAP READ
            // ---------------------------------

            const sapResponse =
                await axios.get(
                    sapUrl,
                    {
                        headers: {

                            Authorization:
                                req.session.sapAuth,

                            Accept:
                                "application/json",

                            "sap-client":
                                process.env.SAP_CLIENT ||
                                "800"
                        }
                    }
                );

            const sapData =
                sapResponse.data?.d ||
                sapResponse.data;

            console.log(
                "AI SAP RESPONSE:"
            );

            console.log(
                JSON.stringify(
                    sapData,
                    null,
                    2
                )
            );

            if (!sapData) {

                return res.json({

                    success: true,

                    answer:
                        `No SAP data was found for model ${model} and country ${country}.`
                });
            }

            // ---------------------------------
            // Build grounded answer
            // ---------------------------------

            const answer =
                buildModelAnswer(
                    question,
                    sapData,
                    model,
                    country
                );

            // ---------------------------------
            // Return to dashboard
            // ---------------------------------

            return res.json({

                success: true,

                answer: answer,

                source: "SAP",

                model: model,

                country: country
            });

        }
        catch (error) {

            console.error(
                "AI ASSISTANT ERROR:"
            );


            console.error(
                error.response?.data ||
                error.message
            );


            if (error.response?.status === 404) {

    return res
        .status(404)
        .json({

            success: false,

            message:
                "I couldn't find that Model and Country combination in SAP.\n\n" +
                "Please verify the Model Number and Country and try again."
        });
}

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            "SAP authorization failed. Please sign in again."
                    });
            }

            return res
                .status(500)
                .json({

                    success: false,

                    message:
                        "Unable to retrieve model information from SAP."
                });
        }
    }
);

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});