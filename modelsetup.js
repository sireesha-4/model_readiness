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

function loadStep(){
 
    document.getElementById(
        "stepText"
    ).innerHTML =
    `Step ${currentStep} of 6`;
 
    document
    .querySelectorAll(".step")
    .forEach((step,index)=>{
 
        step.classList.remove(
            "active",
            "completed"
        );
 
        const circle =
            step.querySelector(".circle");
 
        if(index + 1 < currentStep){
 
            step.classList.add(
                "completed"
            );
 
            circle.innerHTML =
                "✓";
        }
        else{
 
            circle.innerHTML =
                (index + 1);
        }
 
        if(index + 1 === currentStep){
 
            step.classList.add(
                "active"
            );
        }
    });
 
    const area =
        document.getElementById(
            "contentArea"
        );
 
    if(currentStep === 1){
 
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

        <div class="grid">

<div class="form-group">

    <label>B1 Pricing Required</label>

    <div class="radio-toggle">

        <label class="radio-option yes">
            <input
                type="radio"
                name="b1Pricing"
                value="X"
                ${modelData.selkzb1 === "X" ? "checked" : ""}>
            <span>Yes</span>
        </label>

        <label class="radio-option no">
            <input
                type="radio"
                name="b1Pricing"
                value=""
                ${modelData.selkzb1 !== "X" ? "checked" : ""}>
            <span>No</span>
        </label>

    </div>

</div>


<div class="form-group">

    <label>BR Pricing Required</label>

    <div class="radio-toggle">

        <label class="radio-option yes">
            <input
                type="radio"
                name="brPricing"
                value="X"
                ${modelData.selkzbr === "X" ? "checked" : ""}>
            <span>Yes</span>
        </label>

        <label class="radio-option no">
            <input
                type="radio"
                name="brPricing"
                value=""
                ${modelData.selkzbr !== "X" ? "checked" : ""}>
            <span>No</span>
        </label>

    </div>

</div>

            <div class="form-group">
                <label>Condition Type</label>
                <input
                    type="text"
                    id="kschl"
                    placeholder="PR00">
            </div>

            <div class="form-group">
                <label>Sales Organization</label>
                <input
                    type="text"
                    id="vkorg">
            </div>

            <div class="form-group">
                <label>Division</label>
                <input
                    type="text"
                    id="priceSpart">
            </div>

            <div class="form-group">
                <label>Distribution Channel</label>
                <input
                    type="text"
                    id="priceVtweg">
            </div>

            <div class="form-group">
                <label>Customer Price Group</label>
                <input
                    type="text"
                    id="konda">
            </div>

            <div class="form-group">
                <label>Price Amount</label>
                <input
                    type="number"
                    id="kbetr"
                    step="0.01"
                    placeholder="199.99">
            </div>

            <div class="form-group">
                <label>Currency</label>

                <select id="konwa">
                    <option value="">Select Currency</option>
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                </select>
            </div>

            <div class="form-group">
                <label>Pricing Unit</label>
                <input
                    type="number"
                    id="kpein"
                    placeholder="1">
            </div>

            <div class="form-group">
                <label>Unit Of Measure</label>
                <input
                    type="text"
                    id="kmein"
                    placeholder="EA">
            </div>

            <div class="form-group">
                <label>Calculation Type</label>
                <input
                    type="text"
                    id="krech">
            </div>

            <div class="form-group">
                <label>Valid From</label>
                <input
                    type="date"
                    id="datab">
            </div>

            <div class="form-group">
                <label>Valid To</label>
                <input
                    type="date"
                    id="datbi">
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
 
    if(currentStep === 3){
 
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
                    <option>MON</option>
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
                    <option>MON</option>
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
    <option value="MON">MON</option>
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
    <option value="MON">MON</option>
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

        <h3>Order Types & Final Configuration</h3>

        ${modelContextBar()}

        <div class="order-section-title">
            Select Applicable Order Types
        </div>

        <div class="order-check-grid">

            <label class="order-check-item">

                <input
                    type="checkbox"
                    id="consumable"
                    ${modelData.consumable === "X" ? "checked" : ""}>

                <span class="order-checkbox"></span>

                <span class="order-check-text">
                    Consumable Order
                </span>

            </label>


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
 
if(currentStep === 6){
 
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
 
if(progressBar){

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
    if (currentStep === 2) {

        // setValue("selkzb1", modelData.selkzb1);
        // setValue("selkzbr", modelData.selkzbr);
        setValue("kschl", modelData.kschl);
        setValue("vkorg", modelData.vkorg);
        setValue("priceSpart", modelData.priceSpart);
        setValue("priceVtweg", modelData.priceVtweg);
        setValue("konda", modelData.konda);
        setValue("kbetr", modelData.kbetr);
        setValue("konwa", modelData.konwa);
        setValue("kpein", modelData.kpein);
        setValue("kmein", modelData.kmein);
        setValue("krech", modelData.krech);
        setValue("datab", modelData.datab);
        setValue("datbi", modelData.datbi);
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

    // Save current screen first
    saveCurrentStepData();

    if (currentStep < 6) {

        currentStep++;

        // Render next screen
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

       modelData.selkzb1 =
    document.querySelector(
        'input[name="b1Pricing"\]:checked'
    )?.value || "";

modelData.selkzbr =
    document.querySelector(
        'input[name="brPricing"\]:checked'
    )?.value || "";

        modelData.kschl =
            getValue("kschl");

        modelData.vkorg =
            getValue("vkorg");

        modelData.priceSpart =
            getValue("priceSpart");

        modelData.priceVtweg =
            getValue("priceVtweg");

        modelData.konda =
            getValue("konda");

        modelData.kbetr =
            getValue("kbetr");

        modelData.konwa =
            getValue("konwa");

        modelData.kpein =
            getValue("kpein");

        modelData.kmein =
            getValue("kmein");

        modelData.krech =
            getValue("krech");

        modelData.datab =
            getValue("datab");

        modelData.datbi =
            getValue("datbi");
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
        document.getElementById("consumable")?.checked
            ? "X"
            : "";

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

    const payload = {

        Material: {
            MATNR: modelData.matnr || "",
            WERKS: modelData.werks || "",
            MTART: modelData.mtart || "",
            MBRSH: modelData.mbrsh || "",
            MATKL: modelData.matkl || "",
            MEINS: modelData.meins || "",
            SPART: modelData.spart || "",
            EAN11: modelData.ean11 || "",
            MSTAE: modelData.mstae || "",
            MSTAV: modelData.mstav || "",
            SPRAS: modelData.spras || "",
            MAKTX: modelData.maktx || "",
            VTWEG: modelData.vtweg || "",
            VMSTA: modelData.vmsta || ""
        },

        PriceSetup: {
            MATNR: modelData.matnr || "",
            KSCHL: modelData.kschl || "",
            SELKZB1: modelData.selkzb1 || "",
            SELKZBR: modelData.selkzbr || "",
            VKORG: modelData.vkorg || "",
            SPART: modelData.priceSpart || "",
            VTWEG: modelData.priceVtweg || "",
            KONDA: modelData.konda || "",
            KBETR: modelData.kbetr || "",
            KONWA: modelData.konwa || "",
            KPEIN: modelData.kpein || "",
            KMEIN: modelData.kmein || "",
            KRECH: modelData.krech || "",
            DATAB: modelData.datab || "",
            DATBI: modelData.datbi || ""
        },

        Warranty: {
            MATNR: modelData.matnr || "",
            COUNTRY: modelData.country || "",

            STANDARD: {
                WARRANTY_TYPE: "STANDARD",
                ENABLED: modelData.standardWarranty || "",
                WTY_LEN: modelData.standardLength || "",
                WTY_LEN_UNIT: modelData.standardUnit || ""
            },

            EXTENDED: {
                WARRANTY_TYPE: "EXTENDED",
                ENABLED: modelData.extendedWarranty || "",
                WTY_LEN: modelData.extendedLength || "",
                WTY_LEN_UNIT: modelData.extendedUnit || ""
            },

            BROTHERCARE: {
                WARRANTY_TYPE: "BROTHER_CARE",
                ENABLED: modelData.brotherCareWarranty || "",
                WTY_LEN: modelData.brotherCareLength || "",
                WTY_LEN_UNIT: modelData.brotherCareUnit || ""
            },

           
            BROTHERPLUS: {
                WARRANTY_TYPE: "BROTHER_PLUS",
                ENABLED: modelData.brotherPlusWarranty || "",
                WTY_LEN: modelData.brotherPlusLength || "",
                WTY_LEN_UNIT: modelData.brotherPlusUnit || ""
            }
        },

        Compatibility: {
            MATNR: modelData.matnr || "",
            COUNTRY: modelData.country || "",
            AMAZONDART: modelData.amazondart || "",
            BRREFRESH: modelData.brrefresh || "",
            BARRACUDA: modelData.barracuda || "",
            BPLUS: modelData.bplus || ""
        },

        OrderType: {
            MATNR: modelData.matnr || "",
            COUNTRY: modelData.country || "",
            CONSUMABLE: modelData.consumable || "",
            DRUM: modelData.drumOrder || "",
            WASTE_TONER: modelData.wasteToner || "",
            BELT_UNIT: modelData.beltUnit || "",
            CLAIMORDER: modelData.claimOrder || ""
        }
    };

    console.log(
        "FINAL MODEL JSON:",
        JSON.stringify(payload, null, 2)
    );

    try {

        const response = await fetch(
            "/api/model/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {

            console.error(
                "Create Model Error:",
                result
            );

            alert(
                result.message ||
                "Failed to create model"
            );

            return;
        }

        console.log(
            "Backend response:",
            result
        );

        showSuccessPage();

    }
    catch (error) {

        console.error(
            "Backend connection error:",
            error
        );

        alert(
            "Unable to connect to backend"
        );
    }
}

function friendlyStatus(value) {

    return value === "X"
        ? "Configured"
        : "Not Configured";
}
 
function showSuccessPage(){
 
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
 
function toggleCreatedModelDetails(){
 
    const panel =
        document.getElementById(
            "createdModelPanel"
        );
 
    panel.style.display =
        panel.style.display === "none"
        ? "grid"
        : "none";
 
}
 
 
function goDashboard(){
 
    if(window.parent.showPage){
 
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
                unit.value = "MON";
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