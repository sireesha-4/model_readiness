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

function updateWizardProgress() {

    const progressBar =
        document.getElementById(
            "wizardProgress"
        );

    if (!progressBar) {

        return;
    }

    /*
     * Step 1 = 16.67%
     * Step 2 = 33.33%
     * Step 3 = 50%
     * Step 4 = 66.67%
     * Step 5 = 83.33%
     * Step 6 = 100%
     */
    const progress =
        (
            currentStep / 6
        )
        * 100;

    progressBar.style.width =
        progress + "%";
}

function loadStep() {

    /* =========================================
       STEP COUNTER
    ========================================= */

    const stepText =
        document.getElementById(
            "stepText"
        );

    if (stepText) {

        stepText.innerHTML =
            `Step ${currentStep} of 6`;
    }

    /* =========================================
       UPDATE PROGRESS RULER
       IMPORTANT:
       This must execute BEFORE any step return.
    ========================================= */

    updateWizardProgress();

    /* =========================================
       STEPPER CARDS
    ========================================= */

    document
        .querySelectorAll(".step")
        .forEach((step, index) => {

            step.classList.remove(
                "active",
                "completed"
            );

            const circle =
                step.querySelector(
                    ".circle"
                );

            if (!circle) {

                return;
            }

            if (
                index + 1 <
                currentStep
            ) {

                step.classList.add(
                    "completed"
                );

                circle.innerHTML =
                    "✓";

            } else {

                circle.innerHTML =
                    index + 1;
            }

            if (
                index + 1 ===
                currentStep
            ) {

                step.classList.add(
                    "active"
                );
            }
        });

    /* =========================================
       CONTENT AREA
    ========================================= */

    const area =
        document.getElementById(
            "contentArea"
        );

    if (!area) {

        console.error(
            "contentArea not found"
        );

        return;
    }

    if (currentStep === 1) {

        area.innerHTML = `

        <div class="card">

            <h3>
                Material Information
            </h3>

            <div class="setup-flag-row">

                <div class="setup-flag-info">

                    <div class="setup-flag-title">
                        Material Setup
                    </div>

                    <div class="setup-flag-description">
                        Enable material configuration
                    </div>

                </div>

                <label class="warranty-switch">

                    <input
                        type="checkbox"
                        id="materialFlag"
                        ${modelData.materialFlag === "X"
                ? "checked"
                : ""}>

                    <span class="warranty-slider"></span>

                </label>

            </div>

            <div class="grid">

                <div class="form-group">
                    <label>Material Number</label>
                    <input type="text" id="matnr">
                </div>

                <div class="form-group">

                    <label>Country</label>

                    <select id="country">

                        <option value="">
                            Select Country
                        </option>

                        <option value="US">
                            US
                        </option>

                        <option value="CA">
                            CA
                        </option>

                    </select>

                </div>

                <div class="form-group">
                    <label>Plant</label>
                    <input type="text" id="werks">
                </div>


                <div class="form-group">
                    <label>Material Type</label>
                    <input type="text" id="mtart">
                </div>

                <div class="form-group">

                    <label>
                        Industry Sector
                    </label>

                    <input
                        type="text"
                        id="mbrsh"
                        value="${modelData.mbrsh || "M"}">

                </div>

                <div class="form-group">
                    <label>Material Group</label>
                    <input type="text" id="matkl">
                </div>

                <div class="form-group">

                    <label>
                        Base Unit Of Measure
                    </label>

                    <input
                        type="text"
                        id="meins"
                        value="${modelData.meins || "EA"}">

                </div>

                <div class="form-group">

                    <label>Division</label>

                    <input
                        type="text"
                        id="spart"
                        value="${modelData.spart || "10"}">

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

                    <input
                        type="text"
                        id="spras"
                        value="${modelData.spras || "EN"}">

                </div>

                <div class="form-group">
                    <label>Material Description</label>
                    <input type="text" id="maktx">
                </div>


                <div class="form-group">

                    <label>
                        Distribution Channel
                    </label>

                    <input
                        type="text"
                        id="vtweg"
                        value="${modelData.vtweg || "30"}">

                </div>

                <div class="form-group">
                    <label>Distribution Material Status</label>
                    <input type="text" id="vmsta">
                </div>

            </div>

            <div class="btn-row">

                <button
                    class="btn next"
                    onclick="nextStep()">

                    Next →

                </button>

            </div>

        </div>
    `;

        restoreStepData();

        return;
    }

    
    if (currentStep === 2) {

        area.innerHTML = `

    <div class="card">

        <h3>Price Setup</h3>

${modelContextBar()}

<div class="setup-flag-row">

    <div>

        <div class="setup-flag-title">
            Price Setup
        </div>

        <div class="setup-flag-description">
            Enable pricing configuration
        </div>

    </div>

    <label class="warranty-switch">

        <input
            type="checkbox"
            id="priceFlag"
            ${modelData.priceFlag === "X"
                ? "checked"
                : ""}>

        <span class="warranty-slider"></span>

    </label>

</div>

        <!-- B1 PRICE SETUP -->

        <div class="create-pricing-block">

            <div class="create-pricing-header">

                <div class="create-pricing-title">
                    Barracuda Price Details
                </div>

                <div class="create-pricing-toggle">

                    <span>Barracuda Price Setup</span>

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
                        <label>Material Price</label>
                        <input
                            type="number"
                            id="b1Kbetr"
                            step="0.01"
                            placeholder="199.99">
                    </div>

                    <div class="form-group">
                        <label>Currency</label>

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
                        <label>Pricing Unit</label>

                        <input
    type="number"
    id="b1Kpein"
    value="${modelData.b1Kpein || '1'}">

                    </div>

                    <div class="form-group">
                        <label>Condition Type</label>

                        <input
    type="text"
    id="Kschl"
    value="${modelData.Kschl || 'ZPR0'}">

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
                        <label>Unit Of Measure</label>

                        <input
    type="text"
    id="b1Kmein"
    value="${modelData.b1Kmein || modelData.meins || 'EA'}">

                    </div>

                    <div class="form-group">
    <label>Calculation Type</label>

    <input
        type="text"
        id="b1Krech"
        value="${modelData.b1Krech || 'C'}">
</div>

                    <div class="form-group">
                        <label>Valid From</label>

                        <input
                            type="date"
                            id="b1Datab">

                    </div>

                    <div class="form-group">
                        <label>Valid To</label>

                        <input
    type="date"
    id="b1Datbi"
    value="${modelData.b1Datbi || '9999-12-31'}">

                    </div>

                </div>

            </div>

        </div>


        <!-- BR PRICE SETUP -->

        <div class="create-pricing-block">

            <div class="create-pricing-header">

                <div class="create-pricing-title">
                    Auto Reorder Price Details
                </div>

                <div class="create-pricing-toggle">

                    <span>Auto Reorder Price Setup</span>

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
                        <label>Material Price</label>

                        <input
                            type="number"
                            id="brKbetr"
                            step="0.01"
                            placeholder="199.99">

                    </div>

                    <div class="form-group">
                        <label>Currency</label>

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
                        <label>Pricing Unit</label>

                        <input
    type="number"
    id="brKpein"
    value="${modelData.brKpein || '1'}">

                    </div>

                    <div class="form-group">
                        <label>Condition Type</label>

                        <input
    type="text"
    id="Kschl"
    value="${modelData.Kschl || 'ZPR0'}">

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
                        <label>Unit Of Measure</label>

                        <input
    type="text"
    id="brKmein"
    value="${modelData.brKmein || modelData.meins || 'EA'}">

                    </div>

                    <div class="form-group">
                        <label>Calculation Type</label>

                        <input
    type="text"
    id="brKrech"
    value="${modelData.brKrech || 'C'}">

                    </div>

                    <div class="form-group">
                        <label>Valid From</label>

                        <input
                            type="date"
                            id="brDatab">

                    </div>

                    <div class="form-group">
                        <label>Valid To</label>

                        <input
    type="date"
    id="brDatbi"
    value="${modelData.brDatbi || '9999-12-31'}">

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

<div class="setup-flag-row">

    <div>

        <div class="setup-flag-title">
            Warranty Setup
        </div>

        <div class="setup-flag-description">
            Enable warranty configuration
        </div>

    </div>

    <label class="warranty-switch">

        <input
            type="checkbox"
            id="warrantyFlag"
            ${modelData.warrantyFlag === "X"
                ? "checked"
                : ""}>

        <span class="warranty-slider"></span>

    </label>

</div>

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
        'standardUnit',
        'standardSkuNo',
        false
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

                        <option value="">
                            Select Unit
                        </option>

                        <option value="YR">
                            YR
                        </option>

                        <option value="MO">
                            MON
                        </option>

                    </select>

                </div>

                <div class="form-group">

                    <label>Standard Warranty SKU</label>

                    <input
                        type="text"
                        id="standardSkuNo"
                        placeholder="Auto populated"
                        disabled>

                </div>

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
        'extendedUnit',
        'extendedSkuNo',
        false
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

                        <option value="">
                            Select Unit
                        </option>

                        <option value="YR">
                            YR
                        </option>

                        <option value="MO">
                            MON
                        </option>

                    </select>

                </div>

                <div class="form-group">

                    <label>Extended Warranty SKU</label>

                    <input
                        type="text"
                        id="extendedSkuNo"
                        placeholder="Auto populated"
                        disabled>

                </div>

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
        'brotherCareSkuNo',
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
                        placeholder="6">

                </div>

                <div class="form-group">

                    <label>Unit</label>

                    <select id="brotherCareUnit">

                        <option value="">
                            Select Unit
                        </option>

                        <option value="YR">
                            YR
                        </option>

                        <option value="MO">
                            MON
                        </option>

                    </select>

                </div>

                <div class="form-group">

                    <label>Brother Care SKU</label>

                    <input
                        type="text"
                        id="brotherCareSkuNo"
                        placeholder="Auto populated"
                        disabled>

                </div>

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
        'brotherPlusSkuNo',
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
                        placeholder="6">

                </div>

                <div class="form-group">

                    <label>Unit</label>

                    <select id="brotherPlusUnit">

                        <option value="">
                            Select Unit
                        </option>

                        <option value="YR">
                            YR
                        </option>

                        <option value="MO">
                            MON
                        </option>

                    </select>

                </div>

                <div class="form-group">

                    <label>Brother Plus SKU</label>

                    <input
                        type="text"
                        id="brotherPlusSkuNo"
                        placeholder="Auto populated"
                        disabled>

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

        applyWarrantyCountryRules();

        return;
    }


    if (currentStep === 4) {

        area.innerHTML = `

        <div class="card">

           <h3>
    Compatibility & Programs
</h3>

${modelContextBar()}


<div class="setup-flag-row">

    <div>

        <div class="setup-flag-title">
            Compatibility Setup
        </div>

        <div class="setup-flag-description">
            Enable compatibility and program configuration
        </div>

    </div>

    <label class="warranty-switch">

        <input
            type="checkbox"
            id="compatableFlag"
            ${modelData.compatableFlag === "X"
                ? "checked"
                : ""}>

        <span class="warranty-slider"></span>

    </label>

</div>

<div class="compat-section-heading">
    Program Compatibility
</div>

            <div class="program-grid">


                <!-- AMAZON DART -->

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


                <!-- BR REFRESH -->

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


                <!-- BARRACUDA -->

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


                <!-- BROTHER PLUS -->

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


            <!-- =====================================
                 NEW BARRACUDA DETAILS
            ====================================== -->

            <div
                id="barracudaExtraSection"
                class="barracuda-extra-section"
                style="display:none;">


                <div class="barracuda-extra-header">

                    <div>

                        <div class="barracuda-extra-title">
                            Barracuda Classification
                        </div>
                    
                    </div>

                    <div class="barracuda-active-badge">

                        <span class="barracuda-active-dot">
                        </span>

                        Barracuda

                    </div>

                </div>


                <!-- =================================
                     CLASSIFICATION CHECKBOXES
                ================================== -->

                <div class="classification-grid">


                    <label class="classification-option">

                        <input
                            type="checkbox"
                            id="basic"
                            ${modelData.basic === "X"
                ? "checked"
                : ""}>

                        <span class="classification-checkbox">
                            ✓
                        </span>

                        <span class="classification-label">
                            Basic
                        </span>

                    </label>


                    <label class="classification-option">

                        <input
                            type="checkbox"
                            id="occasional"
                            ${modelData.occasional === "X"
                ? "checked"
                : ""}>

                        <span class="classification-checkbox">
                            ✓
                        </span>

                        <span class="classification-label">
                            Occasional
                        </span>

                    </label>

                    <label class="classification-option">

                        <input
                            type="checkbox"
                            id="moderate"
                            ${modelData.moderate === "X"
                ? "checked"
                : ""}>

                        <span class="classification-checkbox">
                            ✓
                        </span>

                        <span class="classification-label">
                            Moderate
                        </span>

                    </label>

                    <label class="classification-option">

                        <input
                            type="checkbox"
                            id="frequent"
                            ${modelData.frequent === "X"
                ? "checked"
                : ""}>

                        <span class="classification-checkbox">
                            ✓
                        </span>

                        <span class="classification-label">
                            Frequent
                        </span>

                    </label>

                    <label class="classification-option">

                        <input
                            type="checkbox"
                            id="high"
                            ${modelData.high === "X"
                ? "checked"
                : ""}>

                        <span class="classification-checkbox">
                            ✓
                        </span>

                        <span class="classification-label">
                            High
                        </span>

                    </label>

                    <label class="classification-option">

                        <input
                            type="checkbox"
                            id="power"
                            ${modelData.power === "X"
                ? "checked"
                : ""}>

                        <span class="classification-checkbox">
                            ✓
                        </span>

                        <span class="classification-label">
                            Power
                        </span>

                    </label>

                </div>

                <!-- =================================
                     DETAIL FIELDS
                ================================== -->

                <div class="barracuda-details-grid">

    <div class="form-group">

        <label>
            Product Type
        </label>

        <input
            type="text"
            id="productType"
            value="${modelData.productType || ""}"
            placeholder="e.g. INKJET"
            autocomplete="off"
            oninput="
                this.value =
                this.value.toUpperCase()
            ">

    </div>

    <div class="form-group">

        <label>
            Standard Warranty
        </label>

        <input
            type="number"
            id="standardWarr"
            value="${modelData.standardWarr || ""}"
            min="0"
            placeholder="e.g. 12">

    </div>

</div>
            </div>


            <!-- =====================================
                 NAVIGATION
            ====================================== -->

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

        restoreProgramState(
            "amazondart"
        );

        restoreProgramState(
            "brrefresh"
        );

        restoreProgramState(
            "barracuda"
        );

        restoreProgramState(
            "bplus"
        );

        updateBarracudaExtraSection();

        return;
    }

    if (currentStep === 5) {

        area.innerHTML = `

        <div class="card">

            <h3>
    Order Types & Consumables
</h3>

${modelContextBar()}


<div class="setup-flag-row">

    <div>

        <div class="setup-flag-title">
            Order Type Setup
        </div>

        <div class="setup-flag-description">
            Enable order type and consumable configuration
        </div>

    </div>

    <label class="warranty-switch">

        <input
            type="checkbox"
            id="orderTypeFlag"
            ${modelData.orderTypeFlag === "X"
                ? "checked"
                : ""}>

        <span class="warranty-slider"></span>

    </label>

</div>


<div class="order-section-title order-types-heading">

    Select Applicable Order Types

</div>


            <div class="order-type-form">


                <!-- ================================= -->
                <!-- DRUM ORDER -->
                <!-- ================================= -->

                <div class="order-type-row">

                    <div class="order-type-column">

                        <label>
                            Drum Order
                        </label>

                        <div class="order-toggle-box">

                            <span>
                                Drum Order
                            </span>

                            <label class="warranty-switch">

                                <input
                                    type="checkbox"
                                    id="drumOrder"
                                    ${modelData.drumOrder === "X"
                ? "checked"
                : ""}
                                    onchange="
                                        toggleOrderConsumable(
                                            'drumOrder',
                                            'drConsumableGroup',
                                            'drConsumable'
                                        )
                                    ">

                                <span class="warranty-slider">
                                </span>

                            </label>

                        </div>

                    </div>


                    <div
                        class="order-consumable-column"
                        id="drConsumableGroup">

                        <label>
                            Consumable
                        </label>

                        <input
                            type="text"
                            id="drConsumable"
                            value="${modelData.drConsumable || ""}"
                            placeholder="Enter Drum consumable"
                            autocomplete="off"
                            oninput="
                                this.value =
                                this.value.toUpperCase()
                            ">

                    </div>

                </div>


                <!-- ================================= -->
                <!-- WASTE TONER -->
                <!-- ================================= -->

                <div class="order-type-row">

                    <div class="order-type-column">

                        <label>
                            Waste Toner
                        </label>

                        <div class="order-toggle-box">

                            <span>
                                Waste Toner
                            </span>

                            <label class="warranty-switch">

                                <input
                                    type="checkbox"
                                    id="wasteToner"
                                    ${modelData.wasteToner === "X"
                ? "checked"
                : ""}
                                    onchange="
                                        toggleOrderConsumable(
                                            'wasteToner',
                                            'wtConsumableGroup',
                                            'wtConsumable'
                                        )
                                    ">

                                <span class="warranty-slider">
                                </span>

                            </label>

                        </div>

                    </div>

                    <div
                        class="order-consumable-column"
                        id="wtConsumableGroup">

                        <label>
                            Consumable
                        </label>

                        <input
                            type="text"
                            id="wtConsumable"
                            value="${modelData.wtConsumable || ""}"
                            placeholder="Enter Waste Toner consumable"
                            autocomplete="off"
                            oninput="
                                this.value =
                                this.value.toUpperCase()
                            ">

                    </div>

                </div>

                <!-- ================================= -->
                <!-- BELT UNIT -->
                <!-- ================================= -->

                <div class="order-type-row">

                    <div class="order-type-column">

                        <label>
                            Belt Unit
                        </label>

                        <div class="order-toggle-box">

                            <span>
                                Belt Unit
                            </span>

                            <label class="warranty-switch">

                                <input
                                    type="checkbox"
                                    id="beltUnit"
                                    ${modelData.beltUnit === "X"
                ? "checked"
                : ""}
                                    onchange="
                                        toggleOrderConsumable(
                                            'beltUnit',
                                            'buConsumableGroup',
                                            'buConsumable'
                                        )
                                    ">

                                <span class="warranty-slider">
                                </span>

                            </label>

                        </div>

                    </div>


                    <div
                        class="order-consumable-column"
                        id="buConsumableGroup">

                        <label>
                            Consumable
                        </label>

                        <input
                            type="text"
                            id="buConsumable"
                            value="${modelData.buConsumable || ""}"
                            placeholder="Enter Belt Unit consumable"
                            autocomplete="off"
                            oninput="
                                this.value =
                                this.value.toUpperCase()
                            ">

                    </div>

                </div>

                <!-- ================================= -->
                <!-- BACKUP ORDER -->
                <!-- SAP FIELD = CLAIMORDER -->
                <!-- ================================= -->

                <div class="order-type-row">

                    <div class="order-type-column">

                        <label>
                            Backup Order
                        </label>

                        <div class="order-toggle-box">

                            <span>
                                Backup Order
                            </span>

                            <label class="warranty-switch">

                                <input
                                    type="checkbox"
                                    id="claimOrder"
                                    ${modelData.claimOrder === "X"
                ? "checked"
                : ""}
                                    onchange="
                                        toggleOrderConsumable(
                                            'claimOrder',
                                            'coConsumableGroup',
                                            'coConsumable'
                                        )
                                    ">

                                <span class="warranty-slider">
                                </span>

                            </label>

                        </div>

                    </div>


                    <div
                        class="order-consumable-column"
                        id="coConsumableGroup">

                        <label>
                            Consumable
                        </label>

                        <input
                            type="text"
                            id="coConsumable"
                            value="${modelData.coConsumable || ""}"
                            placeholder="Enter Backup Order consumable"
                            autocomplete="off"
                            oninput="
                                this.value =
                                this.value.toUpperCase()
                            ">

                    </div>

                </div>


            </div>

            <div
                id="orderTypeError"
                class="order-type-error"
                style="display:none;">
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

        restoreOrderConsumables();

        return;
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

    <h4>
        Pricing
    </h4>

    <p>
        ${modelData.selkzb1 === "X"
                ? "Barracuda Pricing Configured"
                : modelData.selkzbr === "X"
                    ? "Auto Reorder Pricing Configured"
                    : "No Pricing Setup Selected"
            }
    </p>

</div>
 
            <div class="review-card">
 
                <h4>Warranty</h4>
 
                <p>
                    Warranty Details Added
                </p>
 
            </div>
 
            <div class="review-card">

    <h4>
        Programs
    </h4>

    <p>
        Compatibility Configured
    </p>

</div>


<div class="review-card">

    <h4>
        Order Types & Consumables
    </h4>

    <p>
        <b>Drum Order :</b>
        ${modelData.drumOrder === "X"
                ? modelData.drConsumable || "-"
                : "Not Selected"
            }
    </p>

    <p>
        <b>Waste Toner :</b>
        ${modelData.wasteToner === "X"
                ? modelData.wtConsumable || "-"
                : "Not Selected"
            }
    </p>

    <p>
        <b>Belt Unit :</b>
        ${modelData.beltUnit === "X"
                ? modelData.buConsumable || "-"
                : "Not Selected"
            }
    </p>

    <p>
        <b>Backup Order :</b>
        ${modelData.claimOrder === "X"
                ? modelData.coConsumable || "-"
                : "Not Selected"
            }
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
                "Auto Reorder Price Setup is already selected. Only one pricing setup can be created at a time."
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
                "Barracuda Price Setup is already selected. Only one pricing setup can be created at a time."
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
            ? document.getElementById(
                "b1PricingFields"
            )
            : document.getElementById(
                "brPricingFields"
            );

    if (!fields) {
        return;
    }

    const inputs =
        fields.querySelectorAll(
            "input"
        );

    inputs.forEach(
        function (input) {

            if (
                input.id === "Spart" &&
                !input.value
            ) {

                input.value =
                    modelData.spart || "";
            }

            if (
                input.id === "Vtweg" &&
                !input.value
            ) {

                input.value =
                    modelData.vtweg || "";
            }
        }
    );
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

function restoreOrderConsumables() {

    const orderConfigurations = [

        {
            checkboxId:
                "drumOrder",

            groupId:
                "drConsumableGroup",

            inputId:
                "drConsumable",

            selected:
                modelData.drumOrder === "X",

            value:
                modelData.drConsumable || ""
        },

        {
            checkboxId:
                "wasteToner",

            groupId:
                "wtConsumableGroup",

            inputId:
                "wtConsumable",

            selected:
                modelData.wasteToner === "X",

            value:
                modelData.wtConsumable || ""
        },

        {
            checkboxId:
                "beltUnit",

            groupId:
                "buConsumableGroup",

            inputId:
                "buConsumable",

            selected:
                modelData.beltUnit === "X",

            value:
                modelData.buConsumable || ""
        },

        {
            checkboxId:
                "claimOrder",

            groupId:
                "coConsumableGroup",

            inputId:
                "coConsumable",

            selected:
                modelData.claimOrder === "X",

            value:
                modelData.coConsumable || ""
        }

    ];


    orderConfigurations.forEach(
        function (config) {

            const checkbox =
                document.getElementById(
                    config.checkboxId
                );

            const group =
                document.getElementById(
                    config.groupId
                );

            const input =
                document.getElementById(
                    config.inputId
                );


            if (
                !checkbox ||
                !group ||
                !input
            ) {

                return;
            }

            checkbox.checked =
                config.selected;


            input.value =
                config.value;


            input.disabled =
                !config.selected;

            if (config.selected) {

                group.classList.remove(
                    "order-consumable-disabled"
                );

            } else {

                group.classList.add(
                    "order-consumable-disabled"
                );
            }
        }
    );
}

function validateOrderTypeConsumables() {

    const errorBox =
        document.getElementById(
            "orderTypeError"
        );

    let message = "";

    if (
        modelData.drumOrder === "X" &&
        !modelData.drConsumable
    ) {

        message =
            "Please enter a consumable for Drum Order.";
    }

    else if (
        modelData.wasteToner === "X" &&
        !modelData.wtConsumable
    ) {

        message =
            "Please enter a consumable for Waste Toner.";
    }

    else if (
        modelData.beltUnit === "X" &&
        !modelData.buConsumable
    ) {

        message =
            "Please enter a consumable for Belt Unit.";
    }

    else if (
        modelData.claimOrder === "X" &&
        !modelData.coConsumable
    ) {

        message =
            "Please enter a consumable for Backup Order.";
    }

    if (!message) {

        if (errorBox) {

            errorBox.textContent =
                "";

            errorBox.style.display =
                "none";
        }

        return true;
    }

    if (errorBox) {

        errorBox.textContent =
            message;

        errorBox.style.display =
            "block";
    }

    return false;
}

function restoreStepData() {

    // STEP 1 - Material Information
    if (currentStep === 1) {

        setValue("matnr", modelData.matnr);
        setValue("country", modelData.country);
        setValue("werks", modelData.werks);
        setValue("mtart", modelData.mtart);

        setValue(
            "mbrsh",
            modelData.mbrsh || "M"
        );
        setValue("matkl", modelData.matkl);
        setValue(
            "meins",
            modelData.meins || "EA"
        );
        setValue(
            "spart",
            modelData.spart || "10"
        );
        setValue("ean11", modelData.ean11);
        setValue("mstae", modelData.mstae);
        setValue("mstav", modelData.mstav);
        setValue(
            "spras",
            modelData.spras || "EN"
        );
        setValue("maktx", modelData.maktx);
        setValue(
            "vtweg",
            modelData.vtweg || "30"
        );
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
                modelData.b1Kpein || "1"
            );

            setB1Value(
                "#Kschl",
                modelData.Kschl || "ZPR0"
            );

            setB1Value(
                "#Vkorg",
                modelData.Vkorg
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
                modelData.b1Kmein ||
                modelData.meins ||
                "EA"
            );

            setB1Value(
                "#b1Krech",
                modelData.b1Krech || "C"
            );

            setB1Value(
                "#b1Datab",
                modelData.b1Datab
            );

            setB1Value(
                "#b1Datbi",
                modelData.b1Datbi ||
                "9999-12-31"
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
                modelData.brKpein || "1"
            );

            setBRValue(
                "#Kschl",
                modelData.Kschl || "ZPR0"
            );

            setBRValue(
                "#Vkorg",
                modelData.Vkorg
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
                modelData.brKmein ||
                modelData.meins ||
                "EA"
            );

            setBRValue(
                "#brKrech",
                modelData.brKrech || "C"
            );

            setBRValue(
                "#brDatab",
                modelData.brDatab
            );

            setBRValue(
                "#brDatbi",
                modelData.brDatbi ||
                "9999-12-31"
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
            "standardSkuNo",
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
            "extendedSkuNo",
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
            "brotherCareSkuNo",
            modelData.brotherCareWarranty
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
            "brotherPlusSkuNo",
            modelData.brotherPlusWarranty
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
                "Barracuda and Auto Reorder pricing cannot be created at the same time. Please select only one pricing setup."
            );

            return;
        }
    }

    // =====================================
    // STEP 5 VALIDATION
    // =====================================

    if (currentStep === 5) {

        if (
            !validateOrderTypeConsumables()
        ) {

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

    // =========================================
    // STEP 1 - MATERIAL
    // =========================================

    if (currentStep === 1) {

        modelData.matnr =
            getValue("matnr");

        modelData.country =
            getValue("country");

        modelData.werks =
            getValue("werks");

        modelData.mtart =
            getValue("mtart");

        modelData.materialFlag =
            document.getElementById(
                "materialFlag"
            )?.checked
                ? "X"
                : "";

        modelData.mbrsh =
            getValue("mbrsh");

        modelData.matkl =
            getValue("matkl");

        modelData.meins =
            getValue("meins");

        modelData.spart =
            getValue("spart");

        modelData.ean11 =
            getValue("ean11");

        modelData.mstae =
            getValue("mstae");

        modelData.mstav =
            getValue("mstav");

        modelData.spras =
            getValue("spras");

        modelData.maktx =
            getValue("maktx");

        modelData.vtweg =
            getValue("vtweg");

        modelData.vmsta =
            getValue("vmsta");

        return;
    }

    // =========================================
    // STEP 2 - PRICING
    // =========================================

    if (currentStep === 2) {

        const priceFlag =
            document.getElementById(
                "priceFlag"
            );

        const b1Toggle =
            document.getElementById(
                "b1PricingToggle"
            );

        const brToggle =
            document.getElementById(
                "brPricingToggle"
            );


        modelData.priceFlag =
            priceFlag?.checked
                ? "X"
                : "";


        modelData.selkzb1 =
            b1Toggle?.checked
                ? "X"
                : "";


        modelData.selkzbr =
            brToggle?.checked
                ? "X"
                : "";


        // -------------------------
        // B1 PRICING
        // -------------------------

        if (modelData.selkzb1 === "X") {

            const block =
                document.getElementById(
                    "b1PricingFields"
                );


            if (block) {

                modelData.b1Kbetr =
                    block.querySelector(
                        "#b1Kbetr"
                    )?.value || "";

                modelData.b1Konwa =
                    block.querySelector(
                        "#b1Konwa"
                    )?.value || "";

                modelData.b1Kpein =
                    block.querySelector(
                        "#b1Kpein"
                    )?.value || "";

                modelData.Kschl =
                    block.querySelector(
                        "#Kschl"
                    )?.value || "";

                modelData.Vkorg =
                    block.querySelector(
                        "#Vkorg"
                    )?.value || "";

                modelData.Spart =
                    block.querySelector(
                        "#Spart"
                    )?.value || "";

                modelData.Vtweg =
                    block.querySelector(
                        "#Vtweg"
                    )?.value || "";

                modelData.Konda =
                    block.querySelector(
                        "#Konda"
                    )?.value || "";

                modelData.b1Kmein =
                    block.querySelector(
                        "#b1Kmein"
                    )?.value || "";

                modelData.b1Krech =
                    block.querySelector(
                        "#b1Krech"
                    )?.value || "";

                modelData.b1Datab =
                    block.querySelector(
                        "#b1Datab"
                    )?.value || "";

                modelData.b1Datbi =
                    block.querySelector(
                        "#b1Datbi"
                    )?.value || "";
            }

        } else {

            modelData.b1Kbetr = "";
            modelData.b1Konwa = "";
            modelData.b1Kpein = "";
            modelData.b1Kmein = "";
            modelData.b1Krech = "";
            modelData.b1Datab = "";
            modelData.b1Datbi = "";
        }

        // -------------------------
        // BR PRICING
        // -------------------------

        if (modelData.selkzbr === "X") {

            const block =
                document.getElementById(
                    "brPricingFields"
                );

            if (block) {

                modelData.brKbetr =
                    block.querySelector(
                        "#brKbetr"
                    )?.value || "";

                modelData.brKonwa =
                    block.querySelector(
                        "#brKonwa"
                    )?.value || "";

                modelData.brKpein =
                    block.querySelector(
                        "#brKpein"
                    )?.value || "";

                modelData.Kschl =
                    block.querySelector(
                        "#Kschl"
                    )?.value || "";

                modelData.Vkorg =
                    block.querySelector(
                        "#Vkorg"
                    )?.value || "";

                modelData.Spart =
                    block.querySelector(
                        "#Spart"
                    )?.value || "";

                modelData.Vtweg =
                    block.querySelector(
                        "#Vtweg"
                    )?.value || "";

                modelData.Konda =
                    block.querySelector(
                        "#Konda"
                    )?.value || "";

                modelData.brKmein =
                    block.querySelector(
                        "#brKmein"
                    )?.value || "";

                modelData.brKrech =
                    block.querySelector(
                        "#brKrech"
                    )?.value || "";

                modelData.brDatab =
                    block.querySelector(
                        "#brDatab"
                    )?.value || "";

                modelData.brDatbi =
                    block.querySelector(
                        "#brDatbi"
                    )?.value || "";
            }

        } else {

            modelData.brKbetr = "";
            modelData.brKonwa = "";
            modelData.brKpein = "";
            modelData.brKmein = "";
            modelData.brKrech = "";
            modelData.brDatab = "";
            modelData.brDatbi = "";
        }

        // Child selection automatically enables PRICE_FLAG
        if (
            modelData.selkzb1 === "X" ||
            modelData.selkzbr === "X"
        ) {

            modelData.priceFlag = "X";
        }


        return;
    }

    // =========================================
    // STEP 3 - WARRANTY
    // =========================================

    if (currentStep === 3) {

        modelData.warrantyFlag =
            document.getElementById(
                "warrantyFlag"
            )?.checked
                ? "X"
                : "";

        modelData.standardWarranty =
            document.getElementById(
                "standardWarranty"
            )?.checked
                ? "X"
                : "";

        modelData.standardLength =
            getValue("standardLength");

        modelData.standardUnit =
            getValue("standardUnit");

        modelData.standardSkuNo =
            getValue("standardSkuNo");

        modelData.extendedWarranty =
            document.getElementById(
                "extendedWarranty"
            )?.checked
                ? "X"
                : "";

        modelData.extendedLength =
            getValue("extendedLength");

        modelData.extendedUnit =
            getValue("extendedUnit");

        modelData.extendedSkuNo =
            getValue("extendedSkuNo");


        modelData.brotherCareWarranty =
            document.getElementById(
                "brotherCareWarranty"
            )?.checked
                ? "X"
                : "";

        modelData.brotherCareLength =
            getValue("brotherCareLength");

        modelData.brotherCareUnit =
            getValue("brotherCareUnit");

        modelData.brotherCareSkuNo =
            getValue("brotherCareSkuNo");

        modelData.brotherPlusWarranty =
            document.getElementById(
                "brotherPlusWarranty"
            )?.checked
                ? "X"
                : "";

        modelData.brotherPlusLength =
            getValue("brotherPlusLength");

        modelData.brotherPlusUnit =
            getValue("brotherPlusUnit");

        modelData.brotherPlusSkuNo =
            getValue("brotherPlusSkuNo");

        // US rule
        if (modelData.country === "US") {

            modelData.brotherCareWarranty = "";
            modelData.brotherCareLength = "";
            modelData.brotherCareUnit = "";
            modelData.brotherCareSkuNo = "";
        }

        // Canada rule
        if (modelData.country === "CA") {

            modelData.brotherPlusWarranty = "";
            modelData.brotherPlusLength = "";
            modelData.brotherPlusUnit = "";
            modelData.brotherPlusSkuNo = "";
        }

        // Child selection automatically enables WARRANTY_FLAG
        if (
            modelData.standardWarranty === "X" ||
            modelData.extendedWarranty === "X" ||
            modelData.brotherCareWarranty === "X" ||
            modelData.brotherPlusWarranty === "X"
        ) {

            modelData.warrantyFlag = "X";
        }

        return;
    }

    // =========================================
    // STEP 4 - COMPATIBILITY
    // =========================================

    if (currentStep === 4) {

        modelData.compatableFlag =
            document.getElementById(
                "compatableFlag"
            )?.checked
                ? "X"
                : "";

        modelData.amazondart =
            getValue("amazondart");

        modelData.brrefresh =
            getValue("brrefresh");

        modelData.barracuda =
            getValue("barracuda");

        modelData.bplus =
            getValue("bplus");

        // -------------------------
        // BARRACUDA
        // -------------------------

        if (modelData.barracuda === "X") {

            modelData.basic =
                document.getElementById(
                    "basic"
                )?.checked
                    ? "X"
                    : "";

            modelData.occasional =
                document.getElementById(
                    "occasional"
                )?.checked
                    ? "X"
                    : "";

            modelData.moderate =
                document.getElementById(
                    "moderate"
                )?.checked
                    ? "X"
                    : "";

            modelData.frequent =
                document.getElementById(
                    "frequent"
                )?.checked
                    ? "X"
                    : "";

            modelData.high =
                document.getElementById(
                    "high"
                )?.checked
                    ? "X"
                    : "";

            modelData.power =
                document.getElementById(
                    "power"
                )?.checked
                    ? "X"
                    : "";


            modelData.productType =
                getValue(
                    "productType"
                )
                    .trim()
                    .toUpperCase();


            modelData.standardWarr =
                getValue(
                    "standardWarr"
                )
                    .trim();

        } else {

            modelData.basic = "";
            modelData.occasional = "";
            modelData.moderate = "";
            modelData.frequent = "";
            modelData.high = "";
            modelData.power = "";

            modelData.productType = "";
            modelData.standardWarr = "";
        }

        // Child selection automatically enables COMPATABLE_FLAG
        if (
            modelData.amazondart === "X" ||
            modelData.brrefresh === "X" ||
            modelData.barracuda === "X" ||
            modelData.bplus === "X"
        ) {

            modelData.compatableFlag = "X";
        }

        return;
    }

    // =========================================
    // STEP 5 - ORDER TYPES
    // =========================================

    if (currentStep === 5) {

        modelData.orderTypeFlag =
            document.getElementById(
                "orderTypeFlag"
            )?.checked
                ? "X"
                : "";

        // Drum
        modelData.drumOrder =
            document.getElementById(
                "drumOrder"
            )?.checked
                ? "X"
                : "";

        modelData.drConsumable =
            modelData.drumOrder === "X"
                ? getValue(
                    "drConsumable"
                )
                    .trim()
                    .toUpperCase()
                : "";

        // Waste toner
        modelData.wasteToner =
            document.getElementById(
                "wasteToner"
            )?.checked
                ? "X"
                : "";

        modelData.wtConsumable =
            modelData.wasteToner === "X"
                ? getValue(
                    "wtConsumable"
                )
                    .trim()
                    .toUpperCase()
                : "";

        // Belt unit
        modelData.beltUnit =
            document.getElementById(
                "beltUnit"
            )?.checked
                ? "X"
                : "";

        modelData.buConsumable =
            modelData.beltUnit === "X"
                ? getValue(
                    "buConsumable"
                )
                    .trim()
                    .toUpperCase()
                : "";

        // Backup order
        modelData.claimOrder =
            document.getElementById(
                "claimOrder"
            )?.checked
                ? "X"
                : "";

        modelData.coConsumable =
            modelData.claimOrder === "X"
                ? getValue(
                    "coConsumable"
                )
                    .trim()
                    .toUpperCase()
                : "";

        // Child selection automatically enables ORDERTYPE_FLAG
        if (
            modelData.drumOrder === "X" ||
            modelData.wasteToner === "X" ||
            modelData.beltUnit === "X" ||
            modelData.claimOrder === "X"
        ) {

            modelData.orderTypeFlag = "X";
        }

        return;
    }
}

async function saveModel() {

    const isB1Pricing =
        modelData.selkzb1 === "X";

    const isBRPricing =
        modelData.selkzbr === "X";

    // =====================================================
    // COMMON MODEL / MATERIAL DATA
    // =====================================================

    const commonPayload = {

        Matnr:
            modelData.matnr || "",

        Country:
            modelData.country || "",

        Mtart:
            modelData.mtart || "",

        MaterialFlag:
            modelData.materialFlag || "",

        Mbrsh:
            modelData.mbrsh || "",

        Matkl:
            modelData.matkl || "",

        Meins:
            modelData.meins || "",

        Spart:
            modelData.Spart ||
            modelData.spart ||
            "",

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
            modelData.Vtweg ||
            modelData.vtweg ||
            "",

        Werks:
            modelData.werks || "",

        Vmsta:
            modelData.vmsta || "",

        Vkorg:
            modelData.Vkorg || ""
    };

    // =====================================================
    // WARRANTY DATA
    // =====================================================

    const warrantyPayload = {

        WarrantyFlag:
            modelData.warrantyFlag || "",

        StdWtyType:
            modelData.standardWarranty === "X"
                ? "X"
                : "",

        Swsku:
            modelData.standardWarranty === "X"
                ? modelData.standardSkuNo || ""
                : "",

        StdWtyLen:
            modelData.standardWarranty === "X"
                ? modelData.standardLength || ""
                : "",

        StdWtyLenUnit:
            modelData.standardWarranty === "X"
                ? modelData.standardUnit || ""
                : "",

        ExtdWtyType:
            modelData.extendedWarranty === "X"
                ? "X"
                : "",

        Ewsku:
            modelData.extendedWarranty === "X"
                ? modelData.extendedSkuNo || ""
                : "",

        ExtdWtyLen:
            modelData.extendedWarranty === "X"
                ? modelData.extendedLength || ""
                : "",

        ExtdWtyLenUnit:
            modelData.extendedWarranty === "X"
                ? modelData.extendedUnit || ""
                : "",

        BcareWtyType:
            modelData.brotherCareWarranty === "X"
                ? "B"
                : "",

        Bcsku:
            modelData.brotherCareWarranty === "X"
                ? modelData.brotherCareSkuNo || ""
                : "",

        BcareWtyLen:
            modelData.brotherCareWarranty === "X"
                ? modelData.brotherCareLength || ""
                : "",

        BcareWtyLenUnit:
            modelData.brotherCareWarranty === "X"
                ? modelData.brotherCareUnit || ""
                : "",

        BplusWtyType:
            modelData.brotherPlusWarranty === "X"
                ? "L"
                : "",

        Bpsku:
            modelData.brotherPlusWarranty === "X"
                ? modelData.brotherPlusSkuNo || ""
                : "",

        BplusWtyLen:
            modelData.brotherPlusWarranty === "X"
                ? modelData.brotherPlusLength || ""
                : "",

        BplusWtyLenUnit:
            modelData.brotherPlusWarranty === "X"
                ? modelData.brotherPlusUnit || ""
                : ""
    };

    const programPayload = {

        CompatableFlag:
            modelData.compatableFlag || "",

        Amazondart:
            modelData.amazondart || "",

        Brrefresh:
            modelData.brrefresh || "",

        Barracuda:
            modelData.barracuda || "",

        Bplus:
            modelData.bplus || "",

        B1basic:
            modelData.barracuda === "X"
                ? modelData.basic || ""
                : "",

        B1occasional:
            modelData.barracuda === "X"
                ? modelData.occasional || ""
                : "",

        B1moderate:
            modelData.barracuda === "X"
                ? modelData.moderate || ""
                : "",

        B1frequent:
            modelData.barracuda === "X"
                ? modelData.frequent || ""
                : "",

        B1high:
            modelData.barracuda === "X"
                ? modelData.high || ""
                : "",

        B1power:
            modelData.barracuda === "X"
                ? modelData.power || ""
                : "",

        B1producttype:
            modelData.barracuda === "X"
                ? modelData.productType || ""
                : "",

        B1standardwarr:
            modelData.barracuda === "X"
                ? Number(
                    modelData.standardWarr || 0
                )
                : 0
    };

    // =====================================================
    // ORDER TYPES + CONSUMABLES
    // =====================================================

    const orderTypePayload = {

        OrdertypeFlag:
            modelData.orderTypeFlag || "",

        Drum:
            modelData.drumOrder || "",

        Drconsumable:
            modelData.drumOrder === "X"
                ? modelData.drConsumable || ""
                : "",

        WasteToner:
            modelData.wasteToner || "",

        Wtconsumable:
            modelData.wasteToner === "X"
                ? modelData.wtConsumable || ""
                : "",

        BeltUnit:
            modelData.beltUnit || "",

        Buconsumable:
            modelData.beltUnit === "X"
                ? modelData.buConsumable || ""
                : "",

        Claimorder:
            modelData.claimOrder || "",

        Coconsumable:
            modelData.claimOrder === "X"
                ? modelData.coConsumable || ""
                : ""
    };

    // =====================================================
    // COMMON API CALL FUNCTION
    // =====================================================

    async function postModelPayload(
        payload,
        requestName
    ) {

        console.log(
            "=========================================="
        );

        console.log(
            requestName
        );

        console.log(
            JSON.stringify(
                payload,
                null,
                2
            )
        );

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
                        JSON.stringify(
                            payload
                        )
                }
            );

        const responseText =
            await response.text();

        console.log(
            requestName +
            " HTTP STATUS:",
            response.status
        );

        console.log(
            requestName +
            " RAW RESPONSE:",
            responseText
        );

        let result = {};

        if (responseText) {

            try {

                result =
                    JSON.parse(
                        responseText
                    );

            } catch (jsonError) {

                result = {
                    message:
                        responseText
                };
            }
        }

        if (!response.ok) {

            throw new Error(
                result.message ||
                result.error ||
                responseText ||
                requestName +
                " failed"
            );
        }

        if (
            result.success === false
        ) {

            throw new Error(
                result.message ||
                requestName +
                " failed"
            );
        }

        return result;
    }

    try {

        // =================================================
        // BASIC VALIDATION
        // =================================================

        if (!commonPayload.Matnr) {

            throw new Error(
                "Material Number is required."
            );
        }

        if (!commonPayload.Country) {

            throw new Error(
                "Country is required."
            );
        }

        if (!commonPayload.Werks) {

            throw new Error(
                "Plant is required."
            );
        }

        if (!commonPayload.Mtart) {

            throw new Error(
                "Material Type is required."
            );
        }

        if (!commonPayload.Mbrsh) {

            throw new Error(
                "Industry Sector is required."
            );
        }

        if (!commonPayload.Matkl) {

            throw new Error(
                "Material Group is required."
            );
        }

        if (!commonPayload.Meins) {

            throw new Error(
                "Base Unit Of Measure is required."
            );
        }

        if (!commonPayload.Spart) {

            throw new Error(
                "Division is required."
            );
        }

        if (!commonPayload.Spras) {

            throw new Error(
                "Language is required."
            );
        }

        if (!commonPayload.Maktx) {

            throw new Error(
                "Material Description is required."
            );
        }

        if (!commonPayload.Vtweg) {

            throw new Error(
                "Distribution Channel is required."
            );
        }

        if (
            (
                isB1Pricing ||
                isBRPricing
            ) &&
            !commonPayload.Vkorg
        ) {

            throw new Error(
                "Sales Organization is required when pricing is selected."
            );
        }

        // =================================================
        // REQUEST 1
        //
        // CREATE MATERIAL + SALES VIEW +
        // WARRANTY + PROGRAMS + ORDER TYPES
        //
        // PRICING IS OFF
        // =================================================
        const createPayload = {

            ...commonPayload,

            PriceFlag:
                modelData.priceFlag || "",

            Kschl: "",

            Selkzb1: "",

            Selkzbr: "",

            Konda: "",

            B1kbetr: "",
            B1konwa: "",
            B1kpein: "",
            B1kmein: "",
            B1krech: "",
            B1datab: "",
            B1datbi: "",

            Brkbetr: "",
            Brkonwa: "",
            Brkpein: "",
            Brkmein: "",
            Brkrech: "",
            Brdatab: "",
            Brdatbi: "",

            ...warrantyPayload,

            ...programPayload,

            ...orderTypePayload
        };

        console.log(
            "REQUEST 1 PAYLOAD:"
        );

        console.log(
            JSON.stringify(
                createPayload,
                null,
                2
            )
        );

        await postModelPayload(
            createPayload,
            "REQUEST 1 - MATERIAL CREATE"
        );

        console.log(
            "Material created successfully."
        );

        // =================================================
        // USER DID NOT SELECT PRICING
        // =================================================

        if (
            !isB1Pricing &&
            !isBRPricing
        ) {

            console.log(
                "No pricing setup selected."
            );


            console.log(
                "MODEL CREATION COMPLETE"
            );

            showSuccessPage();

            return;
        }

        // =================================================
        // WAIT BEFORE PRICING REQUEST
        // =================================================

        console.log(
            "Waiting for SAP material commit..."
        );

        await new Promise(
            function (resolve) {

                setTimeout(
                    resolve,
                    2000
                );
            }
        );

        // =================================================
        // REQUEST 2
        // EXISTING MATERIAL + PRICING
        // Other configuration flags are blank because
        // Request 1 already stored those values.
        // =================================================
        const pricingPayload = {

            ...commonPayload,

            // =====================================
            // SETUP FLAGS
            // =====================================

            PriceFlag:
                modelData.priceFlag || "",

            WarrantyFlag: "",

            CompatableFlag: "",

            OrdertypeFlag: "",

            // =====================================
            // PRICING COMMON
            // =====================================

            Kschl:
                modelData.Kschl ||
                "ZPR0",

            Selkzb1:
                isB1Pricing
                    ? "X"
                    : "",

            Selkzbr:
                isBRPricing
                    ? "X"
                    : "",

            Konda:
                modelData.Konda || "",

            // =====================================
            // B1 PRICING
            // =====================================

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
                    ? modelData.b1Kpein || "1"
                    : "",

            B1kmein:
                isB1Pricing
                    ? modelData.b1Kmein ||
                    modelData.meins ||
                    "EA"
                    : "",

            B1krech:
                isB1Pricing
                    ? modelData.b1Krech || "C"
                    : "",

            B1datab:
                isB1Pricing
                    ? modelData.b1Datab || ""
                    : "",

            B1datbi:
                isB1Pricing
                    ? modelData.b1Datbi ||
                    "9999-12-31"
                    : "",

            // =====================================
            // BR PRICING
            // =====================================

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
                    ? modelData.brKpein || "1"
                    : "",

            Brkmein:
                isBRPricing
                    ? modelData.brKmein ||
                    modelData.meins ||
                    "EA"
                    : "",

            Brkrech:
                isBRPricing
                    ? modelData.brKrech || "C"
                    : "",

            Brdatab:
                isBRPricing
                    ? modelData.brDatab || ""
                    : "",

            Brdatbi:
                isBRPricing
                    ? modelData.brDatbi ||
                    "9999-12-31"
                    : "",


            // =====================================
            // WARRANTY OFF
            // =====================================

            StdWtyType: "",
            Swsku: "",
            StdWtyLen: "",
            StdWtyLenUnit: "",

            ExtdWtyType: "",
            Ewsku: "",
            ExtdWtyLen: "",
            ExtdWtyLenUnit: "",

            BcareWtyType: "",
            Bcsku: "",
            BcareWtyLen: "",
            BcareWtyLenUnit: "",

            BplusWtyType: "",
            Bpsku: "",
            BplusWtyLen: "",
            BplusWtyLenUnit: "",

            // =====================================
            // COMPATIBILITY OFF
            // =====================================

            Amazondart: "",
            Brrefresh: "",
            Barracuda: "",

            B1basic: "",
            B1occasional: "",
            B1moderate: "",
            B1frequent: "",
            B1high: "",
            B1power: "",

            B1producttype: "",
            B1standardwarr: 0,

            Bplus: "",

            // =====================================
            // ORDER TYPES OFF
            // =====================================

            Drum: "",
            Drconsumable: "",

            WasteToner: "",
            Wtconsumable: "",

            BeltUnit: "",
            Buconsumable: "",

            Claimorder: "",
            Coconsumable: ""
        };

        console.log(
            "REQUEST 2 PAYLOAD:"
        );

        console.log(
            JSON.stringify(
                pricingPayload,
                null,
                2
            )
        );

        await postModelPayload(
            pricingPayload,
            "REQUEST 2 - PRICING CREATE"
        );

        console.log(
            "Pricing created successfully."
        );

        console.log(
            "=========================================="
        );

        console.log(
            "MODEL CREATION COMPLETE"
        );

        console.log(
            "Material:",
            modelData.matnr
        );

        console.log(
            "=========================================="
        );

        showSuccessPage();

    } catch (error) {

        console.error(
            "=========================================="
        );

        console.error(
            "CREATE MODEL ERROR:"
        );

        console.error(
            error
        );

        console.error(
            "=========================================="
        );

        alert(
            error.message ||
            "Failed to create model"
        );
    }
}

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

    ${modelData.selkzb1 === "X"
            ? (
                (modelData.b1Kbetr || "-") +
                " " +
                (modelData.b1Konwa || "")
            )
            : modelData.selkzbr === "X"
                ? (
                    (modelData.brKbetr || "-") +
                    " " +
                    (modelData.brKonwa || "")
                )
                : "-"
        }
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
    ${modelData.Kschl || "-"}
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

    <h3>
        Order Types & Consumables
    </h3>

    <p>
        <b>Drum Order :</b>

        ${modelData.drumOrder === "X"
            ? modelData.drConsumable || "-"
            : "Not Selected"
        }
    </p>


    <p>
        <b>Waste Toner :</b>

        ${modelData.wasteToner === "X"
            ? modelData.wtConsumable || "-"
            : "Not Selected"
        }
    </p>

    <p>
        <b>Belt Unit :</b>

        ${modelData.beltUnit === "X"
            ? modelData.buConsumable || "-"
            : "Not Selected"
        }
    </p>

    <p>
        <b>Backup Order :</b>

        ${modelData.claimOrder === "X"
            ? modelData.coConsumable || "-"
            : "Not Selected"
        }
    </p>

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
        document.getElementById(
            id
        );

    const icon =
        document.getElementById(
            id + "Icon"
        );

    const status =
        document.getElementById(
            id + "Status"
        );

    if (
        !card ||
        !input
    ) {

        return;
    }

    // =====================================
    // TURN OFF
    // =====================================

    if (
        input.value === "X"
    ) {

        input.value = "";

        card.classList.remove(
            "active"
        );

        if (icon) {

            icon.innerHTML =
                "◇";
        }

        if (status) {

            status.innerHTML =
                "Available";
        }

    }

    // =====================================
    // TURN ON
    // =====================================

    else {

        input.value =
            "X";

        card.classList.add(
            "active"
        );

        if (icon) {

            icon.innerHTML =
                "◆";
        }

        if (status) {

            status.innerHTML =
                "Configured";
        }
    }

    // =====================================
    // BARRACUDA SPECIAL HANDLING
    // =====================================

    if (
        id === "barracuda"
    ) {

        /*
         * Save Barracuda state immediately.
         */
        modelData.barracuda =
            input.value;

        updateBarracudaExtraSection();
    }
}

function updateBarracudaExtraSection() {

    const barracudaInput =
        document.getElementById(
            "barracuda"
        );

    const section =
        document.getElementById(
            "barracudaExtraSection"
        );

    if (
        !barracudaInput ||
        !section
    ) {

        return;
    }

    const isBarracudaSelected =
        barracudaInput.value === "X";

    // =====================================
    // SHOW
    // =====================================

    if (isBarracudaSelected) {

        section.style.display =
            "block";

        /*
         * Trigger entrance animation again.
         */
        section.classList.remove(
            "barracuda-extra-visible"
        );

        requestAnimationFrame(
            function () {

                section.classList.add(
                    "barracuda-extra-visible"
                );
            }
        );

        return;
    }

    // =====================================
    // HIDE
    // =====================================

    section.style.display =
        "none";

    section.classList.remove(
        "barracuda-extra-visible"
    );

    /*
     * User removed Barracuda.
     *
     * Clear all Barracuda-dependent
     * frontend values.
     */

    modelData.basic =
        "";

    modelData.occasional =
        "";

    modelData.moderate =
        "";

    modelData.frequent =
        "";

    modelData.high =
        "";

    modelData.power =
        "";

    modelData.productType =
        "";

    modelData.standardWarr =
        "";

    /*
     * Also clear current DOM controls.
     */

    const checkboxIds = [

        "basic",

        "occasional",

        "moderate",

        "frequent",

        "high",

        "power"

    ];

    checkboxIds.forEach(
        function (checkboxId) {

            const checkbox =
                document.getElementById(
                    checkboxId
                );

            if (checkbox) {

                checkbox.checked =
                    false;
            }
        }
    );

    const fieldIds = [

        "productType",

        "standardWarr"

    ];

    fieldIds.forEach(
        function (fieldId) {

            const field =
                document.getElementById(
                    fieldId
                );

            if (field) {

                field.value =
                    "";
            }
        }
    );
}

function toggleOrderConsumable(
    checkboxId,
    groupId,
    inputId
) {

    const checkbox =
        document.getElementById(
            checkboxId
        );

    const group =
        document.getElementById(
            groupId
        );

    const input =
        document.getElementById(
            inputId
        );

    if (
        !checkbox ||
        !group ||
        !input
    ) {

        return;
    }

    if (checkbox.checked) {

        group.classList.remove(
            "order-consumable-disabled"
        );

        input.disabled =
            false;

        setTimeout(
            function () {

                input.focus();

            },
            0
        );

    } else {

        group.classList.add(
            "order-consumable-disabled"
        );

        input.disabled =
            true;

        input.value =
            "";
    }
}

function applyWarrantyCountryRules() {

    const country =
        modelData.country || "";


    const brotherCareToggle =
        document.getElementById(
            "brotherCareWarranty"
        );

    const brotherPlusToggle =
        document.getElementById(
            "brotherPlusWarranty"
        );

    if (
        !brotherCareToggle ||
        !brotherPlusToggle
    ) {

        return;
    }

    if (country === "US") {

        setWarrantyAvailability(
            "brotherPlusWarranty",
            "brotherPlusWarrantyText",
            "brotherPlusLength",
            "brotherPlusUnit",
            "brotherPlusSkuNo",
            true
        );

        setWarrantyAvailability(
            "brotherCareWarranty",
            "brotherCareWarrantyText",
            "brotherCareLength",
            "brotherCareUnit",
            "brotherCareSkuNo",
            false
        );

        return;
    }

    if (country === "CA") {

        setWarrantyAvailability(
            "brotherCareWarranty",
            "brotherCareWarrantyText",
            "brotherCareLength",
            "brotherCareUnit",
            "brotherCareSkuNo",
            true
        );

        setWarrantyAvailability(
            "brotherPlusWarranty",
            "brotherPlusWarrantyText",
            "brotherPlusLength",
            "brotherPlusUnit",
            "brotherPlusSkuNo",
            false
        );

        return;
    }

    setWarrantyAvailability(
        "brotherCareWarranty",
        "brotherCareWarrantyText",
        "brotherCareLength",
        "brotherCareUnit",
        "brotherCareSkuNo",
        false
    );

    setWarrantyAvailability(
        "brotherPlusWarranty",
        "brotherPlusWarrantyText",
        "brotherPlusLength",
        "brotherPlusUnit",
        "brotherPlusSkuNo",
        false
    );
}

function setWarrantyAvailability(
    toggleId,
    textId,
    lengthId,
    unitId,
    skuId,
    enabled
) {

    const toggle =
        document.getElementById(
            toggleId
        );

    const text =
        document.getElementById(
            textId
        );

    const length =
        document.getElementById(
            lengthId
        );

    const unit =
        document.getElementById(
            unitId
        );

    const sku =
        document.getElementById(
            skuId
        );


    if (!toggle) {
        return;
    }

    toggle.disabled =
        !enabled;

    if (!enabled) {

        toggle.checked =
            false;

        if (text) {

            text.textContent =
                "Unavailable";

            text.style.color =
                "#64748b";
        }

        if (length) {

            length.value =
                "";

            length.disabled =
                true;
        }

        if (unit) {

            unit.value =
                "";

            unit.disabled =
                true;
        }

        if (sku) {

            sku.value =
                "";

            sku.disabled =
                true;
        }

        if (
            toggleId ===
            "brotherCareWarranty"
        ) {

            modelData.brotherCareWarranty =
                "";

            modelData.brotherCareLength =
                "";

            modelData.brotherCareUnit =
                "";

            modelData.brotherCareSkuNo =
                "";
        }

        if (
            toggleId ===
            "brotherPlusWarranty"
        ) {

            modelData.brotherPlusWarranty =
                "";

            modelData.brotherPlusLength =
                "";

            modelData.brotherPlusUnit =
                "";

            modelData.brotherPlusSkuNo =
                "";
        }


        return;
    }

    if (text) {

        if (toggle.checked) {

            text.textContent =
                "On";

            text.style.color =
                "#22c55e";

        } else {

            text.textContent =
                "Off";

            text.style.color =
                "#94a3b8";
        }
    }

    if (!toggle.checked) {

        if (length) {
            length.disabled =
                true;
        }

        if (unit) {
            unit.disabled =
                true;
        }

        if (sku) {
            sku.disabled =
                true;
        }
    }
}

function getWarrantySku(toggleId) {

    if (toggleId === "standardWarranty") {
        return "BMGST_1";
    }

    if (toggleId === "extendedWarranty") {
        return "D1142EPSP";
    }

    if (toggleId === "brotherCareWarranty") {
        return "BCARE_6MTHS";
    }

    if (toggleId === "brotherPlusWarranty") {
        return "BPLUS_6MTHS";
    }

    return "";
}

function toggleWarranty(
    toggleId,
    textId,
    lengthId,
    unitId,
    skuId,
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

    const sku =
        document.getElementById(skuId);

    if (!toggle) {
        return;
    }

    if (toggle.checked) {

        if (text) {

            text.textContent = "On";

            text.style.color =
                "#22c55e";
        }

        if (length) {
            length.disabled = false;
        }

        if (unit) {
            unit.disabled = false;
        }

        if (autoSixMonths) {

            if (length) {
                length.value = "6";
            }

            if (unit) {
                unit.value = "MO";
            }
        }

        if (sku) {

            sku.value =
                getWarrantySku(
                    toggleId
                );
        }

    } else {

        if (text) {

            text.textContent = "Off";

            text.style.color =
                "#94a3b8";
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

        if (sku) {
            sku.value = "";
        }
    }
}

function restoreWarranty(
    toggleId,
    textId,
    lengthId,
    unitId,
    skuId,
    value
) {

    const toggle =
        document.getElementById(toggleId);

    const text =
        document.getElementById(textId);

    const length =
        document.getElementById(lengthId);

    const unit =
        document.getElementById(unitId);

    const sku =
        document.getElementById(skuId);


    if (!toggle) {
        return;
    }

    toggle.checked =
        value === "X";

    if (toggle.checked) {

        if (text) {

            text.textContent =
                "On";

            text.style.color =
                "#22c55e";
        }

        if (length) {
            length.disabled = false;
        }

        if (unit) {
            unit.disabled = false;
        }

        if (sku) {

            sku.value =
                getWarrantySku(
                    toggleId
                );
        }

    } else {

        if (text) {

            text.textContent =
                "Off";

            text.style.color =
                "#94a3b8";
        }

        if (length) {
            length.disabled = true;
        }

        if (unit) {
            unit.disabled = true;
        }

        if (sku) {
            sku.value = "";
        }
    }
}
// =========================================
// AUTO UPPERCASE FOR ALL TEXT INPUTS
// =========================================

document.addEventListener(
    "input",
    function (event) {

        const field =
            event.target;

        if (
            !field ||
            field.tagName !== "INPUT"
        ) {
            return;
        }

        if (
            field.type === "text"
        ) {

            field.value =
                field.value.toUpperCase();
        }
    }
);
// =========================================
// AUTO UPPERCASE FOR MODEL SETUP (For specific fields)
// =========================================

// document.addEventListener(
//     "input",
//     function (event) {

//         const field =
//             event.target;

//         if (!field) {
//             return;
//         }

//         const upperCaseFields = [

//             "matnr",
//             "matkl",
//             "ean11",
//             "maktx",

//             "standardSkuNo",
//             "extendedSkuNo",
//             "brotherCareSkuNo",
//             "brotherPlusSkuNo",

//             "productType",

//             "drConsumable",
//             "wtConsumable",
//             "buConsumable",
//             "coConsumable"
//         ];

//         if (
//             upperCaseFields.includes(
//                 field.id
//             )
//         ) {

//             field.value =
//                 field.value.toUpperCase();
//         }
//     }
// );