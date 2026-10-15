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
                    <label>Material Number
                     <span class="required">*</span>
                    </label>
                    
                    <input type="text" id="matnr">
                </div>

                <div class="form-group">

                    <label>Country
                    <span class="required">*</span>
                    </label>
                    
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
                    <label>Plant
                     <span class="required">*</span>
                    </label>
                   
                    <select id="werks">
    <option value="">Select Plant</option>
    <option value="1710">1710</option>
    <option value="2910">2910</option>
</select>

                </div>


                <div class="form-group">

    <label>
        Material Type
        <span class="required">*</span>
    </label>

    <select id="mtart">

        <option value="">
            Select Material Type
        </option>

        <option value="HAWA">
            HAWA
        </option>

        <option value="FERT">
            FERT
        </option>

        <option value="HALB">
            HALB
        </option>

        <option value="ROH">
            ROH
        </option>

        <option value="DIEN">
            DIEN
        </option>

    </select>

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
                    <label>Material Group
                    <span class="required">*</span>
                    </label>
                    
                    <input type="text" id="matkl"
                    value="${modelData.matkl || "BMGHWML04"}">
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
                    <label>EAN / UPC
                    <span class="required">*</span>
                    </label>
                    
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
                    <label>Material Description
                    <span class="required">*</span>
                    </label>
                    
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

    
    if (currentStep === 4) {

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
                    Material Price Details
                </div>

                <div class="create-pricing-toggle">

                    <span>Material Price Setup</span>

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
                        <label>Material Price
                        <span class="required">*</span>
                        </label>
                        <input
                            type="number"
                            id="b1Kbetr"
                            step="0.01"
                            placeholder="199.99">
                    </div>

                    <div class="form-group">
                        <label>Currency
                        <span class="required">*</span>
                        </label>

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
                        <label>Condition Type
                        <span class="required">*</span>
                        </label>

                        <input
    type="text"
        id="b1Kschl"
    value="${modelData.Kschl || 'ZPR0'}">

                    </div>

                    <div class="form-group">
                        <label>Sales Organization
                        <span class="required">*</span>
                        </label>

                        <select id="b1Vkorg">
    <option value="">Select Sales Organization</option>
    <option value="1710">1710</option>
    <option value="2910">2910</option>
</select>

                    </div>

                    <div class="form-group">
                        <label>Division</label>

                        <input
    type="text"
    id="b1Spart">

                    </div>

                    <div class="form-group">
                        <label>Distribution Channel</label>

                        <input
    type="text"
    id="b1Vtweg">

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
                    Consumable Price Details
                </div>

                <div class="create-pricing-toggle">

                    <span>Consumable Price Setup</span>

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
                        <label>Material Price
                        <span class="required">*</span>
                        </label>

                        <input
                            type="number"
                            id="brKbetr"
                            step="0.01"
                            placeholder="199.99">

                    </div>

                    <div class="form-group">
                        <label>Currency
                        <span class="required">*</span>
                        </label>

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
                        <label>Condition Type
                        <span class="required">*</span>
                        </label>

                        <input
    type="text"
    id="brKschl"
    value="${modelData.Kschl || 'ZPR0'}">

                    </div>

                    <div class="form-group">
                        <label>Sales Organization
                        <span class="required">*</span>
                        </label>

                        <select id="brVkorg">
    <option value="">Select Sales Organization</option>
    <option value="1710">1710</option>
    <option value="2910">2910</option>
</select>

                    </div>

                    <div class="form-group">
                        <label>Division</label>

                        <input
    type="text"
    id="brSpart">

                    </div>

                    <div class="form-group">
                        <label>Distribution Channel</label>

                        <input
    type="text"
    id="brVtweg">

                    </div>

                    <div class="form-group">
                        <label>Customer Price Group
                        <span class="required">*</span>
                        </label>

                        <input
    type="text"
    id="brKonda">
    

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

        // toggleCreatePricing("b1");

        // toggleCreatePricing("br");

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
    min="0"
    max="2"
    step="1"
    placeholder="1"
    onchange="updateWarrantySku('standard')">

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
    min="0"
    max="2"
    step="1"
    placeholder="2"
    onchange="updateWarrantySku('extended')">

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

        saveCurrentStepData();

        applyWarrantyCountryRules();

        return;
    }


    if (currentStep === 2) {

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
       ${
    modelData.selkzb1 === "X" &&
    modelData.selkzbr === "X"
        ? "Barracuda & Auto Reorder Pricing Configured"
        : modelData.selkzb1 === "X"
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
        ${
            modelData.warrantyFlag === "X"
                ? "Warranty Details Added"
                : "No Warranty Setup Selected"
        }
    </p>

</div>
 
<div class="review-card">

    <h4>Programs</h4>

    <p>
        ${
            modelData.compatableFlag === "X"
                ? "Compatibility Configured"
                : "No Program Selected"
        }
    </p>

</div>            


<div class="review-card">

    <h4>
        Order Types & Consumables
    </h4>

 

<p>
    ${
        modelData.orderTypeFlag === "X"
            ? "Order Type Details Configured"
            : "No Order Types Selected"
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

  if (type === "b1") {

    if (
        b1Toggle.checked &&
        brToggle.checked
    ) {

        b1Toggle.checked = false;

        showPricingError(
            "Select either Barracuda Pricing or Auto Reorder Pricing. Only one pricing type is allowed."
        );

        return;
    }

    modelData.selkzb1 =
        b1Toggle.checked ? "X" : "";

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

   if (type === "br") {

    if (
        brToggle.checked &&
        b1Toggle.checked
    ) {

        brToggle.checked = false;

        showPricingError(
            "Select either Barracuda Pricing or Auto Reorder Pricing. Only one pricing type is allowed."
        );

        return;
    }

    modelData.selkzbr =
        brToggle.checked ? "X" : "";

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

    syncPriceFlag();
}

function syncPriceFlag() {

    const priceFlag =
        document.getElementById(
            "priceFlag"
        );

    if (!priceFlag) {
        return;
    }

    if (
        modelData.selkzb1 === "X" ||
        modelData.selkzbr === "X"
    ) {

        modelData.priceFlag = "X";

        priceFlag.checked = true;

    } else {

        modelData.priceFlag = "";

        priceFlag.checked = false;
    }
}

function carryForwardPricingValues(type) {

    if (type === "b1") {

        if (!getValue("b1Vkorg")) {
            document.getElementById("b1Vkorg").value =
                modelData.werks || "";
        }

        if (!getValue("b1Spart")) {
            document.getElementById("b1Spart").value =
                modelData.spart || "";
        }

        if (!getValue("b1Vtweg")) {
            document.getElementById("b1Vtweg").value =
                modelData.vtweg || "";
        }
    }

    if (type === "br") {

        if (!getValue("brVkorg")) {
            document.getElementById("brVkorg").value =
                modelData.werks || "";
        }

        if (!getValue("brSpart")) {
            document.getElementById("brSpart").value =
                modelData.spart || "";
        }

        if (!getValue("brVtweg")) {
            document.getElementById("brVtweg").value =
                modelData.vtweg || "";
        }
    }
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
        setValue(
    "mtart",
    modelData.mtart
);

        setValue(
            "mbrsh",
            modelData.mbrsh || "M"
        );
        setValue(
            "matkl", 
            modelData.matkl || "BMGHWML04"

        );
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
if (currentStep === 4) {

    const b1Block =
        document.getElementById("b1PricingFields");

    const brBlock =
        document.getElementById("brPricingFields");

    const b1Toggle =
        document.getElementById("b1PricingToggle");

    const brToggle =
        document.getElementById("brPricingToggle");

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

      setB1Value("#b1Kschl", modelData.Kschl || "ZPR0");
setB1Value("#b1Vkorg", modelData.b1Vkorg);
setB1Value("#b1Spart", modelData.b1Spart);
setB1Value("#b1Vtweg", modelData.b1Vtweg);

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

    setBRValue("#brKschl", modelData.Kschl || "ZPR0");
setBRValue("#brVkorg", modelData.brVkorg);
setBRValue("#brSpart", modelData.brSpart);
setBRValue("#brVtweg", modelData.brVtweg);
setBRValue("#brKonda", modelData.brKonda);
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

       const b1Fields =
    document.getElementById(
        "b1PricingFields"
    );

if (b1Fields) {
    b1Fields.style.display =
        modelData.selkzb1 === "X"
            ? "block"
            : "none";
}

const brFields =
    document.getElementById(
        "brPricingFields"
    );

if (brFields) {
    brFields.style.display =
        modelData.selkzbr === "X"
            ? "block"
            : "none";
}

if (modelData.selkzb1 === "X") {
    carryForwardPricingValues("b1");
}

if (modelData.selkzbr === "X") {
    carryForwardPricingValues("br");
}


syncPriceFlag();
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
    if (currentStep === 2) {

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

  function validateMaterialStep() {

    if (!getValue("matnr").trim()) {

        showFieldError(
    "matnr",
    "Material Number is required"
);

return false;
    }

    if (!getValue("country").trim()) {

        showFieldError(
            "country",
            "Country is required"
        );

        return false;
    }

    if (!getValue("werks").trim()) {

        showFieldError(
            "werks",
            "Plant is required"
        );

        return false;
    }

    if (!getValue("mtart").trim()) {

        showFieldError(
            "mtart",
            "Material Type is required."
        );

        return false;
    }

    if (!getValue("matkl").trim()) {

        showFieldError(
            "matkl",
            "Material Group is required."
        );

        return false;
    }

    if (!getValue("maktx").trim()) {

        showFieldError(
            "maktx",
            "Material Description is required."
        );

        return false;
    }
    if (!getValue("ean11").trim()) {

   showFieldError(
            "ean11",
        "EAN / UPC is required."
    );

    return false;
}

    return true;
}

function nextStep() {

    if (currentStep === 1) {

        if (!validateMaterialStep()) {
            return;
        }

    }

    saveCurrentStepData();

 if (currentStep === 4) {

    if (!validatePricingStep()) {
        return;
    }

    modelData.priceFlag =
        (
            modelData.selkzb1 === "X" ||
            modelData.selkzbr === "X"
        )
        ? "X"
        : "";
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

   if (currentStep === 5) {
    saveCurrentStepData();
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
        syncMaterialFlag();
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

if (currentStep === 4) {

    const b1Toggle =
        document.getElementById(
            "b1PricingToggle"
        );

    const brToggle =
        document.getElementById(
            "brPricingToggle"
        );

    modelData.selkzb1 =
    document.getElementById("b1PricingToggle")?.checked
        ? "X"
        : "";

modelData.selkzbr =
    document.getElementById("brPricingToggle")?.checked
        ? "X"
        : "";

        if (modelData.selkzb1 !== "X") {

    modelData.b1Kbetr = "";
    modelData.b1Konwa = "";
    modelData.b1Kpein = "";
    modelData.b1Kmein = "";
    modelData.b1Krech = "";
    modelData.b1Datab = "";
    modelData.b1Datbi = "";
    modelData.b1Vkorg = "";
    modelData.b1Spart = "";
    modelData.b1Vtweg = "";

}

if (modelData.selkzbr !== "X") {

    modelData.brKbetr = "";
    modelData.brKonwa = "";
    modelData.brKpein = "";
    modelData.brKmein = "";
    modelData.brKrech = "";
    modelData.brDatab = "";
    modelData.brDatbi = "";
    modelData.brVkorg = "";
    modelData.brSpart = "";
    modelData.brVtweg = "";
    modelData.brKonda = "";
}


    modelData.priceFlag =
        (
            modelData.selkzb1 === "X" ||
            modelData.selkzbr === "X"
        )
            ? "X"
            : "";

    // B1 DATA

    modelData.b1Kbetr =
        getValue("b1Kbetr");

    modelData.b1Konwa =
        getValue("b1Konwa");

    modelData.b1Kpein =
        getValue("b1Kpein");

    modelData.b1Kmein =
        getValue("b1Kmein");

    modelData.b1Krech =
        getValue("b1Krech");

    modelData.b1Datab =
        getValue("b1Datab");

    modelData.b1Datbi =
        getValue("b1Datbi");

    // BR DATA

    modelData.brKbetr =
        getValue("brKbetr");

    modelData.brKonwa =
        getValue("brKonwa");

    modelData.brKpein =
        getValue("brKpein");

    modelData.brKmein =
        getValue("brKmein");

    modelData.brKrech =
        getValue("brKrech");

    modelData.brDatab =
        getValue("brDatab");

    modelData.brDatbi =
        getValue("brDatbi");

    // Common

    modelData.Kschl =
    getValue("b1Kschl") ||
    getValue("brKschl");

modelData.b1Vkorg = getValue("b1Vkorg");
modelData.b1Spart = getValue("b1Spart");
modelData.b1Vtweg = getValue("b1Vtweg");

modelData.brVkorg = getValue("brVkorg");
modelData.brSpart = getValue("brSpart");
modelData.brVtweg = getValue("brVtweg");
modelData.brKonda = getValue("brKonda");

    
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
        // if (
        //     modelData.standardWarranty === "X" ||
        //     modelData.extendedWarranty === "X" ||
        //     modelData.brotherCareWarranty === "X" ||
        //     modelData.brotherPlusWarranty === "X"
        // ) {

        //     modelData.warrantyFlag = "X";
        // }
         syncWarrantyFlag();
        return;
    }

    // =========================================
    // STEP 4 - COMPATIBILITY
    // =========================================

    if (currentStep === 2) {

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
        // if (
        //     modelData.amazondart === "X" ||
        //     modelData.brrefresh === "X" ||
        //     modelData.barracuda === "X" ||
        //     modelData.bplus === "X"
        // ) {

        //     modelData.compatableFlag = "X";
        // }
          syncCompatibilityFlag();
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
        // if (
        //     modelData.drumOrder === "X" ||
        //     modelData.wasteToner === "X" ||
        //     modelData.beltUnit === "X" ||
        //     modelData.claimOrder === "X"
        // ) {

        //     modelData.orderTypeFlag = "X";
        // }
       syncOrderTypeFlag();
        return;
    }
}

function syncMaterialFlag() {

    const materialFlag =
        document.getElementById("materialFlag");

    const enabled =
        modelData.matnr &&
        modelData.country &&
        modelData.werks &&
        modelData.mtart;

    modelData.materialFlag =
        enabled ? "X" : "";

    if (materialFlag) {
        materialFlag.checked = enabled;
    }
}

function syncCompatibilityFlag() {

    const compatFlag =
        document.getElementById(
            "compatableFlag"
        );

    const enabled =
        modelData.amazondart === "X" ||
        modelData.brrefresh === "X" ||
        modelData.barracuda === "X" ||
        modelData.bplus === "X";

    modelData.compatableFlag =
        enabled ? "X" : "";

    if (compatFlag) {
        compatFlag.checked = enabled;
    }
}

function syncOrderTypeFlag() {

    const orderFlag =
        document.getElementById(
            "orderTypeFlag"
        );

    const enabled =
        modelData.drumOrder === "X" ||
        modelData.wasteToner === "X" ||
        modelData.beltUnit === "X" ||
        modelData.claimOrder === "X";

    modelData.orderTypeFlag =
        enabled ? "X" : "";

    if (orderFlag) {
        orderFlag.checked = enabled;
    }
}

function syncWarrantyFlag() {

    const warrantyFlag =
        document.getElementById("warrantyFlag");

    const enabled =
        modelData.standardWarranty === "X" ||
        modelData.extendedWarranty === "X" ||
        modelData.brotherCareWarranty === "X" ||
        modelData.brotherPlusWarranty === "X";

    modelData.warrantyFlag =
        enabled ? "X" : "";

    if (warrantyFlag) {
        warrantyFlag.checked = enabled;
    }
}


function validatePricingStep() {

    if (modelData.selkzb1 === "X") {

        if (!modelData.b1Kbetr) {
            showPricingError(
                "Barracuda Price is required."
            );
            return false;
        }

        if (!modelData.b1Vkorg) {
            showPricingError(
                "Barracuda Sales Organization is required."
            );
            return false;
        }

        if (!modelData.b1Konwa) {
            showPricingError(
                "Barracuda Currency is required."
            );
            return false;
        }
    }

    if (modelData.selkzbr === "X") {

        if (!modelData.brKbetr) {
            showPricingError(
                "Auto Reorder Price is required."
            );
            return false;
        }

        if (!modelData.brVkorg) {
            showPricingError(
                "Auto Reorder Sales Organization is required."
            );
            return false;
        }

        if (!modelData.brKonwa) {
            showPricingError(
                "Auto Reorder Currency is required."
            );
            return false;
        }
    }

    return true;
}

function convertToSapDate(dateValue) {

    if (!dateValue) {
        return "";
    }

    return dateValue.replaceAll("-", "");
}

async function saveModel() {

    saveCurrentStepData();

    async function postModelPayload(
        payload,
        requestName
    ) {

    console.log("COUNTRY", modelData.country);
console.log("REQUEST PAYLOAD", payload);

        const response =
            await fetch(
                "/api/model/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        payload
                    )
                }
            );

        const responseText =
            await response.text();

        let result = {};

        if (responseText) {

            try {

                result =
                    JSON.parse(
                        responseText
                    );

            } catch {

                result = {
                    message:
                        responseText
                };
            }
        }

       if (!response.ok) {

    console.error(
        "SERVER RESPONSE:",
        responseText
    );

    throw new Error(
        responseText ||
        "Create Model Failed"
    );
}

        return result;
    }

    try {

        const finalPayload = {

            // MATERIAL

            Matnr:
                modelData.matnr || "",

            Country:
                modelData.country || "",

            Werks:
                modelData.werks || "",

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

            Vmsta:
                modelData.vmsta || "",

            // FLAGS

            PriceFlag:
                modelData.priceFlag || "",

            WarrantyFlag:
                modelData.warrantyFlag || "",

            CompatableFlag:
                modelData.compatableFlag || "",

            OrdertypeFlag:
                modelData.orderTypeFlag || "",

            // PRICING

            Kschl:
                modelData.Kschl || "ZPR0",

            Selkzb1:
                modelData.selkzb1 || "",

            Selkzbr:
                modelData.selkzbr || "",

            B1kbetr:
                modelData.b1Kbetr || "",

            B1konwa:
                modelData.b1Konwa || "",

            B1kpein:
                modelData.b1Kpein || "",

            B1kmein:
                modelData.b1Kmein || "",

            B1krech:
                modelData.b1Krech || "",

            B1datab:
                convertToSapDate(
                    modelData.b1Datab
                ),

            B1datbi:
                convertToSapDate(
                    modelData.b1Datbi
                ),

            Brkbetr:
                modelData.brKbetr || "",

            Brkonwa:
                modelData.brKonwa || "",

            Brkpein:
                modelData.brKpein || "",

            Brkmein:
                modelData.brKmein || "",

            Brkrech:
                modelData.brKrech || "",

            Brdatab:
                convertToSapDate(
                    modelData.brDatab
                ),

            Brdatbi:
                convertToSapDate(
                    modelData.brDatbi
                ),

           Vkorg:
    modelData.selkzb1 === "X"
        ? modelData.b1Vkorg || ""
        : (
            modelData.selkzbr === "X"
            ? modelData.brVkorg || ""
            : ""
        ),

            Konda:
    modelData.selkzb1 === "X"
        ? modelData.b1Konda || ""
        : (
            modelData.selkzbr === "X"
            ? modelData.brKonda || ""
            : ""
        ),

            // WARRANTY

            StdWtyType:
                modelData.standardWarranty === "X"
                    ? "S"
                    : "",

            Swsku:
                modelData.standardSkuNo || "",

            StdWtyLen:
                modelData.standardLength || "",

            StdWtyLenUnit:
                modelData.standardUnit || "",

            ExtdWtyType:
                modelData.extendedWarranty === "X"
                    ? "X"
                    : "",

            Ewsku:
                modelData.extendedSkuNo || "",

            ExtdWtyLen:
                modelData.extendedLength || "",

            ExtdWtyLenUnit:
                modelData.extendedUnit || "",

            BcareWtyType:
                modelData.brotherCareWarranty === "X"
                    ? "B"
                    : "",

            Bcsku:
                modelData.brotherCareSkuNo || "",

            BcareWtyLen:
                modelData.brotherCareLength || "",

            BcareWtyLenUnit:
                modelData.brotherCareUnit || "",

            BplusWtyType:
                modelData.brotherPlusWarranty === "X"
                    ? "L"
                    : "",

            Bpsku:
                modelData.brotherPlusSkuNo || "",

            BplusWtyLen:
                modelData.brotherPlusLength || "",

            BplusWtyLenUnit:
                modelData.brotherPlusUnit || "",

            // PROGRAMS

            Amazondart:
                modelData.amazondart || "",

            Brrefresh:
                modelData.brrefresh || "",

            Barracuda:
                modelData.barracuda || "",

            Bplus:
                modelData.bplus || "",

            B1basic:
                modelData.basic || "",

            B1occasional:
                modelData.occasional || "",

            B1moderate:
                modelData.moderate || "",

            B1frequent:
                modelData.frequent || "",

            B1high:
                modelData.high || "",

            B1power:
                modelData.power || "",

            B1producttype:
                modelData.productType || "",

            B1standardwarr:
    modelData.barracuda === "X"
        ? Number(modelData.standardWarr || 0)
        : 0,

            // ORDER TYPES

            Drum:
                modelData.drumOrder || "",

            Drconsumable:
                modelData.drConsumable || "",

            WasteToner:
                modelData.wasteToner || "",

            Wtconsumable:
                modelData.wtConsumable || "",

            BeltUnit:
                modelData.beltUnit || "",

            Buconsumable:
                modelData.buConsumable || "",

            Claimorder:
                modelData.claimOrder || "",

            Coconsumable:
                modelData.coConsumable || ""
        };

        
        await postModelPayload(
            finalPayload,
            "CREATE MODEL"
        );

        showSuccessPage();

    } catch (error) {

        console.error(error);

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

   <p>
    <b>Barracuda Pricing :</b>
    ${
        modelData.selkzb1 === "X"
            ? `${modelData.b1Kbetr} ${modelData.b1Konwa}`
            : "Not Selected"
    }
</p>

<p>
    <b>Auto Reorder Pricing :</b>
    ${
        modelData.selkzbr === "X"
            ? `${modelData.brKbetr} ${modelData.brKonwa}`
            : "Not Selected"
    }
</p>

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

    <p>
        <b>Standard Warranty :</b>
        ${
            modelData.standardWarranty === "X"
                ? `${modelData.standardLength} ${modelData.standardUnit}`
                : "Not Selected"
        }
    </p>

    <p>
        <b>Extended Warranty :</b>
        ${
            modelData.extendedWarranty === "X"
                ? `${modelData.extendedLength} ${modelData.extendedUnit}`
                : "Not Selected"
        }
    </p>

    <p>
        <b>Brother Care :</b>
        ${
            modelData.brotherCareWarranty === "X"
                ? `${modelData.brotherCareLength} ${modelData.brotherCareUnit}`
                : "Not Selected"
        }
    </p>

    <p>
        <b>Brother Plus :</b>
        ${
            modelData.brotherPlusWarranty === "X"
                ? `${modelData.brotherPlusLength} ${modelData.brotherPlusUnit}`
                : "Not Selected"
        }
    </p>
</div>
 
<div class="detail-card">
    <h3>Programs</h3>

    <p>
        <b>Amazon Dart :</b>
        ${
            modelData.amazondart === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    <p>
        <b>BR Refresh :</b>
        ${
            modelData.brrefresh === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    <p>
        <b>Barracuda :</b>
        ${
            modelData.barracuda === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    <p>
        <b>Brother Plus :</b>
        ${
            modelData.bplus === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

   
</div>
 
<div class="detail-card">

    <h3>Order Types & Consumables</h3>

    <p>
        <b>Drum Order :</b>
        ${
            modelData.drumOrder === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    ${
        modelData.drumOrder === "X"
            ? `
                <p>
                    <b>Consumable :</b>
                    ${modelData.drConsumable || "-"}
                </p>
            `
            : ""
    }

    <p>
        <b>Waste Toner :</b>
        ${
            modelData.wasteToner === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    ${
        modelData.wasteToner === "X"
            ? `
                <p>
                    <b>Consumable :</b>
                    ${modelData.wtConsumable || "-"}
                </p>
            `
            : ""
    }

    <p>
        <b>Belt Unit :</b>
        ${
            modelData.beltUnit === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    ${
        modelData.beltUnit === "X"
            ? `
                <p>
                    <b>Consumable :</b>
                    ${modelData.buConsumable || "-"}
                </p>
            `
            : ""
    }

    <p>
        <b>Backup Order :</b>
        ${
            modelData.claimOrder === "X"
                ? "Selected"
                : "Not Selected"
        }
    </p>

    ${
        modelData.claimOrder === "X"
            ? `
                <p>
                    <b>Consumable :</b>
                    ${modelData.coConsumable || "-"}
                </p>
            `
            : ""
    }

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

    if (id === "barracuda") {

    modelData.barracuda = input.value;

    updateBarracudaExtraSection();

    applyWarrantyCountryRules();
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

    // Barracuda Rule
 // Barracuda Rule
if (modelData.barracuda === "X") {

    setWarrantyAvailability(
        "extendedWarranty",
        "extendedWarrantyText",
        "extendedLength",
        "extendedUnit",
        "extendedSkuNo",
        true
    );

} else {

    setWarrantyAvailability(
        "extendedWarranty",
        "extendedWarrantyText",
        "extendedLength",
        "extendedUnit",
        "extendedSkuNo",
        false
    );
}


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

        if (toggleId === "extendedWarranty") {

    modelData.extendedWarranty = "";
    modelData.extendedLength = "";
    modelData.extendedUnit = "";
    modelData.extendedSkuNo = "";
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

function getWarrantySku(toggleId, length) {

    if (toggleId === "standardWarranty") {

        switch(String(length)) {
            case "1":
                return "BMGST_1";

            case "2":
                return "BMGST_2";

            default:
                return "";
        }
    }

    if (toggleId === "extendedWarranty") {

        switch(String(length)) {
            case "1":
                return "D1141EPSP";

            case "2":
                return "D1142EPSP";

            default:
                return "";
        }
    }

    if (toggleId === "brotherCareWarranty") {
        return "BCARE_6MTHS";
    }

    if (toggleId === "brotherPlusWarranty") {
        return "BPLUS_6MTHS";
    }

    return "";
}

function updateWarrantySku(type) {

    if (type === "standard") {

        const length =
            document.getElementById("standardLength");

        const sku =
            document.getElementById("standardSkuNo");

        let value = Number(length.value || 0);

        if (value > 2) {
            value = 2;
            length.value = 2;
        }

        sku.value =
            getWarrantySku(
                "standardWarranty",
                value
            );
    }

    if (type === "extended") {

        const length =
            document.getElementById("extendedLength");

        const sku =
            document.getElementById("extendedSkuNo");

        let value = Number(length.value || 0);

        if (value > 2) {
            value = 2;
            length.value = 2;
        }

        sku.value =
            getWarrantySku(
                "extendedWarranty",
                value
            );
    }
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

            const currentLength =
    length?.value || "";

sku.value =
    getWarrantySku(
        toggleId,
        currentLength
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
        toggleId,
        length?.value
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

function showFieldError(id, message) {

    const field =
        document.getElementById(id);

    if (!field) {
        return;
    }

    field.classList.add("field-error");

    let error =
        field.parentElement.querySelector(
            ".error-text"
        );

    if (!error) {

        error =
            document.createElement("div");

        error.className =
            "error-text";

        field.parentElement.appendChild(error);
    }

    error.textContent = message;

    field.addEventListener(
        "input",
        function () {

            clearFieldError(id);

        },
        { once: true }
    );
}

function clearFieldError(id) {

    const field =
        document.getElementById(id);

    if (!field) {
        return;
    }

    field.classList.remove(
        "field-error"
    );

    const error =
        field.parentElement.querySelector(
            ".error-text"
        );

    if (error) {
        error.remove();
    }
}

function clearFieldErrors() {

    document
        .querySelectorAll(".field-error")
        .forEach(el => {
            el.classList.remove("field-error");
        });

    document
        .querySelectorAll(".error-text")
        .forEach(el => {
            el.remove();
        });
}

document.addEventListener(
    "input",
    function(event) {

        const field =
            event.target;

        if (!field) {
            return;
        }

        if (
            field.value &&
            field.value.trim() !== ""
        ) {

            field.classList.remove(
                "field-error"
            );

            const error =
                field.parentElement.querySelector(
                    ".error-text"
                );

            if (error) {
                error.remove();
            }
        }
    }
);

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