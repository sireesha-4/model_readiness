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
 
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
 
        element.textContent = "-";
 
        return;
    }

    if (
    element.tagName === "INPUT"
) {

    element.value =
        String(value);

} else {

    element.textContent =
        String(value);
}
 
    // element.textContent =
    //     String(value);
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
            "none";
    }
 
    if (pricingData) {
 
        pricingData.style.display =
            "none";
    }
 
    if (initialMessage) {
 
        initialMessage.style.display =
            "flex";
    }
}
 
async function searchConsumable() {
 
    const consumable =
        getConsumableValue(
            "consumableSearch"
        )
            .toUpperCase();
 
    const country =
        getConsumableValue(
            "consumableCountry"
        )
            .toUpperCase();
 
    const program =
        getConsumableValue(
            "consumableProgram"
        )
            .toUpperCase();
 
    hideConsumableMessage();
 
    // =========================================
    // VALIDATION
    // =========================================
 
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
 
    setSearchButtonLoading(
        true
    );
 
    showConsumableMessage(
        "Searching SAP pricing information...",
        "loading"
    );
 
    try {
 
        // =====================================
        // NODE API URL
        // =====================================
 
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
 
        // =====================================
        // CALL NODE
        // =====================================
 
        const response =
            await fetch(url);
 
        const result =
            await response.json();
 
        console.log(
            "Consumable API Response:",
            result
        );
 
        // =====================================
        // ERROR
        // =====================================
 
        if (!response.ok) {
 
            throw new Error(
                result.message ||
                "Unable to retrieve pricing"
            );
        }
 
        if (!result.success) {
 
            throw new Error(
                result.message ||
                "Unable to retrieve pricing"
            );
        }
 
        // =====================================
        // GET NORMALIZED SAP DATA
        // =====================================
 
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
                program === "B1"
                    ? "Barracuda"
                    : "Auto Reorder",
 
            conditionType:
                sap.Kschl || "-",
 
            salesOrg:
                sap.Vkorg || "-",
 
            customerPriceGroup:
                sap.Konda || "-",
 
            calculationType:
                sap.Krech || "-",
 
            price:
    formatPrice(
        sap.Kbetr
    ),
   
            currency:
    sap.Konwa || "-",
 
            pricingUnit:
                formatPricingUnit(
                    sap.Kpein
                ),
 
            unitOfMeasure:
                sap.Kmein || "-",
 
            validFrom:
                formatConsumableDate(
                    sap.Datab
                ),
 
            validTo:
                formatConsumableDate(
                    sap.Datbi
                )
        };
 
        console.log(
            "Formatted Pricing Data:",
            resultData
        );
 
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
 
    } finally {
 
        setSearchButtonLoading(
            false
        );
    }
}
 
function setSearchButtonLoading(
    loading
) {
 
    const button =
        document.querySelector(
            ".consumable-search-btn"
        );
 
    if (!button) {
        return;
    }
 
    button.disabled =
        loading;
 
    if (loading) {
 
        button.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Searching';
 
    } else {
 
        button.innerHTML =
            '<i class="fas fa-search"></i> Search';
    }
}
 
function formatPrice(value) {
 
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
 
        return "-";
    }
 
    const number =
        Number(value);
 
    if (
        Number.isNaN(number)
    ) {
 
        return String(value);
    }
 
    return number.toFixed(2);
}
 
function formatPricingUnit(
    value
) {
 
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
 
        return "-";
    }
 
    const number =
        Number(value);
 
    if (
        Number.isNaN(number)
    ) {
 
        return String(value);
    }
 
    return String(
        number
    );
}
 
function formatConsumableDate(
    value
) {
 
    if (!value) {
        return "-";
    }
 
    // SAP OData V2 Date
    // /Date(1234567890000)/
 
    if (
        typeof value === "string" &&
        value.startsWith("/Date(")
    ) {
 
        const startIndex =
            value.indexOf("(");
 
        const endIndex =
            value.indexOf(")");
 
        if (
            startIndex !== -1 &&
            endIndex !== -1
        ) {
 
            const timestamp =
                value.substring(
                    startIndex + 1,
                    endIndex
                );
 
            const milliseconds =
                Number(timestamp);
 
            if (
                !Number.isNaN(
                    milliseconds
                )
            ) {
 
                const date =
                    new Date(
                        milliseconds
                    );
 
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
 
    // YYYYMMDD
 
    if (
        typeof value === "string" &&
        /^\d{8}$/.test(value)
    ) {
 
        return (
            value.substring(0, 4) +
            "-" +
            value.substring(4, 6) +
            "-" +
            value.substring(6, 8)
        );
    }
 
    return String(value);
}
 
function showConsumableResult(
    data
) {
 
    window.currentPricingData = data;

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
        "pricingCustomerPriceGroup",
        data.customerPriceGroup
    );
 
    setConsumableText(
        "pricingCalculationType",
        data.calculationType
    );
 
    setConsumableText(
        "pricingPrice",
        data.price
    );
 
    setConsumableText(
        "pricingCurrency",
        data.currency
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

function enablePriceEdit() {

    const input =
        document.getElementById(
            "pricingPrice"
        );

    const editBtn =
        document.getElementById(
            "editPriceBtn"
        );

    const saveBtn =
        document.getElementById(
            "savePriceBtn"
        );

    input.removeAttribute(
        "readonly"
    );

    input.focus();

    editBtn.style.display =
        "none";

    saveBtn.style.display =
        "inline-flex";
}

async function savePrice() {

    const price =
        document.getElementById(
            "pricingPrice"
        ).value;

    const consumable =
        document.getElementById(
            "pricingConsumable"
        ).textContent.trim();

    const country =
        document.getElementById(
            "pricingCountry"
        ).textContent.trim();

    const program =
        document.getElementById(
            "pricingProgram"
        ).textContent.trim();

    let selkzb1 = "";
    let selkzbr = "";

    if (program === "Barracuda") {

        selkzb1 = "X";

    } else {

        selkzbr = "X";
    }

    const current =
    window.currentPricingData || {};

const payload = {

    Consumable:
        consumable,

    Country:
        country,

    Kschl:
        current.conditionType,

    Vkorg:
        current.salesOrg,

    Selkzb1:
        selkzb1,

    Selkzbr:
        selkzbr
};

if (selkzb1 === "X") {

    payload.B1kbetr =
        price;

    payload.B1konwa =
        current.currency;

    payload.B1kpein =
        current.pricingUnit;

    payload.B1kmein =
        current.unitOfMeasure;

    payload.B1krech =
        current.calculationType;
}

if (selkzbr === "X") {

    payload.Brkbetr =
        price;

    payload.Brkonwa =
        current.currency;

    payload.Brkpein =
        current.pricingUnit;

    payload.Brkmein =
        current.unitOfMeasure;

    payload.Brkrech =
        current.calculationType;
}

    if (selkzb1 === "X") {

        payload.B1kbetr =
            price;
    }

    if (selkzbr === "X") {

        payload.Brkbetr =
            price;
    }

    console.log(
        "UPDATE PAYLOAD",
        payload
    );

    try {

        const response =
            await fetch(
                "/api/consumable/updatePrice",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );

        const text =
            await response.text();

        console.log(
            "UPDATE RESPONSE",
            text
        );

        if (!response.ok) {

            throw new Error(text);
        }

        showConsumableMessage(
    "Price updated successfully.",
    "success"
);

setTimeout(
    function () {

        hideConsumableMessage();

    },
    3000
);

    } catch (error) {

        console.error(error);

        showConsumableMessage(
            error.message,
            "error"
        );
    }
}
 
document.addEventListener(
    "DOMContentLoaded",
    function () {
           hideConsumableResult();
        console.log(
            "Consumables JavaScript loaded"
        );
 
        const consumable =
            document.getElementById(
                "consumableSearch"
            );
 
        if (!consumable) {
            return;
        }
 
        // Uppercase automatically
 
        consumable.addEventListener(
            "input",
            function () {
 
                consumable.value =
                    consumable.value
                        .toUpperCase();
            }
        );
 
        // Search when Enter is pressed
 
        consumable.addEventListener(
            "keydown",
            function (event) {
 
                if (
                    event.key === "Enter"
                ) {
 
                    event.preventDefault();
 
                    searchConsumable();
                }
            }
        );
    }
);
 