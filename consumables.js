function getConsumableValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}


function setConsumableText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent =
        value || "-";
}


function showConsumableMessage(
    message,
    type
) {

    const messageBox =
        document.getElementById(
            "consumableMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent =
        message;

    messageBox.className =
        "consumable-message " +
        type;
}


function hideConsumableMessage() {

    const messageBox =
        document.getElementById(
            "consumableMessage"
        );

    if (!messageBox) {
        return;
    }

    messageBox.textContent = "";

    messageBox.className =
        "consumable-message";
}


function hideConsumableResult() {

    const resultSection =
        document.getElementById(
            "consumableResult"
        );

    const initialMessage =
        document.getElementById(
            "pricingInitialMessage"
        );

    const pricingData =
        document.getElementById(
            "pricingData"
        );


    if (resultSection) {

        resultSection.style.display =
            "grid";
    }


    if (pricingData) {

        pricingData.style.display =
            "none";
    }


    if (initialMessage) {

        initialMessage.style.display =
            "flex";
    }


    setConsumableText(
        "productConsumable",
        "Brother Consumable"
    );


    setConsumableText(
        "productType",
        "Toner Cartridge"
    );


    setConsumableText(
        "productDescription",
        "Reliable consumable for consistent print quality."
    );
}


async function searchConsumable() {

    const consumable =
        getConsumableValue(
            "consumableSearch"
        );

    const country =
        getConsumableValue(
            "consumableCountry"
        );

    const program =
        getConsumableValue(
            "consumableProgram"
        );


    hideConsumableMessage();


    if (!consumable) {

        showConsumableMessage(
            "Please enter a Consumable.",
            "error"
        );

        return;
    }


    if (!country) {

        showConsumableMessage(
            "Please select a Country.",
            "error"
        );

        return;
    }


    if (!program) {

        showConsumableMessage(
            "Please select a Program.",
            "error"
        );

        return;
    }


    showConsumableMessage(
        "Searching SAP pricing information...",
        "loading"
    );


    try {

        const url =
            "/api/consumable/pricing" +
            "?consumable=" +
            encodeURIComponent(
                consumable
            ) +
            "&country=" +
            encodeURIComponent(
                country
            ) +
            "&program=" +
            encodeURIComponent(
                program
            );


        console.log(
            "Calling Consumable API:",
            url
        );


        const response =
            await fetch(url);


        const result =
            await response.json();


        console.log(
            "Consumable API Response:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to retrieve pricing"
            );
        }


        const sap =
            result.pricing || {};


        const resultData = {

            consumable:
                result.consumable ||
                consumable,

            country:
                result.country ||
                country,

            program:
                result.program ||
                program,

            conditionType:
                sap.Kschl || "-",

            salesOrg:
                sap.Vkorg || "-",

            distribution:
                sap.Vtweg || "-",

            division:
                sap.Spart || "-",

            price:
                formatConsumablePrice(
                    sap.Kbetr,
                    sap.Konwa
                ),

            pricingUnit:
                sap.Kpein || "-",

            unitOfMeasure:
                sap.Kmein || "-",

            validFrom:
                formatConsumableDate(
                    sap.Datab
                ),

            validTo:
                formatConsumableDate(
                    sap.Datbi
                ),

            type:
                "Toner Cartridge",

            description:
                "Brother consumable product"
        };


        hideConsumableMessage();


        showConsumableResult(
            resultData
        );

    } catch (error) {

        console.error(
            "Consumable Search Error:",
            error
        );


        hideConsumableResult();


        showConsumableMessage(
            error.message ||
            "Unable to retrieve pricing information.",
            "error"
        );
    }
}


function formatConsumablePrice(
    amount,
    currency
) {

    if (
        amount === undefined ||
        amount === null ||
        amount === ""
    ) {

        return "-";
    }


    const amountText =
        String(amount);

    const currencyText =
        currency || "";


    if (currencyText) {

        return (
            amountText +
            " " +
            currencyText
        );
    }


    return amountText;
}


function formatConsumableDate(value) {

    if (!value) {
        return "-";
    }


    if (
        typeof value === "string" &&
        value.startsWith("/Date(")
    ) {

        const match =
            value.match(
                /\/Date\((-?\d+)\)\//
            );


        if (
            match &&
            match[1]
        ) {

            const date =
                new Date(
                    Number(match[1])
                );


            if (
                !Number.isNaN(
                    date.getTime()
                )
            ) {

                const year =
                    date.getUTCFullYear();

                const month =
                    String(
                        date.getUTCMonth() + 1
                    ).padStart(
                        2,
                        "0"
                    );

                const day =
                    String(
                        date.getUTCDate()
                    ).padStart(
                        2,
                        "0"
                    );


                return (
                    year +
                    "-" +
                    month +
                    "-" +
                    day
                );
            }
        }
    }


    return String(value);
}


function showConsumableResult(data) {

    const resultSection =
        document.getElementById(
            "consumableResult"
        );

    const initialMessage =
        document.getElementById(
            "pricingInitialMessage"
        );

    const pricingData =
        document.getElementById(
            "pricingData"
        );


    if (resultSection) {

        resultSection.style.display =
            "grid";
    }


    if (initialMessage) {

        initialMessage.style.display =
            "none";
    }


    if (pricingData) {

        pricingData.style.display =
            "block";
    }


    setConsumableText(
        "productConsumable",
        data.consumable
    );


    setConsumableText(
        "productType",
        data.type
    );


    setConsumableText(
        "productDescription",
        data.description
    );


    setConsumableText(
        "pricingConsumable",
        data.consumable
    );


    setConsumableText(
        "pricingCountry",
        data.country
    );


    setConsumableText(
        "pricingProgram",
        data.program
    );


    setConsumableText(
        "pricingConditionType",
        data.conditionType
    );


    setConsumableText(
        "pricingSalesOrg",
        data.salesOrg
    );


    setConsumableText(
        "pricingDistribution",
        data.distribution
    );


    setConsumableText(
        "pricingDivision",
        data.division
    );


    setConsumableText(
        "pricingPrice",
        data.price
    );


    setConsumableText(
        "pricingUnit",
        data.pricingUnit
    );


    setConsumableText(
        "pricingUom",
        data.unitOfMeasure
    );


    setConsumableText(
        "pricingValidFrom",
        data.validFrom
    );


    setConsumableText(
        "pricingValidTo",
        data.validTo
    );
}


function resetConsumableSearch() {

    const consumable =
        document.getElementById(
            "consumableSearch"
        );

    const country =
        document.getElementById(
            "consumableCountry"
        );

    const program =
        document.getElementById(
            "consumableProgram"
        );


    if (consumable) {
        consumable.value = "";
    }


    if (country) {
        country.value = "";
    }


    if (program) {
        program.value = "";
    }


    hideConsumableMessage();

    hideConsumableResult();


    if (consumable) {
        consumable.focus();
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const consumable =
            document.getElementById(
                "consumableSearch"
            );

        if (!consumable) {
            return;
        }


        consumable.addEventListener(
            "input",
            function () {

                consumable.value =
                    consumable.value.toUpperCase();
            }
        );


        consumable.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchConsumable();
                }
            }
        );
    }
);