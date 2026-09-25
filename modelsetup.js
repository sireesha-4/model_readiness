const modelData = {};
let currentStep = 1;

loadStep();

function modelContextBar() {

    return `
        <div class="model-context-bar">

            <div class="context-item">
                <span class="context-label">
                    Model
                </span>

                <strong>
                    ${modelData.matnr || "-"}
                </strong>
            </div>

            <div class="context-divider"></div>

            <div class="context-item">
                <span class="context-label">
                    Country
                </span>

                <strong>
                    ${modelData.country || "-"}
                </strong>
            </div>

        </div>
    `;
}

function loadStep() {

    document.getElementById(
        "stepText"
    ).innerHTML =
        `Step ${currentStep} of 6`;

    document
        .querySelectorAll(".step")
        .forEach((step, index) => {

            step.classList.remove(
                "active",
                "completed"
            );

            const circle =
                step.querySelector(".circle");

            if (index + 1 < currentStep) {

                step.classList.add(
                    "completed"
                );

                circle.innerHTML =
                    "✓";
            }
            else {

                circle.innerHTML =
                    (index + 1);
            }

            if (index + 1 === currentStep) {

                step.classList.add(
                    "active"
                );
            }
        });

    const area =
        document.getElementById(
            "contentArea"
        );

    if (currentStep === 1) {

        area.innerHTML = `
 
    <div class="card">
 
        <h3>Material Information</h3>
 
        <div class="grid">

    <div class="form-group">
        <label>Material Number *</label>
        <input type="text" id="matnr">
    </div>

    <div class="form-group">
    <label>Country *</label>

    <select id="country">
        <option value="">Select Country</option>
        <option value="US">US</option>
        <option value="CA">CA</option>
    </select>
</div>

    <div class="form-group">
        <label>Plant *</label>
        <input type="text" id="werks">
    </div>

    <div class="form-group">
        <label>Material Type *</label>
        <input type="text" id="mtart">
    </div>

    <div class="form-group">
        <label>Industry Sector</label>
        <input type="text" id="mbrsh">
    </div>

    <div class="form-group">
        <label>Material Group</label>
        <input type="text" id="matkl">
    </div>

    <div class="form-group">
        <label>Base Unit Of Measure</label>
        <input type="text" id="meins">
    </div>

    <div class="form-group">
        <label>Division</label>
        <input type="text" id="spart">
    </div>

    <div class="form-group">
        <label>EAN / UPC</label>
        <input type="text" id="ean11">
    </div>

    <div class="form-group">
        <label>Cross Plant Status</label>
        <input type="text" id="mstae">
    </div>

    <div class="form-group">
        <label>Cross Distribution Status</label>
        <input type="text" id="mstav">
    </div>

    <div class="form-group">
        <label>Language</label>
        <input type="text" id="spras">
    </div>

    <div class="form-group">
        <label>Material Description</label>
        <input type="text" id="maktx">
    </div>

    <div class="form-group">
        <label>Distribution Channel</label>
        <input type="text" id="vtweg">
    </div>

    <div class="form-group">
        <label>Distribution Material Status</label>
        <input type="text" id="vmsta">
    </div>

</div>
 
        <div class="btn-row">
 
            <div></div>
 
            <button
                class="btn next"
                onclick="nextStep()">
 
                Next →
 
            </button>
 
        </div>
 
    </div>
 
    `;
    }

    if (currentStep === 2) {

        area.innerHTML = `

    <div class="card">

        <h3>Price Setup</h3>

        ${modelContextBar()}


        <!-- B1 PRICE SETUP -->

        <div class="create-pricing-block">

            <div class="create-pricing-header">

                <div class="create-pricing-title">
                    B1 Price Details
                </div>

                <div class="create-pricing-toggle">

                    <span>B1 Price Setup</span>

                    <label class="warranty-switch">

                        <input
                            type="checkbox"
                            id="b1PricingToggle"
                            ${modelData.selkzb1 === "X" ? "checked" : ""}
                            onchange="toggleCreatePricing('b1')">

                        <span class="warranty-slider"></span>

                    </label>

                </div>

            </div>


            <div
                id="b1PricingFields"
                class="create-pricing-fields">

                <div class="grid">

                    <div class="form-group">
                        <label>B1 Material Price</label>
                        <input
                            type="number"
                            id="b1Kbetr"
                            step="0.01"
                            placeholder="199.99">
                    </div>


                    <div class="form-group">
                        <label>B1 Currency</label>

                        <select id="b1Konwa">

                            <option value="">
                                Select Currency
                            </option>

                            <option value="USD">
                                USD
                            </option>

                            <option value="CAD">
                                CAD
                            </option>

                            <option value="EUR">
                                EUR
                            </option>

                            <option value="JPY">
                                JPY
                            </option>

                        </select>

                    </div>


                    <div class="form-group">
                        <label>B1 Pricing Unit</label>

                        <input
                            type="number"
                            id="b1Kpein"
                            placeholder="1">

                    </div>


                    <div class="form-group">
                        <label>Condition Type</label>

                        <input
                            type="text"
                            id="Kschl"
                            placeholder="PR00">

                    </div>


                    <div class="form-group">
                        <label>Sales Organization</label>

                        <input
                            type="text"
                            id="Vkorg">

                    </div>


                    <div class="form-group">
                        <label>Division</label>

                        <input
                            type="text"
                            id="Spart">

                    </div>


                    <div class="form-group">
                        <label>Distribution Channel</label>

                        <input
                            type="text"
                            id="Vtweg">

                    </div>


                    <div class="form-group">
                        <label>Customer Price Group</label>

                        <input
                            type="text"
                            id="Konda">

                    </div>


                    <div class="form-group">
                        <label>B1 Unit Of Measure</label>

                        <input
                            type="text"
                            id="b1Kmein"
                            placeholder="EA">

                    </div>


                    <div class="form-group">
                        <label>B1 Calculation Type</label>

                        <input
                            type="text"
                            id="b1Krech">

                    </div>


                    <div class="form-group">
                        <label>B1 Valid From</label>

                        <input
                            type="date"
                            id="b1Datab">

                    </div>


                    <div class="form-group">
                        <label>B1 Valid To</label>

                        <input
                            type="date"
                            id="b1Datbi">

                    </div>

                </div>

            </div>

        </div>


        <!-- BR PRICE SETUP -->

        <div class="create-pricing-block">

            <div class="create-pricing-header">

                <div class="create-pricing-title">
                    BR Price Details
                </div>

                <div class="create-pricing-toggle">

                    <span>BR Price Setup</span>

                    <label class="warranty-switch">

                        <input
                            type="checkbox"
                            id="brPricingToggle"
                            ${modelData.selkzbr === "X" ? "checked" : ""}
                            onchange="toggleCreatePricing('br')">

                        <span class="warranty-slider"></span>

                    </label>

                </div>

            </div>


            <div
                id="brPricingFields"
                class="create-pricing-fields">

                <div class="grid">

                    <div class="form-group">
                        <label>BR Material Price</label>

                        <input
                            type="number"
                            id="brKbetr"
                            step="0.01"
                            placeholder="199.99">

                    </div>


                    <div class="form-group">
                        <label>BR Currency</label>

                        <select id="brKonwa">

                            <option value="">
                                Select Currency
                            </option>

                            <option value="USD">
                                USD
                            </option>

                            <option value="CAD">
                                CAD
                            </option>

                            <option value="EUR">
                                EUR
                            </option>

                            <option value="JPY">
                                JPY
                            </option>

                        </select>

                    </div>


                    <div class="form-group">
                        <label>BR Pricing Unit</label>

                        <input
                            type="number"
                            id="brKpein"
                            placeholder="1">

                    </div>


                    <div class="form-group">
                        <label>Condition Type</label>

                        <input
                            type="text"
                            id="Kschl"
                            placeholder="PR00">

                    </div>


                    <div class="form-group">
                        <label>Sales Organization</label>

                        <input
                            type="text"
                            id="Vkorg">

                    </div>


                    <div class="form-group">
                        <label>Division</label>

                        <input
                            type="text"
                            id="Spart">

                    </div>


                    <div class="form-group">
                        <label>Distribution Channel</label>

                        <input
                            type="text"
                            id="Vtweg">

                    </div>


                    <div class="form-group">
                        <label>Customer Price Group</label>

                        <input
                            type="text"
                            id="Konda">

                    </div>


                    <div class="form-group">
                        <label>BR Unit Of Measure</label>

                        <input
                            type="text"
                            id="brKmein"
                            placeholder="EA">

                    </div>


                    <div class="form-group">
                        <label>BR Calculation Type</label>

                        <input
                            type="text"
                            id="brKrech">

                    </div>


                    <div class="form-group">
                        <label>BR Valid From</label>

                        <input
                            type="date"
                            id="brDatab">

                    </div>


                    <div class="form-group">
                        <label>BR Valid To</label>

                        <input
                            type="date"
                            id="brDatbi">

                    </div>

                </div>

            </div>

        </div>


        <div class="btn-row">

            <button
                class="btn back"
                onclick="backStep()">

                ← Back

            </button>


            <button
                class="btn next"
                onclick="nextStep()">

                Next →

            </button>

        </div>

    </div>

    `;


        restoreStepData();

        toggleCreatePricing("b1");

        toggleCreatePricing("br");

        return;
    }

    if (currentStep === 3) {

        area.innerHTML = `
 
    <div class="card">
 
        <h3>Warranty Setup</h3>

        ${modelContextBar()}
 
        <div class="grid">
 
            <div class="form-group">

    <label>Standard Warranty</label>

    <div class="warranty-toggle-row">

        <span id="standardWarrantyText">
            Off
        </span>

        <label class="warranty-switch">

            <input
                type="checkbox"
                id="standardWarranty"
                onchange="toggleWarranty(
                    'standardWarranty',
                    'standardWarrantyText',
                    'standardLength',
                    'standardUnit'
                )">

            <span class="warranty-slider"></span>

        </label>

    </div>

</div>
 
            <div class="form-group">
                <label>Length</label>
                <input
                    type="number"
                    id="standardLength"
                    placeholder="1">
            </div>
 
            <div class="form-group">
                <label>Unit</label>
                <select id="standardUnit">
                    <option>YR</option>
                    <option value="MO">MON</option>
                </select>
            </div>
 
            <div></div>
 
            <div class="form-group">

    <label>Extended Warranty</label>

    <div class="warranty-toggle-row">

        <span id="extendedWarrantyText">
            Off
        </span>

        <label class="warranty-switch">

            <input
                type="checkbox"
                id="extendedWarranty"
                onchange="toggleWarranty(
                    'extendedWarranty',
                    'extendedWarrantyText',
                    'extendedLength',
                    'extendedUnit'
                )">

            <span class="warranty-slider"></span>

        </label>

    </div>

</div>
 
            <div class="form-group">
                <label>Length</label>
                <input
                    type="number"
                    id="extendedLength"
                    placeholder="2">
            </div>
 
            <div class="form-group">
                <label>Unit</label>
                <select id="extendedUnit">
                    <option>YR</option>
                    <option value="MO">MON</option>
                </select>
            </div>
 
            <div></div>
 
            <div class="form-group">

    <label>Brother Care Warranty</label>

    <div class="warranty-toggle-row">

        <span id="brotherCareWarrantyText">
            Off
        </span>

        <label class="warranty-switch">

            <input
    type="checkbox"
    id="brotherCareWarranty"
    onchange="toggleWarranty(
        'brotherCareWarranty',
        'brotherCareWarrantyText',
        'brotherCareLength',
        'brotherCareUnit',
        true
    )">

            <span class="warranty-slider"></span>

        </label>

    </div>

</div>
 
            <div class="form-group">
                <label>Length</label>
                <input
                    type="number"
                    id="brotherCareLength"
                    placeholder="1">
            </div>
 
            <div class="form-group">
                <label>Unit</label>
                <select id="brotherCareUnit">
    <option value="">Select Unit</option>
    <option value="YR">YR</option>
    <option value="MO">MON</option>
</select>
            </div>
 
            <div></div>
 
            
 
            <div class="form-group">

    <label>Brother Plus Warranty</label>

    <div class="warranty-toggle-row">

        <span id="brotherPlusWarrantyText">
            Off
        </span>

        <label class="warranty-switch">

            <input
    type="checkbox"
    id="brotherPlusWarranty"
    onchange="toggleWarranty(
        'brotherPlusWarranty',
        'brotherPlusWarrantyText',
        'brotherPlusLength',
        'brotherPlusUnit',
        true
    )">

            <span class="warranty-slider"></span>

        </label>

    </div>

</div>
 
            <div class="form-group">
                <label>Length</label>
                <input
                    type="number"
                    id="brotherPlusLength"
                    placeholder="1">
            </div>
 
            <div class="form-group">
                <label>Unit</label>
                <select id="brotherPlusUnit">
    <option value="">Select Unit</option>
    <option value="YR">YR</option>
    <option value="MO">MON</option>
</select>
            </div>
 
        </div>
 
        <div class="btn-row">
 
            <button
                class="btn back"
                onclick="backStep()">
 
                ← Back
 
            </button>
 
            <button
                class="btn next"
                onclick="nextStep()">
 
                Next →
 
            </button>
 
        </div>
 
    </div>
 
    `;
    }

    if (currentStep === 4) {

        area.innerHTML = `

    <div class="card">

        <h3>Compatibility & Programs</h3>

        ${modelContextBar()}

        <div class="program-grid">

            <div
                class="program-card"
                id="amazondartCard"
                onclick="toggleProgram('amazondart')">

                <div class="program-title">
                    Amazon Dart
                </div>

                <div
                    id="amazondartIcon"
                    class="program-icon">
                    ◇
                </div>

                <div
                    id="amazondartStatus"
                    class="program-status">
                    Available
                </div>

                <input
                    type="hidden"
                    id="amazondart"
                    value="${modelData.amazondart || ''}">

            </div>


            <div
                class="program-card"
                id="brrefreshCard"
                onclick="toggleProgram('brrefresh')">

                <div class="program-title">
                    BR Refresh
                </div>

                <div
                    id="brrefreshIcon"
                    class="program-icon">
                    ◇
                </div>

                <div
                    id="brrefreshStatus"
                    class="program-status">
                    Available
                </div>

                <input
                    type="hidden"
                    id="brrefresh"
                    value="${modelData.brrefresh || ''}">

            </div>


            <div
                class="program-card"
                id="barracudaCard"
                onclick="toggleProgram('barracuda')">

                <div class="program-title">
                    Barracuda
                </div>

                <div
                    id="barracudaIcon"
                    class="program-icon">
                    ◇
                </div>

                <div
                    id="barracudaStatus"
                    class="program-status">
                    Available
                </div>

                <input
                    type="hidden"
                    id="barracuda"
                    value="${modelData.barracuda || ''}">

            </div>


            <div
                class="program-card"
                id="bplusCard"
                onclick="toggleProgram('bplus')">

                <div class="program-title">
                    Brother Plus
                </div>

                <div
                    id="bplusIcon"
                    class="program-icon">
                    ◇
                </div>

                <div
                    id="bplusStatus"
                    class="program-status">
                    Available
                </div>

                <input
                    type="hidden"
                    id="bplus"
                    value="${modelData.bplus || ''}">

            </div>

        </div>


        <div class="btn-row">

            <button
                class="btn back"
                onclick="backStep()">
                ← Back
            </button>

            <button
                class="btn next"
                onclick="nextStep()">
                Next →
            </button>

        </div>

    </div>

    `;

        restoreProgramState("amazondart");
        restoreProgramState("brrefresh");
        restoreProgramState("barracuda");
        restoreProgramState("bplus");
    }

    if (currentStep === 5) {

        area.innerHTML = `

    <div class="card">

        <h3>
            Order Types & Final Configuration
        </h3>

        ${modelContextBar()}


        <div class="order-section-title">
            Consumable
        </div>


        <div class="consumable-field">

            <input
                type="text"
                id="consumable"
                value="${modelData.consumable || ""}"
                placeholder="Enter consumable">

        </div>


        <div class="order-section-title order-types-heading">
            Select Applicable Order Types
        </div>


        <div class="order-check-grid">

            <label class="order-check-item">

                <input
                    type="checkbox"
                    id="drumOrder"
                    ${modelData.drumOrder === "X" ? "checked" : ""}>

                <span class="order-checkbox"></span>

                <span class="order-check-text">
                    Drum Order
                </span>

            </label>


            <label class="order-check-item">

                <input
                    type="checkbox"
                    id="wasteToner"
                    ${modelData.wasteToner === "X" ? "checked" : ""}>

                <span class="order-checkbox"></span>

                <span class="order-check-text">
                    Waste Toner
                </span>

            </label>


            <label class="order-check-item">

                <input
                    type="checkbox"
                    id="beltUnit"
                    ${modelData.beltUnit === "X" ? "checked" : ""}>

                <span class="order-checkbox"></span>

                <span class="order-check-text">
                    Belt Unit
                </span>

            </label>


            <label class="order-check-item">

                <input
                    type="checkbox"
                    id="claimOrder"
                    ${modelData.claimOrder === "X" ? "checked" : ""}>

                <span class="order-checkbox"></span>

                <span class="order-check-text">
                    Claim Order
                </span>

            </label>

        </div>


        <div class="btn-row">

            <button
                class="btn back"
                onclick="backStep()">

                ← Back

            </button>


            <button
                class="btn next"
                onclick="nextStep()">

                Review →

            </button>

        </div>

    </div>

    `;
    }

    if (currentStep === 6) {

        area.innerHTML = `
 
    <div class="card">
 
        <h3>
            Review & Create Model
        </h3>
 
        <div class="review-grid">
 
            <div class="review-card">
 
                <h4>Model Details</h4>
 
                <p>
                    Material :
                    ${modelData.matnr || "-"}
                </p>
 
                <p>
                    Country :
                    ${modelData.country || "-"}
                </p>
 
                <p>
                    EAN :
                   ${modelData.ean11 || "-"}
                </p>
 
            </div>
 
            <div class="review-card">
 
                <h4>Pricing</h4>
 
                <p>
                    B1 Pricing Configured
                </p>
 
            </div>
 
            <div class="review-card">
 
                <h4>Warranty</h4>
 
                <p>
                    Warranty Details Added
                </p>
 
            </div>
 
            <div class="review-card">
 
                <h4>Programs</h4>
 
                <p>
                    Compatibility Configured
                </p>
 
            </div>
 
        </div>
 
        <div class="btn-row">
 
            <button
                class="btn back"
                onclick="backStep()">
 
                ← Back
 
            </button>
 
            <button
                class="btn save"
                onclick="saveModel()">
 
                Create Model
 
            </button>
 
        </div>
 
    </div>
    `;
    }

    const progress =

        (
            (currentStep - 1)
            / 5
        )
        * 100;

    const progressBar =
        document.getElementById(
            "wizardProgress"
        );

    if (progressBar) {

        progressBar.style.width =
            progress + "%";
    }

    /*
    Restore previous values whenever
    a step is rendered again.
    */
    restoreStepData();


}

function restoreProgramState(id) {

    const input =
        document.getElementById(id);

    const card =
        document.getElementById(
            id + "Card"
        );

    const icon =
        document.getElementById(
            id + "Icon"
        );

    const status =
        document.getElementById(
            id + "Status"
        );

    if (!input || !card) {
        return;
    }

    if (input.value === "X") {

        card.classList.add("active");

        if (icon) {
            icon.innerHTML = "◆";
        }

        if (status) {
            status.innerHTML = "Configured";
        }

    } else {

        card.classList.remove("active");

        if (icon) {
            icon.innerHTML = "◇";
        }

        if (status) {
            status.innerHTML = "Available";
        }
    }
}

function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.value = value ?? "";
    }
}

function toggleCreatePricing(type) {

    const b1Toggle =
        document.getElementById("b1PricingToggle");

    const brToggle =
        document.getElementById("brPricingToggle");

    const b1Fields =
        document.getElementById("b1PricingFields");

    const brFields =
        document.getElementById("brPricingFields");


    if (!b1Toggle || !brToggle) {
        return;
    }


    // B1 PRICE SETUP

    if (type === "b1") {

        if (
            b1Toggle.checked &&
            brToggle.checked
        ) {

            b1Toggle.checked = false;

            modelData.selkzb1 = "";


            if (b1Fields) {
                b1Fields.style.display = "none";
            }


            showPricingError(
                "BR Price Setup is already selected. Only one pricing setup can be created at a time."
            );

            return;
        }


        modelData.selkzb1 =
            b1Toggle.checked
                ? "X"
                : "";


        if (b1Fields) {

            b1Fields.style.display =
                b1Toggle.checked
                    ? "block"
                    : "none";
        }

        if (b1Toggle.checked) {

    carryForwardPricingValues("b1");
}
    }


    // BR PRICE SETUP

    if (type === "br") {

        if (
            brToggle.checked &&
            b1Toggle.checked
        ) {

            brToggle.checked = false;

            modelData.selkzbr = "";


            if (brFields) {
                brFields.style.display = "none";
            }


            showPricingError(
                "B1 Price Setup is already selected. Only one pricing setup can be created at a time."
            );

            return;
        }


        modelData.selkzbr =
            brToggle.checked
                ? "X"
                : "";


        if (brFields) {

    brFields.style.display =
        brToggle.checked
            ? "block"
            : "none";
}


if (brToggle.checked) {

    carryForwardPricingValues("br");
}
    }
}

function carryForwardPricingValues(type) {

    const fields =
        type === "b1"
            ? document.getElementById("b1PricingFields")
            : document.getElementById("brPricingFields");


    if (!fields) {
        return;
    }


    const inputs =
        fields.querySelectorAll("input");


    inputs.forEach(function (input) {

        if (input.id === "Vkorg" && !input.value) {
            input.value = modelData.werks || "";
        }


        if (input.id === "Spart" && !input.value) {
            input.value = modelData.spart || "";
        }


        if (input.id === "Vtweg" && !input.value) {
            input.value = modelData.vtweg || "";
        }

    });
}

function showPricingError(message) {

    let errorBox =
        document.getElementById(
            "pricingSelectionError"
        );


    if (!errorBox) {

        errorBox =
            document.createElement("div");

        errorBox.id =
            "pricingSelectionError";

        errorBox.className =
            "pricing-selection-error";


        const card =
            document.querySelector(
                "#contentArea .card"
            );


        if (card) {

            const contextBar =
                card.querySelector(
                    ".model-context-bar"
                );


            if (contextBar) {

                contextBar.insertAdjacentElement(
                    "afterend",
                    errorBox
                );

            } else {

                card.prepend(
                    errorBox
                );
            }
        }
    }


    errorBox.textContent =
        message;

    errorBox.style.display =
        "flex";


    clearTimeout(
        window.pricingErrorTimer
    );


    window.pricingErrorTimer =
        setTimeout(
            function () {

                errorBox.style.display =
                    "none";

            },
            4000
        );
}


function restoreStepData() {

    // STEP 1 - Material Information
    if (currentStep === 1) {

        setValue("matnr", modelData.matnr);
        setValue("country", modelData.country);
        setValue("werks", modelData.werks);
        setValue("mtart", modelData.mtart);
        setValue("mbrsh", modelData.mbrsh);
        setValue("matkl", modelData.matkl);
        setValue("meins", modelData.meins);
        setValue("spart", modelData.spart);
        setValue("ean11", modelData.ean11);
        setValue("mstae", modelData.mstae);
        setValue("mstav", modelData.mstav);
        setValue("spras", modelData.spras);
        setValue("maktx", modelData.maktx);
        setValue("vtweg", modelData.vtweg);
        setValue("vmsta", modelData.vmsta);
    }


    // STEP 2 - Price Setup
    // STEP 2 - Price Setup
if (currentStep === 2) {

    const b1Toggle =
        document.getElementById("b1PricingToggle");

    const brToggle =
        document.getElementById("brPricingToggle");

    const b1Block =
        document.getElementById("b1PricingFields");

    const brBlock =
        document.getElementById("brPricingFields");


    // Restore toggle selections

    if (b1Toggle) {
        b1Toggle.checked =
            modelData.selkzb1 === "X";
    }

    if (brToggle) {
        brToggle.checked =
            modelData.selkzbr === "X";
    }


    // ========================================
    // B1 PRICING
    // ========================================

    if (b1Block) {

        const setB1Value =
            function (selector, value) {

                const element =
                    b1Block.querySelector(selector);

                if (element) {
                    element.value =
                        value ?? "";
                }
            };


        setB1Value(
            "#b1Kbetr",
            modelData.b1Kbetr
        );

        setB1Value(
            "#b1Konwa",
            modelData.b1Konwa
        );

        setB1Value(
            "#b1Kpein",
            modelData.b1Kpein
        );

        setB1Value(
            "#Kschl",
            modelData.Kschl
        );

        setB1Value(
            "#Vkorg",
            modelData.Vkorg ||
            modelData.werks
        );

        setB1Value(
            "#Spart",
            modelData.Spart ||
            modelData.spart
        );

        setB1Value(
            "#Vtweg",
            modelData.Vtweg ||
            modelData.vtweg
        );

        setB1Value(
            "#Konda",
            modelData.Konda
        );

        setB1Value(
            "#b1Kmein",
            modelData.b1Kmein
        );

        setB1Value(
            "#b1Krech",
            modelData.b1Krech
        );

        setB1Value(
            "#b1Datab",
            modelData.b1Datab
        );

        setB1Value(
            "#b1Datbi",
            modelData.b1Datbi
        );
    }


    // ========================================
    // BR PRICING
    // ========================================

    if (brBlock) {

        const setBRValue =
            function (selector, value) {

                const element =
                    brBlock.querySelector(selector);

                if (element) {
                    element.value =
                        value ?? "";
                }
            };


        setBRValue(
            "#brKbetr",
            modelData.brKbetr
        );

        setBRValue(
            "#brKonwa",
            modelData.brKonwa
        );

        setBRValue(
            "#brKpein",
            modelData.brKpein
        );

        setBRValue(
            "#Kschl",
            modelData.Kschl
        );

        setBRValue(
            "#Vkorg",
            modelData.Vkorg ||
            modelData.werks
        );

        setBRValue(
            "#Spart",
            modelData.Spart ||
            modelData.spart
        );

        setBRValue(
            "#Vtweg",
            modelData.Vtweg ||
            modelData.vtweg
        );

        setBRValue(
            "#Konda",
            modelData.Konda
        );

        setBRValue(
            "#brKmein",
            modelData.brKmein
        );

        setBRValue(
            "#brKrech",
            modelData.brKrech
        );

        setBRValue(
            "#brDatab",
            modelData.brDatab
        );

        setBRValue(
            "#brDatbi",
            modelData.brDatbi
        );
    }


    // Show only selected pricing section

    toggleCreatePricing("b1");

    toggleCreatePricing("br");
}


    // STEP 3 - Warranty
    if (currentStep === 3) {

        setValue(
            "standardLength",
            modelData.standardLength
        );

        setValue(
            "standardUnit",
            modelData.standardUnit
        );

        restoreWarranty(
            "standardWarranty",
            "standardWarrantyText",
            "standardLength",
            "standardUnit",
            modelData.standardWarranty
        );


        setValue(
            "extendedLength",
            modelData.extendedLength
        );

        setValue(
            "extendedUnit",
            modelData.extendedUnit
        );

        restoreWarranty(
            "extendedWarranty",
            "extendedWarrantyText",
            "extendedLength",
            "extendedUnit",
            modelData.extendedWarranty
        );


        setValue(
            "brotherCareLength",
            modelData.brotherCareLength
        );

        setValue(
            "brotherCareUnit",
            modelData.brotherCareUnit
        );

        restoreWarranty(
            "brotherCareWarranty",
            "brotherCareWarrantyText",
            "brotherCareLength",
            "brotherCareUnit",
            modelData.brotherCareWarranty,
            true
        );

        setValue(
            "brotherPlusLength",
            modelData.brotherPlusLength
        );

        setValue(
            "brotherPlusUnit",
            modelData.brotherPlusUnit
        );

        restoreWarranty(
            "brotherPlusWarranty",
            "brotherPlusWarrantyText",
            "brotherPlusLength",
            "brotherPlusUnit",
            modelData.brotherPlusWarranty,
            true
        );
    }


    // STEP 4 - Compatibility
    if (currentStep === 4) {

        setValue(
            "amazondart",
            modelData.amazondart
        );

        setValue(
            "brrefresh",
            modelData.brrefresh
        );

        setValue(
            "barracuda",
            modelData.barracuda
        );

        setValue(
            "bplus",
            modelData.bplus
        );

        restoreProgramState("amazondart");
        restoreProgramState("brrefresh");
        restoreProgramState("barracuda");
        restoreProgramState("bplus");
    }


    // STEP 5 - Order Types

}

function nextStep() {

    saveCurrentStepData();


    if (currentStep === 2) {

        if (
            modelData.selkzb1 === "X" &&
            modelData.selkzbr === "X"
        ) {

            showPricingError(
                "B1 and BR pricing cannot be created at the same time. Please select only one pricing setup."
            );

            return;
        }
    }


    if (currentStep < 6) {

        currentStep++;

        loadStep();
    }
}


function backStep() {

    // Save changes made on current screen
    saveCurrentStepData();

    if (currentStep > 1) {

        currentStep--;

        // Render previous screen
        loadStep();
    }
}



function getValue(id) {

    return document.getElementById(id)?.value || "";
}

function saveCurrentStepData() {

    /*
    STEP 1
    Material Information
    */
    if (currentStep === 1) {

        modelData.matnr = getValue("matnr");
        modelData.werks = getValue("werks");
        modelData.mtart = getValue("mtart");
        modelData.mbrsh = getValue("mbrsh");
        modelData.matkl = getValue("matkl");
        modelData.meins = getValue("meins");
        modelData.spart = getValue("spart");
        modelData.ean11 = getValue("ean11");

        modelData.mstae = getValue("mstae");
        modelData.mstav = getValue("mstav");

        modelData.spras = getValue("spras");
        modelData.maktx = getValue("maktx");
        modelData.vtweg = getValue("vtweg");
        modelData.vmsta = getValue("vmsta");

        modelData.country = getValue("country");
    }

    /*
    STEP 2
    Pricing
    */
  if (currentStep === 2) {

    const b1Toggle =
        document.getElementById("b1PricingToggle");

    const brToggle =
        document.getElementById("brPricingToggle");


    modelData.selkzb1 =
        b1Toggle && b1Toggle.checked
            ? "X"
            : "";


    modelData.selkzbr =
        brToggle && brToggle.checked
            ? "X"
            : "";


    /* ==============================
       B1 PRICING
    ============================== */

    if (modelData.selkzb1 === "X") {

        const block =
            document.getElementById(
                "b1PricingFields"
            );


        modelData.b1Kbetr =
            block.querySelector("#b1Kbetr")?.value || "";

        modelData.b1Konwa =
            block.querySelector("#b1Konwa")?.value || "";

        modelData.b1Kpein =
            block.querySelector("#b1Kpein")?.value || "";

        modelData.Kschl =
            block.querySelector("#Kschl")?.value || "";

        modelData.Vkorg =
            block.querySelector("#Vkorg")?.value || "";

        modelData.Spart =
            block.querySelector("#Spart")?.value || "";

        modelData.Vtweg =
            block.querySelector("#Vtweg")?.value || "";

        modelData.Konda =
            block.querySelector("#Konda")?.value || "";

        modelData.b1Kmein =
            block.querySelector("#b1Kmein")?.value || "";

        modelData.b1Krech =
            block.querySelector("#b1Krech")?.value || "";

        modelData.b1Datab =
            block.querySelector("#b1Datab")?.value || "";

        modelData.b1Datbi =
            block.querySelector("#b1Datbi")?.value || "";
    }


    /* ==============================
       BR PRICING
    ============================== */

    if (modelData.selkzbr === "X") {

        const block =
            document.getElementById(
                "brPricingFields"
            );


        modelData.brKbetr =
            block.querySelector("#brKbetr")?.value || "";

        modelData.brKonwa =
            block.querySelector("#brKonwa")?.value || "";

        modelData.brKpein =
            block.querySelector("#brKpein")?.value || "";

        modelData.Kschl =
            block.querySelector("#Kschl")?.value || "";

        modelData.Vkorg =
            block.querySelector("#Vkorg")?.value || "";

        modelData.Spart =
            block.querySelector("#Spart")?.value || "";

        modelData.Vtweg =
            block.querySelector("#Vtweg")?.value || "";

        modelData.Konda =
            block.querySelector("#Konda")?.value || "";

        modelData.brKmein =
            block.querySelector("#brKmein")?.value || "";

        modelData.brKrech =
            block.querySelector("#brKrech")?.value || "";

        modelData.brDatab =
            block.querySelector("#brDatab")?.value || "";

        modelData.brDatbi =
            block.querySelector("#brDatbi")?.value || "";
    }
}

    /*
    STEP 3
    Warranty
    */
    if (currentStep === 3) {

        modelData.standardWarranty =
            document.getElementById(
                "standardWarranty"
            )?.checked ? "X" : "";

        modelData.standardLength =
            getValue("standardLength");

        modelData.standardUnit =
            getValue("standardUnit");


        modelData.extendedWarranty =
            document.getElementById(
                "extendedWarranty"
            )?.checked ? "X" : "";

        modelData.extendedLength =
            getValue("extendedLength");

        modelData.extendedUnit =
            getValue("extendedUnit");


        modelData.brotherCareWarranty =
            document.getElementById(
                "brotherCareWarranty"
            )?.checked ? "X" : "";

        modelData.brotherCareLength =
            getValue("brotherCareLength");

        modelData.brotherCareUnit =
            getValue("brotherCareUnit");

        modelData.brotherPlusWarranty =
            document.getElementById(
                "brotherPlusWarranty"
            )?.checked ? "X" : "";

        modelData.brotherPlusLength =
            getValue("brotherPlusLength");

        modelData.brotherPlusUnit =
            getValue("brotherPlusUnit");
    }

    /*
    STEP 4
    Compatibility
    */
    if (currentStep === 4) {

        modelData.amazondart =
            getValue("amazondart");

        modelData.brrefresh =
            getValue("brrefresh");

        modelData.barracuda =
            getValue("barracuda");

        modelData.bplus =
            getValue("bplus");
    }

    /*
    STEP 5
    Order Types
    */
    if (currentStep === 5) {

        modelData.consumable =
            getValue("consumable");


        modelData.drumOrder =
            document.getElementById("drumOrder")?.checked
                ? "X"
                : "";


        modelData.wasteToner =
            document.getElementById("wasteToner")?.checked
                ? "X"
                : "";


        modelData.beltUnit =
            document.getElementById("beltUnit")?.checked
                ? "X"
                : "";


        modelData.claimOrder =
            document.getElementById("claimOrder")?.checked
                ? "X"
                : "";
    }
}


async function saveModel() {

    const isB1Pricing =
        modelData.selkzb1 === "X";

    const isBRPricing =
        modelData.selkzbr === "X";


    const payload = {

        Matnr:
            modelData.matnr || "",

        Country:
            modelData.country || "",

        Mtart:
            modelData.mtart || "",

        Mbrsh:
            modelData.mbrsh || "",

        Matkl:
            modelData.matkl || "",

        Meins:
            modelData.meins || "",

        Spart:
            modelData.spart || "",

        Ean11:
            modelData.ean11 || "",

        Mstae:
            modelData.mstae || "",

        Mstav:
            modelData.mstav || "",

        Spras:
            modelData.spras || "",

        Maktx:
            modelData.maktx || "",

        Vtweg:
            modelData.vtweg || "",

        Werks:
            modelData.werks || "",

        Vmsta:
            modelData.vmsta || "",


        Kschl:
            modelData.Kschl || "",

        Selkzb1:
            modelData.selkzb1 || "",

        Selkzbr:
            modelData.selkzbr || "",

        Vkorg:
            modelData.Vkorg ||
            modelData.werks ||
            "",

        Konda:
            modelData.Konda || "",


        B1kbetr:
            isB1Pricing
                ? modelData.b1Kbetr || ""
                : "",

        B1konwa:
            isB1Pricing
                ? modelData.b1Konwa || ""
                : "",

        B1kpein:
            isB1Pricing
                ? modelData.b1Kpein || ""
                : "",

        B1kmein:
            isB1Pricing
                ? modelData.b1Kmein || ""
                : "",

        B1krech:
            isB1Pricing
                ? modelData.b1Krech || ""
                : "",

        B1datab:
    isB1Pricing
        ? modelData.b1Datab || ""
        : "",

B1datbi:
    isB1Pricing
        ? modelData.b1Datbi || ""
        : "",


        Brkbetr:
            isBRPricing
                ? modelData.brKbetr || ""
                : "",

        Brkonwa:
            isBRPricing
                ? modelData.brKonwa || ""
                : "",

        Brkpein:
            isBRPricing
                ? modelData.brKpein || ""
                : "",

        Brkmein:
            isBRPricing
                ? modelData.brKmein || ""
                : "",

        Brkrech:
            isBRPricing
                ? modelData.brKrech || ""
                : "",

        Brdatab:
    isBRPricing
        ? modelData.brDatab || ""
        : "",

Brdatbi:
    isBRPricing
        ? modelData.brDatbi || ""
        : "",

        StdWtyType:
            modelData.standardWarranty || "",

        StdWtyLen:
            modelData.standardLength || "",

        StdWtyLenUnit:
            modelData.standardUnit || "",


        ExtdWtyType:
            modelData.extendedWarranty || "",

        ExtdWtyLen:
            modelData.extendedLength || "",

        ExtdWtyLenUnit:
            modelData.extendedUnit || "",


        BcareWtyType:
            modelData.brotherCareWarranty || "",

        BcareWtyLen:
            modelData.brotherCareLength || "",

        BcareWtyLenUnit:
            modelData.brotherCareUnit || "",


        BplusWtyType:
            modelData.brotherPlusWarranty || "",

        BplusWtyLen:
            modelData.brotherPlusLength || "",

        BplusWtyLenUnit:
            modelData.brotherPlusUnit || "",


        Amazondart:
            modelData.amazondart || "",

        Brrefresh:
            modelData.brrefresh || "",

        Barracuda:
            modelData.barracuda || "",

        Bplus:
            modelData.bplus || "",


        Consumable:
            modelData.consumable || "",

        Drum:
            modelData.drumOrder || "",

        WasteToner:
            modelData.wasteToner || "",

        BeltUnit:
            modelData.beltUnit || "",

        Claimorder:
            modelData.claimOrder || ""
    };


    console.log(
        "MODEL DATA:",
        modelData
    );


    console.log(
        "FINAL SAP PAYLOAD:",
        JSON.stringify(
            payload,
            null,
            2
        )
    );


    try {

        const response =
            await fetch(
                "/api/model/create",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(payload)
                }
            );


        const responseText =
            await response.text();


        console.log(
            "CREATE HTTP STATUS:",
            response.status
        );


        console.log(
            "CREATE RAW RESPONSE:",
            responseText
        );


        let result = {};


        if (responseText) {

            try {

                result =
                    JSON.parse(responseText);

            } catch (jsonError) {

                result = {
                    message: responseText
                };
            }
        }


        if (!response.ok) {

            throw new Error(
                result.message ||
                result.error ||
                responseText ||
                "Failed to create model"
            );
        }


        if (result.success === false) {

            throw new Error(
                result.message ||
                "Failed to create model"
            );
        }


        console.log(
            "Model created successfully"
        );


        showSuccessPage();

    } catch (error) {

        console.error(
            "CREATE MODEL ERROR:",
            error
        );


        alert(
            error.message ||
            "Failed to create model"
        );
    }
}

// async function saveModel() {

//     const payload = {
//         Matnr: modelData.matnr,
//         Country: modelData.country,
//         Mbrsh: modelData.mbrsh,
//         Matkl: modelData.matkl,
//         Meins: modelData.meins,
//         Spart: modelData.spart,
//         Ean11: modelData.ean11,
//         Mstae: modelData.mstae,
//         Mstav: modelData.mstav,
//         Spras: modelData.spras,
//         Maktx: modelData.maktx,
//         Vtweg: modelData.vtweg,
//         Werks: modelData.werks,
//         Vmsta: modelData.vmsta,
//         Kschl: modelData.kschl,
//         Selkzb1: modelData.selkzb1,
//         Selkzbr: modelData.selkzbr,
//         Vkorg: modelData.vkorg,
//         Konda: modelData.konda,
//         B1kbetr: modelData.kbetr,
//         B1konwa: modelData.konwa,
//         B1kpein: modelData.kpein,
//         B1kmein: modelData.kmein,
//         B1krech: modelData.krech,
//         B1datab: modelData.datab ? modelData.datab + "T00:00:00" : today + "T00:00:00",
//         B1datbi: modelData.datbi ? modelData.datbi + "T00:00:00" : "9999-12-31T00:00:00",
//         Brkbetr: modelData.kbetr,
//         Brkonwa: modelData.konwa,
//         Brkpein: modelData.kpein,
//         Brkmein: modelData.kmein,
//         Brkrech: modelData.krech,
//         Brdatab: modelData.datab ? modelData.datab + "T00:00:00" : today + "T00:00:00",
//         Brdatbi: modelData.datbi ? modelData.datbi + "T00:00:00" : "9999-12-31T00:00:00",
//         StdWtyType: modelData.stdWtyType,
//         StdWtyLen: modelData.stdWtyLen,
//         StdWtyLenUnit: modelData.stdWtyLenUnit,
//         ExtdWtyType: modelData.extdWtyType,
//         ExtdWtyLen: modelData.extdWtyLen,
//         ExtdWtyLenUnit: modelData.extdWtyLenUnit,
//         BcareWtyType: modelData.bCareWtyType,
//         BcareWtyLen: modelData.bCareWtyLen,
//         BcareWtyLenUnit: modelData.bCareWtyLenUnit,
//         BplusWtyType: modelData.bPlusWtyType,
//         BplusWtyLen: modelData.bPlusWtyLen,
//         BplusWtyLenUnit: modelData.bPlusWtyLenUnit,
//         Amazondart: modelData.amazondart,
//         Brrefresh: modelData.brrefresh,
//         Barracuda: modelData.barracuda,
//         Bplus: modelData.bplus,
//         Consumable: modelData.consumable,
//         Drum: modelData.drumOrder,
//         WasteToner: modelData.wasteToner,
//         BeltUnit: modelData.beltUnit,
//         Claimorder: modelData.claimOrder
//     };

//     console.log(
//         "FINAL MODEL JSON:",
//         JSON.stringify(payload, null, 2)
//     );

//     try {

//         const response = await fetch(
//             "/api/model/create",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(payload)
//             }
//         );

//         const result = await response.json();

//         if (!response.ok || !result.success) {

//             console.error(
//                 "Create Model Error:",
//                 result
//             );

//             alert(
//                 result.message ||
//                 "Failed to create model"
//             );

//             return;
//         }

//         console.log(
//             "Backend response:",
//             result
//         );

//         showSuccessPage();

//     }
//     catch (error) {

//         console.error(
//             "Backend connection error:",
//             error
//         );

//         alert(
//             "Unable to connect to backend"
//         );
//     }
// }

function friendlyStatus(value) {

    return value === "X"
        ? "Configured"
        : "Not Configured";
}

function showSuccessPage() {

    document.querySelector(
        ".stepper"
    ).style.display =
        "none";

    document.getElementById(
        "stepText"
    ).style.display =
        "none";

    document.getElementById(
        "contentArea"
    ).innerHTML = `
 
    <div class="success-card">
 
    <div class="success-animation">
 
    <span class="confetti c1">✦</span>
    <span class="confetti c2">●</span>
    <span class="confetti c3">◆</span>
    <span class="confetti c4">✦</span>
 
    <span class="confetti c5">●</span>
    <span class="confetti c6">◆</span>
    <span class="confetti c7">✦</span>
    <span class="confetti c8">●</span>
 
    <div class="success-icon">
        ✓
    </div>
 
</div>
 
        <h2>
   Model Created Successfully!
</h2>
 
<p>
 
Model
 
<strong>${modelData.matnr}</strong>
 
created for
 
<strong>${modelData.country}</strong>
 
</p>
 
        <div class="success-buttons">
 
           <button
class="btn next"
onclick="toggleCreatedModelDetails()">
 
View Created Model
 
</button>
 
 
            <button
                class="btn save"
                onclick="location.reload()">
 
                Create Another Model
 
            </button>
 
        </div>
 
       
 
        <div id="createdModelPanel"
     class="created-model-panel"
     style="display:none">
 
    <div class="detail-card">
        <h3>Model Details</h3>
 
        <p><b>Model :</b> ${modelData.matnr || "-"}</p>
        <p><b>Country :</b> ${modelData.country || "-"}</p>
        <p><b>EAN :</b> ${modelData.ean11 || "-"}</p>
        <p>
    <b>Cross Plant Status :</b>
    ${modelData.mstae || "-"}
</p>
    </div>
 
    <div class="detail-card">
        <h3>Pricing</h3>
 
        <p>
    <b>Price :</b>
    ${modelData.kbetr || "-"}
    ${modelData.konwa || ""}
</p>

<p>
    <b>B1 Pricing :</b>
    ${friendlyStatus(modelData.selkzb1)}
</p>

<p>
    <b>BR Pricing :</b>
    ${friendlyStatus(modelData.selkzbr)}
</p>

<p>
    <b>Condition Type :</b>
    ${modelData.kschl || "-"}
</p>
    </div>
 
    <div class="detail-card">
        <h3>Warranty</h3>
 
        <p><b>Standard :</b>
        ${modelData.standardWarranty || "-"}</p>
 
        <p><b>Extended :</b>
        ${modelData.extendedWarranty || "-"}</p>
    </div>
 
    <div class="detail-card">
        <h3>Programs</h3>
 
        <p><b>Amazon Dart :</b>
        ${modelData.amazondart || "-"}</p>
 
        <p><b>BR Refresh :</b>
        ${modelData.brrefresh || "-"}</p>
    </div>
 
    <div class="detail-card">
        <h3>Order Types</h3>
 
        <p><b>Drum Order :</b>
        ${modelData.drumOrder || "-"}</p>
 
        <p><b>Claim Order :</b>
        ${modelData.claimOrder || "-"}</p>
    </div>
 
</div>
 
           
 
        </div>
 
    </div>
 
    `;
}

function toggleCreatedModelDetails() {

    const panel =
        document.getElementById(
            "createdModelPanel"
        );

    panel.style.display =
        panel.style.display === "none"
            ? "grid"
            : "none";

}


function goDashboard() {

    if (window.parent.showPage) {

        window.parent.showPage(
            "dashboard"
        );
    }
}
function toggleProgram(id) {

    const card =
        document.getElementById(
            id + "Card"
        );

    const input =
        document.getElementById(id);

    const icon =
        document.getElementById(
            id + "Icon"
        );

    const status =
        document.getElementById(
            id + "Status"
        );

    if (!card || !input) {
        return;
    }

    if (input.value === "X") {

        input.value = "";

        card.classList.remove(
            "active"
        );

        if (icon) {
            icon.innerHTML = "◇";
        }

        if (status) {
            status.innerHTML =
                "Available";
        }

    } else {

        input.value = "X";

        card.classList.add(
            "active"
        );

        if (icon) {
            icon.innerHTML = "◆";
        }

        if (status) {
            status.innerHTML =
                "Configured";
        }
    }
}

function toggleWarranty(
    toggleId,
    textId,
    lengthId,
    unitId,
    autoSixMonths = false
) {

    const toggle =
        document.getElementById(toggleId);

    const text =
        document.getElementById(textId);

    const length =
        document.getElementById(lengthId);

    const unit =
        document.getElementById(unitId);


    if (!toggle) {
        return;
    }


    if (toggle.checked) {

        if (text) {
            text.textContent = "On";
            text.style.color = "#22c55e";
        }


        if (autoSixMonths) {

            if (length) {
                length.value = "6";
                length.disabled = false;
            }


            if (unit) {
                unit.value = "MO";
                unit.disabled = false;
            }

        } else {

            if (length) {
                length.disabled = false;
            }


            if (unit) {
                unit.disabled = false;
            }
        }

    } else {

        if (text) {
            text.textContent = "Off";
            text.style.color = "#94a3b8";
        }


        if (length) {

            if (autoSixMonths) {
                length.value = "";
            }

            length.disabled = true;
        }


        if (unit) {

            if (autoSixMonths) {
                unit.value = "";
            }

            unit.disabled = true;
        }
    }
}

function restoreWarranty(
    toggleId,
    textId,
    lengthId,
    unitId,
    value,
    autoSixMonths = false
) {

    const toggle =
        document.getElementById(toggleId);


    if (!toggle) {
        return;
    }


    toggle.checked =
        value === "X";


    toggleWarranty(
        toggleId,
        textId,
        lengthId,
        unitId,
        autoSixMonths
    );
}