const express = require("express");
const axios = require("axios");

const router = express.Router();


// =====================================================
// CREATE AI ROUTER
// =====================================================

module.exports = function createAIRouter(options) {

    const ODATA_URL =
        options.ODATA_URL;

    const SAP_CLIENT =
        options.SAP_CLIENT || "800";


    // =================================================
    // BASIC HELPERS
    // =================================================

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


    // =================================================
    // VALID MODEL QUESTION
    // =================================================

    function isValidModelQuestion(question) {

        const q =
            String(question || "")
                .toLowerCase()
                .trim();


        const validTerms = [

            "model",
            "models",
            "material",

            "detail",
            "details",
            "information",
            "summary",

            "compare",
            "comparison",

            "status",
            "configured",
            "configuration",
            "available",
            "missing",
            "ready",

            "pricing",
            "price",
            "b1",
            "br pricing",
            "br price",

            "warranty",
            "warranties",
            "standard warranty",
            "extended warranty",
            "brother care",

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

            "order",
            "orders",

            "consumable",
            "drum",
            "waste toner",

            "belt",
            "belt unit",

            "claim",
            "claim order",

            "ean",
            "upc",

            "cross plant",
            "distribution",

            "country"
        ];


        return validTerms.some(
            term =>
                q.includes(term)
        );
    }


    // =================================================
    // MODEL NUMBER EXTRACTION
    // =================================================

    function extractModelNumbers(question) {

        const text =
            String(question || "")
                .toUpperCase();


        const matches =
            text.match(
                /\b[A-Z][A-Z0-9_-]*\d[A-Z0-9_-]*\b/g
            ) || [];


        const ignoredValues =
            new Set([
                "B1",
                "BR1"
            ]);


        const models = [];


        for (const value of matches) {

            if (
                ignoredValues.has(value)
            ) {

                continue;
            }


            if (
                !models.includes(value)
            ) {

                models.push(value);
            }
        }


        return models;
    }


    // =================================================
    // SINGLE SAP MODEL READ
    // =================================================

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
            model,
            country
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
                            SAP_CLIENT
                    }
                }
            );


        return (
            response.data?.d ||
            response.data
        );
    }


    // =================================================
    // MULTIPLE SAP MODEL READ
    // =================================================

    async function getMultipleModelsFromSAP(
        models,
        country,
        sapAuth
    ) {

        const results = [];


        for (const model of models) {

            try {

                const data =
                    await getModelFromSAP(
                        model,
                        country,
                        sapAuth
                    );


                results.push({

                    found: true,

                    model:
                        model,

                    data:
                        data
                });

            }
            catch (error) {

                if (
                    error.response?.status === 404
                ) {

                    results.push({

                        found: false,

                        model:
                            model,

                        data:
                            null
                    });


                    continue;
                }


                throw error;
            }
        }


        return results;
    }


    // =================================================
    // SINGLE MODEL ANSWER
    // =================================================

    function buildModelAnswer(
        question,
        data,
        model,
        country
    ) {

        const q =
            String(question || "")
                .toLowerCase()
                .trim();


        // BR Pricing

        if (
            q.includes("br pricing") ||
            q.includes("br price")
        ) {

            return (
                `BR Pricing for model ${model} (${country}) is ` +
                `${sapStatus(data.BrpriceSetup)}.`
            );
        }


        // B1 Pricing

        if (
            q.includes("b1 pricing") ||
            q.includes("b1 price")
        ) {

            return (
                `B1 Pricing for model ${model} (${country}) is ` +
                `${sapStatus(data.B1priceSetup)}.`
            );
        }


        // Standard Warranty

        if (
            q.includes(
                "standard warranty"
            )
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
                    ` Duration: ` +
                    `${data.StandardwarrantyLength} ` +
                    `${data.StandardwarrantyUnit || ""}.`;
            }


            return answer;
        }


        // Extended Warranty

        if (
            q.includes(
                "extended warranty"
            )
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
                    ` Duration: ` +
                    `${data.ExtendedwarrantyLength} ` +
                    `${data.ExtendedwarrantyUnit || ""}.`;
            }


            return answer;
        }


        // Brother Care

        if (
            q.includes(
                "brother care"
            )
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
                    ` Duration: ` +
                    `${data.BrothercarewarrantyLength} ` +
                    `${data.BrothercarewarrantyUnit || ""}.`;
            }


            return answer;
        }


        // Barracuda Warranty

        if (
            q.includes(
                "barracuda warranty"
            )
        ) {

            return (
                `Barracuda Warranty for model ${model} (${country}) is ` +
                `${sapStatus(data.BarracudaWarranty)}.`
            );
        }


        // Brother Plus Warranty

        if (
            q.includes(
                "brother plus warranty"
            )
        ) {

            return (
                `Brother Plus Warranty for model ${model} (${country}) is ` +
                `${sapStatus(data.BrotherplusWarranty)}.`
            );
        }


        // Amazon Dart

        if (
            q.includes("amazon dart") ||
            q.includes("amazondart")
        ) {

            return (
                `Amazon Dart for model ${model} (${country}) is ` +
                `${sapStatus(data.Amazondart)}.`
            );
        }


        // BR Refresh

        if (
            q.includes("br refresh") ||
            q.includes("brrefresh")
        ) {

            return (
                `BR Refresh for model ${model} (${country}) is ` +
                `${sapStatus(data.Brrefresh)}.`
            );
        }


        // Barracuda Program

        if (
            q.includes("barracuda") &&
            !q.includes("warranty")
        ) {

            return (
                `Barracuda for model ${model} (${country}) is ` +
                `${sapStatus(data.Barracuda)}.`
            );
        }


        // Brother Plus Program

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


        // Consumable

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


        // Drum

        if (
            q.includes("drum")
        ) {

            return (
                `Drum Order for model ${model} (${country}) is ` +
                `${sapStatus(data.DrumOrder)}.`
            );
        }


        // Waste Toner

        if (
            q.includes("waste toner")
        ) {

            return (
                `Waste Toner for model ${model} (${country}) is ` +
                `${sapStatus(data.WasteToner)}.`
            );
        }


        // Belt

        if (
            q.includes("belt")
        ) {

            return (
                `Belt Unit for model ${model} (${country}) is ` +
                `${sapStatus(data.BeltUnit)}.`
            );
        }


        // Claim

        if (
            q.includes("claim")
        ) {

            return (
                `Claim Order for model ${model} (${country}) is ` +
                `${sapStatus(data.Claimorder)}.`
            );
        }


        // EAN / UPC

        if (
            q.includes("ean") ||
            q.includes("upc")
        ) {

            return (
                `EAN / UPC for model ${model} (${country}) is ` +
                `${data.Ean11 || "not available in SAP"}.`
            );
        }


        // Cross Plant

        if (
            q.includes("cross plant")
        ) {

            return (
                `Cross Plant Material for model ${model} (${country}) is ` +
                `${data.CrossplantMaterial || "not available in SAP"}.`
            );
        }


        // Full Pricing

        if (
            q.includes("pricing") ||
            q.includes("price")
        ) {

            return [

                `Pricing information for ${model} (${country}):`,

                `B1 Pricing: ${
                    sapStatus(
                        data.B1priceSetup
                    )
                }`,

                `BR Pricing: ${
                    sapStatus(
                        data.BrpriceSetup
                    )
                }`

            ].join("\n");
        }


        // Full Warranty

        if (
            q.includes("warranty") ||
            q.includes("warranties")
        ) {

            return [

                `Warranty information for ${model} (${country}):`,

                `Standard Warranty: ${
                    sapStatus(
                        data.StandardWarranty
                    )
                }`,

                `Extended Warranty: ${
                    sapStatus(
                        data.ExtendedWarranty
                    )
                }`,

                `Brother Care: ${
                    sapStatus(
                        data.BrothercareWarranty
                    )
                }`,

                `Barracuda Warranty: ${
                    sapStatus(
                        data.BarracudaWarranty
                    )
                }`,

                `Brother Plus Warranty: ${
                    sapStatus(
                        data.BrotherplusWarranty
                    )
                }`

            ].join("\n");
        }


        // Compatibility

        if (
            q.includes("compatibility") ||
            q.includes("program")
        ) {

            return [

                `Compatibility for ${model} (${country}):`,

                `Amazon Dart: ${
                    sapStatus(
                        data.Amazondart
                    )
                }`,

                `BR Refresh: ${
                    sapStatus(
                        data.Brrefresh
                    )
                }`,

                `Barracuda: ${
                    sapStatus(
                        data.Barracuda
                    )
                }`,

                `Brother Plus: ${
                    sapStatus(
                        data.Bplus
                    )
                }`

            ].join("\n");
        }


        // Orders

        if (
            q.includes("order")
        ) {

            return [

                `Order configuration for ${model} (${country}):`,

                `Consumable Order: ${
                    sapStatus(
                        data.Consumable ||
                        data.BackupOrder
                    )
                }`,

                `Drum Order: ${
                    sapStatus(
                        data.DrumOrder
                    )
                }`,

                `Waste Toner: ${
                    sapStatus(
                        data.WasteToner
                    )
                }`,

                `Belt Unit: ${
                    sapStatus(
                        data.BeltUnit
                    )
                }`,

                `Claim Order: ${
                    sapStatus(
                        data.Claimorder
                    )
                }`

            ].join("\n");
        }


        // Summary

        if (
            q.includes("detail") ||
            q.includes("summary") ||
            q.includes("information") ||
            q.includes("model")
        ) {

            return [

                `SAP model information for ${model} (${country}):`,

                `EAN: ${
                    data.Ean11 ||
                    "Not available"
                }`,

                `B1 Pricing: ${
                    sapStatus(
                        data.B1priceSetup
                    )
                }`,

                `BR Pricing: ${
                    sapStatus(
                        data.BrpriceSetup
                    )
                }`,

                `Standard Warranty: ${
                    sapStatus(
                        data.StandardWarranty
                    )
                }`,

                `Amazon Dart: ${
                    sapStatus(
                        data.Amazondart
                    )
                }`,

                `BR Refresh: ${
                    sapStatus(
                        data.Brrefresh
                    )
                }`

            ].join("\n");
        }


        return (
            `I found model ${model} (${country}) in SAP, ` +
            `but I could not identify the specific information ` +
            `requested in your question. Please rephrase the question.`
        );
    }


    // =================================================
    // MULTIPLE MODEL ANSWER
    // =================================================

    function buildMultipleModelAnswer(
        question,
        modelResults,
        country
    ) {

        const q =
            String(question || "")
                .toLowerCase()
                .trim();


        const lines = [];


        for (const item of modelResults) {

            if (!item.found) {

                lines.push(
                    `${item.model} (${country}): Not found in SAP.`
                );

                continue;
            }


            const model =
                item.model;


            const data =
                item.data;


            // BR Pricing

            if (
                q.includes("br pricing") ||
                q.includes("br price")
            ) {

                lines.push(
                    `${model}: BR Pricing - ` +
                    `${sapStatus(
                        data.BrpriceSetup
                    )}`
                );

                continue;
            }


            // B1 Pricing

            if (
                q.includes("b1 pricing") ||
                q.includes("b1 price")
            ) {

                lines.push(
                    `${model}: B1 Pricing - ` +
                    `${sapStatus(
                        data.B1priceSetup
                    )}`
                );

                continue;
            }


            // Amazon Dart

            if (
                q.includes("amazon dart") ||
                q.includes("amazondart")
            ) {

                lines.push(
                    `${model}: Amazon Dart - ` +
                    `${sapStatus(
                        data.Amazondart
                    )}`
                );

                continue;
            }


            // BR Refresh

            if (
                q.includes("br refresh") ||
                q.includes("brrefresh")
            ) {

                lines.push(
                    `${model}: BR Refresh - ` +
                    `${sapStatus(
                        data.Brrefresh
                    )}`
                );

                continue;
            }


            // Standard Warranty

            if (
                q.includes(
                    "standard warranty"
                )
            ) {

                let value =
                    `${model}: Standard Warranty - ` +
                    `${sapStatus(
                        data.StandardWarranty
                    )}`;


                if (
                    data.StandardWarranty === "X" &&
                    hasValue(
                        data.StandardwarrantyLength
                    )
                ) {

                    value +=
                        ` (${data.StandardwarrantyLength} ` +
                        `${data.StandardwarrantyUnit || ""})`;
                }


                lines.push(value);

                continue;
            }


            // Extended Warranty

            if (
                q.includes(
                    "extended warranty"
                )
            ) {

                let value =
                    `${model}: Extended Warranty - ` +
                    `${sapStatus(
                        data.ExtendedWarranty
                    )}`;


                if (
                    data.ExtendedWarranty === "X" &&
                    hasValue(
                        data.ExtendedwarrantyLength
                    )
                ) {

                    value +=
                        ` (${data.ExtendedwarrantyLength} ` +
                        `${data.ExtendedwarrantyUnit || ""})`;
                }


                lines.push(value);

                continue;
            }


            // Drum

            if (
                q.includes("drum")
            ) {

                lines.push(
                    `${model}: Drum Order - ` +
                    `${sapStatus(
                        data.DrumOrder
                    )}`
                );

                continue;
            }


            // Waste toner

            if (
                q.includes("waste toner")
            ) {

                lines.push(
                    `${model}: Waste Toner - ` +
                    `${sapStatus(
                        data.WasteToner
                    )}`
                );

                continue;
            }


            // Claim

            if (
                q.includes("claim")
            ) {

                lines.push(
                    `${model}: Claim Order - ` +
                    `${sapStatus(
                        data.Claimorder
                    )}`
                );

                continue;
            }


            // Full Pricing

            if (
                q.includes("pricing") ||
                q.includes("price")
            ) {

                lines.push(

                    `${model}:\n` +

                    `B1 Pricing: ${
                        sapStatus(
                            data.B1priceSetup
                        )
                    }\n` +

                    `BR Pricing: ${
                        sapStatus(
                            data.BrpriceSetup
                        )
                    }`
                );

                continue;
            }


            // Full Warranty

            if (
                q.includes("warranty") ||
                q.includes("warranties")
            ) {

                lines.push(

                    `${model}:\n` +

                    `Standard Warranty: ${
                        sapStatus(
                            data.StandardWarranty
                        )
                    }\n` +

                    `Extended Warranty: ${
                        sapStatus(
                            data.ExtendedWarranty
                        )
                    }\n` +

                    `Brother Care: ${
                        sapStatus(
                            data.BrothercareWarranty
                        )
                    }\n` +

                    `Barracuda Warranty: ${
                        sapStatus(
                            data.BarracudaWarranty
                        )
                    }\n` +

                    `Brother Plus Warranty: ${
                        sapStatus(
                            data.BrotherplusWarranty
                        )
                    }`
                );

                continue;
            }


            // Compatibility

            if (
                q.includes("compatibility") ||
                q.includes("program")
            ) {

                lines.push(

                    `${model}:\n` +

                    `Amazon Dart: ${
                        sapStatus(
                            data.Amazondart
                        )
                    }\n` +

                    `BR Refresh: ${
                        sapStatus(
                            data.Brrefresh
                        )
                    }\n` +

                    `Barracuda: ${
                        sapStatus(
                            data.Barracuda
                        )
                    }\n` +

                    `Brother Plus: ${
                        sapStatus(
                            data.Bplus
                        )
                    }`
                );

                continue;
            }


            // General comparison

            lines.push(

                `${model}:\n` +

                `EAN: ${
                    data.Ean11 ||
                    "Not available"
                }\n` +

                `B1 Pricing: ${
                    sapStatus(
                        data.B1priceSetup
                    )
                }\n` +

                `BR Pricing: ${
                    sapStatus(
                        data.BrpriceSetup
                    )
                }\n` +

                `Standard Warranty: ${
                    sapStatus(
                        data.StandardWarranty
                    )
                }\n` +

                `Amazon Dart: ${
                    sapStatus(
                        data.Amazondart
                    )
                }\n` +

                `BR Refresh: ${
                    sapStatus(
                        data.Brrefresh
                    )
                }`
            );
        }


        return (
            `SAP comparison for ${country}:\n\n` +
            lines.join("\n\n")
        );
    }


    // =================================================
    // RESET AI CONVERSATION
    // =================================================

    router.post(
        "/reset",
        (req, res) => {

            if (!req.session.sapAuth) {

                return res
                    .status(401)
                    .json({

                        success: false,

                        message:
                            "Please sign in first."
                    });
            }


            req.session.aiContext = {

                model:
                    "",

                models:
                    [],

                country:
                    ""
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


    // =================================================
    // AI CHAT
    // =================================================

    router.post(
        "/chat",
        async (req, res) => {

            try {

                // ---------------------------------
                // Authentication
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


                // ---------------------------------
                // User Question
                // ---------------------------------

                const question =
                    String(
                        req.body.question ||
                        ""
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


                console.log(
                    "================================"
                );


                console.log(
                    "AI QUESTION:",
                    question
                );


                // ---------------------------------
                // Detect models
                // ---------------------------------

                const detectedModels =
                    extractModelNumbers(
                        question
                    );


                console.log(
                    "AI MODELS DETECTED:",
                    detectedModels
                );


                // ---------------------------------
                // Validate
                // ---------------------------------

                if (
                    !isValidModelQuestion(
                        question
                    ) &&
                    detectedModels.length === 0
                ) {

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
                            "• Model readiness\n" +
                            "• Multiple model comparison\n\n" +

                            "Please rephrase the question and try again."
                    });
                }


                // ---------------------------------
                // Read-only protection
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
                            "The Model Readiness Assistant is currently read-only. " +
                            "I can retrieve and explain SAP model information, " +
                            "but I cannot create, change, update, or delete SAP records."
                    });
                }


                // ---------------------------------
                // Initialize memory
                // ---------------------------------

                if (!req.session.aiContext) {

                    req.session.aiContext = {

                        model:
                            "",

                        models:
                            [],

                        country:
                            ""
                    };
                }


                // ---------------------------------
                // Country
                // ---------------------------------

                let country =
                    req.session.aiContext.country ||
                    "";


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
                }


                // =================================
                // MULTIPLE MODEL MODE
                // =================================

                if (
                    detectedModels.length >= 2
                ) {

                    if (!country) {

                        return res.json({

                            success: true,

                            answer:
                                "I found multiple model numbers, but I need the Country " +
                                "before I can retrieve the SAP records."
                        });
                    }


                    const results =
                        await getMultipleModelsFromSAP(

                            detectedModels,

                            country,

                            req.session.sapAuth
                        );


                    req.session.aiContext.models =
                        detectedModels;


                    req.session.aiContext.model =
                        "";


                    req.session.aiContext.country =
                        country;


                    const answer =
                        buildMultipleModelAnswer(

                            question,

                            results,

                            country
                        );


                    return res.json({

                        success: true,

                        answer:
                            answer,

                        source:
                            "SAP",

                        mode:
                            "MULTIPLE_MODELS",

                        models:
                            detectedModels,

                        country:
                            country
                    });
                }


                // =================================
                // MULTIPLE MODEL FOLLOW-UP
                // =================================

                if (
                    detectedModels.length === 0 &&
                    Array.isArray(
                        req.session.aiContext.models
                    ) &&
                    req.session.aiContext.models.length >= 2
                ) {

                    const models =
                        req.session.aiContext.models;


                    if (!country) {

                        return res.json({

                            success: true,

                            answer:
                                "I remember the models being compared, " +
                                "but I need the Country to continue."
                        });
                    }


                    const results =
                        await getMultipleModelsFromSAP(

                            models,

                            country,

                            req.session.sapAuth
                        );


                    const answer =
                        buildMultipleModelAnswer(

                            question,

                            results,

                            country
                        );


                    return res.json({

                        success: true,

                        answer:
                            answer,

                        source:
                            "SAP",

                        mode:
                            "MULTIPLE_MODELS",

                        models:
                            models,

                        country:
                            country
                    });
                }


                // =================================
                // SINGLE MODEL MODE
                // =================================

                let model =
                    req.session.aiContext.model ||
                    "";


                if (
                    detectedModels.length === 1
                ) {

                    const newModel =
                        detectedModels[0];


                    const previousModel =
                        req.session.aiContext.model;


                    if (
                        previousModel &&
                        previousModel
                            .toUpperCase() !==
                        newModel
                            .toUpperCase() &&
                        !countryMatch
                    ) {

                        country =
                            "";


                        req.session.aiContext.country =
                            "";
                    }


                    model =
                        newModel;


                    req.session.aiContext.model =
                        model;


                    req.session.aiContext.models =
                        [];
                }


                // ---------------------------------
                // Validate context
                // ---------------------------------

                if (
                    !model &&
                    !country
                ) {

                    return res.json({

                        success: true,

                        answer:
                            "Please provide the Model Number and Country first.\n\n" +
                            "Example:\n" +
                            "\"Show details for model DCPL2550DW US.\""
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
                            `but I need the Country before I can retrieve ` +
                            `the SAP configuration.`
                    });
                }


                // ---------------------------------
                // Save Context
                // ---------------------------------

                req.session.aiContext.model =
                    model;


                req.session.aiContext.country =
                    country;


                req.session.aiContext.models =
                    [];


                // ---------------------------------
                // SAP Read
                // ---------------------------------

                const sapData =
                    await getModelFromSAP(

                        model,

                        country,

                        req.session.sapAuth
                    );


                // ---------------------------------
                // Answer
                // ---------------------------------

                const answer =
                    buildModelAnswer(

                        question,

                        sapData,

                        model,

                        country
                    );


                return res.json({

                    success: true,

                    answer:
                        answer,

                    source:
                        "SAP",

                    mode:
                        "SINGLE_MODEL",

                    model:
                        model,

                    country:
                        country
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


                if (
                    error.response?.status === 404
                ) {

                    return res
                        .status(404)
                        .json({

                            success: false,

                            message:
                                "I couldn't find that Model and Country combination in SAP."
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


    return router;
};