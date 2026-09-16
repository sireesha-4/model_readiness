const modelData = {};
let currentStep = 1;
 
loadStep();
 
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
                <input
    type="text"
    id="matnr"
    value="${modelData.matnr || ''}"
    placeholder="DCPL2550DW">
            </div>
 
            <div class="form-group">
                <label>Country *</label>
                <select id="country">
    <option ${modelData.country==="US"?"selected":""}>US</option>
    <option ${modelData.country==="CA"?"selected":""}>CA</option>
    <option ${modelData.country==="UK"?"selected":""}>UK</option>
    <option ${modelData.country==="JP"?"selected":""}>JP</option>
</select>
            </div>
 
            <div class="form-group">
                <label>EAN *</label>
                <input
    type="text"
    id="ean11"
    value="${modelData.ean11 || ''}">
 
            </div>
 
            <div class="form-group">
                <label>Cross Plant Material</label>
                <input type="text"
                       id="crossplant">
            </div>
 
            <div class="form-group">
                <label>Material Type</label>
                <input type="text"
                       id="mtart">
            </div>
 
            <div class="form-group">
                <label>Material Group</label>
                <input type="text"
                       id="matkl">
            </div>
 
            <div class="form-group">
                <label>Base Unit</label>
                <input type="text"
                       id="meins">
            </div>
 
            <div class="form-group">
                <label>Division</label>
                <input type="text"
                       id="spart">
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
 
    if(currentStep === 2){
 
    area.innerHTML = `
 
    <div class="card">
 
        <h3>Price Setup</h3>
 
            <div class="grid">
 
            <div class="form-group">
                <label>B1 Price Setup</label>
                <select id="b1price">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
            </div>
 
            <div class="form-group">
                <label>BR Price Setup</label>
                <select id="brprice">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
            </div>
 
            <div class="form-group">
                <label>Condition Type</label>
                <input
                    type="text"
                    id="kschl"
                    placeholder="PR00">
            </div>
 
            <div class="form-group">
                <label>Currency</label>
                <select id="konwa">
                    <option>USD</option>
                    <option>CAD</option>
                    <option>EUR</option>
                    <option>JPY</option>
                </select>
            </div>
 
            <div class="form-group">
                <label>Price Amount</label>
                <input
                    type="number"
                    id="kbetr"
                    placeholder="199.99">
            </div>
 
            <div class="form-group">
                <label>Price Unit</label>
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
                <label>Price Group</label>
                <input
                    type="text"
                    id="kondm">
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
     </div>
 
    `;
}
 
    if(currentStep === 3){
 
    area.innerHTML = `
 
    <div class="card">
 
        <h3>Warranty Setup</h3>
 
        <div class="grid">
 
            <div class="form-group">
                <label>Standard Warranty</label>
                <select id="standardWarranty">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
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
                <select id="extendedWarranty">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
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
                <select id="brotherCareWarranty">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
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
                    <option>YR</option>
                    <option>MON</option>
                </select>
            </div>
 
            <div></div>
 
            <div class="form-group">
                <label>Barracuda Warranty</label>
                <select id="barracudaWarranty">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
            </div>
 
            <div class="form-group">
                <label>Length</label>
                <input
                    type="number"
                    id="barracudaLength"
                    placeholder="1">
            </div>
 
            <div class="form-group">
                <label>Unit</label>
                <select id="barracudaUnit">
                    <option>YR</option>
                    <option>MON</option>
                </select>
            </div>
 
            <div></div>
 
            <div class="form-group">
                <label>Brother Plus Warranty</label>
                <select id="brotherPlusWarranty">
                    <option value="">Select</option>
                    <option value="X">Enabled</option>
                    <option value="">Disabled</option>
                </select>
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
                    <option>YR</option>
                    <option>MON</option>
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
 
   if(currentStep === 4){
 
    area.innerHTML = `
 
    <div class="card">
 
        <h3>Compatibility & Programs</h3>
 
 
            <div class="program-grid">
 
    <div class="program-card"
         id="amazondartCard"
         onclick="toggleProgram('amazondart')">
 
        <div class="program-title">
            Amazon Dart
        </div>
 
        <div id="amazondartIcon"
             class="program-icon">
 
            ○
 
        </div>
 
        <div id="amazondartStatus"
             class="program-status">
 
            Not Enabled
 
        </div>
 
        <input
            type="hidden"
            id="amazondart"
            value="">
    </div>
 
    <div class="program-card"
         id="brrefreshCard"
         onclick="toggleProgram('brrefresh')">
 
        <div class="program-title">
            BR Refresh
        </div>
 
        <div id="brrefreshIcon"
             class="program-icon">
 
            ○
 
        </div>
 
        <div id="brrefreshStatus"
             class="program-status">
 
            Not Enabled
 
        </div>
 
        <input
            type="hidden"
            id="brrefresh"
            value="">
    </div>
 
    <div class="program-card"
         id="barracudaCard"
         onclick="toggleProgram('barracuda')">
 
        <div class="program-title">
            Barracuda
        </div>
 
        <div id="barracudaIcon"
             class="program-icon">
 
            ○
 
        </div>
 
        <div id="barracudaStatus"
             class="program-status">
 
            Not Enabled
 
        </div>
 
        <input
            type="hidden"
            id="barracuda"
            value="">
    </div>
 
    <div class="program-card"
         id="bplusCard"
         onclick="toggleProgram('bplus')">
 
        <div class="program-title">
            Brother Plus
        </div>
 
        <div id="bplusIcon"
             class="program-icon">
 
            ○
 
        </div>
 
        <div id="bplusStatus"
             class="program-status">
 
            Not Enabled
 
        </div>
 
        <input
            type="hidden"
            id="bplus"
            value="">
    </div>
 
</div>
 
        <hr class="section-divider">
 
        <h3 class="section-title">
    Distribution Configuration
</h3>
 
        <div class="grid">
 
            <div class="form-group">
                <label>X Distribution Status</label>
                <select id="xdistr">
                    <option value="">Inactive</option>
                    <option value="X">Active</option>
                </select>
            </div>
 
            <div class="form-group">
                <label>D Chain Status</label>
                <select id="dchain">
                    <option value="">Inactive</option>
                    <option value="X">Active</option>
                </select>
            </div>
 
        </div>
 
        <hr class="section-divider">
 
        <h3 class="section-title">
    Consumables Compatibility
</h3>
 
        <div class="grid">
 
            <div class="form-group">
                <label>Supported Drum</label>
                <input
                    type="text"
                    id="drumModel"
                    placeholder="DR-730">
            </div>
 
            <div class="form-group">
                <label>Supported Toner</label>
                <input
                    type="text"
                    id="tonerModel"
                    placeholder="TN-760">
            </div>
 
            <div class="form-group">
                <label>Belt Unit</label>
                <input
                    type="text"
                    id="beltModel"
                    placeholder="BU-223CL">
            </div>
 
            <div class="form-group">
                <label>Waste Toner Box</label>
                <input
                    type="text"
                    id="wasteModel"
                    placeholder="WT-223CL">
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
 
  if(currentStep === 5){
 
    area.innerHTML = `
 
    <div class="card">
 
        <h3>Order Types & Final Configuration</h3>
 
 
           <div class="order-grid">
 
    <div class="program-card"
         id="backupOrderCard"
         onclick="toggleProgram('backupOrder')">
 
        <div class="program-title">
            Backup Order
        </div>
 
        <div id="backupOrderIcon"
             class="program-icon">
 
            ☐
 
        </div>
 
        <input
            type="hidden"
            id="backupOrder"
            value="">
    </div>
 
    <div class="program-card"
         id="drumOrderCard"
         onclick="toggleProgram('drumOrder')">
 
        <div class="program-title">
            Drum Order
        </div>
 
        <div id="drumOrderIcon"
             class="program-icon">
 
            ☐
 
        </div>
 
        <input
            type="hidden"
            id="drumOrder"
            value="">
    </div>
 
    <div class="program-card"
         id="wasteTonerCard"
         onclick="toggleProgram('wasteToner')">
 
        <div class="program-title">
            Waste Toner
        </div>
 
        <div id="wasteTonerIcon"
             class="program-icon">
 
            ☐
 
        </div>
 
        <input
            type="hidden"
            id="wasteToner"
            value="">
    </div>
 
    <div class="program-card"
         id="beltUnitCard"
         onclick="toggleProgram('beltUnit')">
 
        <div class="program-title">
            Belt Unit
        </div>
 
        <div id="beltUnitIcon"
             class="program-icon">
 
            ☐
 
        </div>
 
        <input
            type="hidden"
            id="beltUnit"
            value="">
    </div>
 
    <div class="program-card"
         id="claimOrderCard"
         onclick="toggleProgram('claimOrder')">
 
        <div class="program-title">
            Claim Order
        </div>
 
        <div id="claimOrderIcon"
             class="program-icon">
 
            ☐
 
        </div>
 
        <input
            type="hidden"
            id="claimOrder"
            value="">
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
 
                <h4>Model Information</h4>
 
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
                onclick="showSuccessPage()">
 
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
 
}
 
function nextStep(){
 
    saveCurrentStepData();
 
    if(currentStep < 6){
 
        currentStep++;
 
        loadStep();
 
    }
}
 
 
function backStep(){
 
    if(currentStep > 1){
 
        currentStep--;
 
        loadStep();
    }
 
}
 
function saveCurrentStepData(){
 
    if(currentStep === 1){
 
        modelData.matnr =
            document.getElementById("matnr")?.value || "";
 
        modelData.country =
            document.getElementById("country")?.value || "";
 
        modelData.ean11 =
            document.getElementById("ean11")?.value || "";
 
        modelData.crossplant =
            document.getElementById("crossplant")?.value || "";
    }
 
    if(currentStep === 2){
 
        modelData.price =
            document.getElementById("kbetr")?.value || "";
 
        modelData.currency =
            document.getElementById("konwa")?.value || "";
    }
 
    if(currentStep === 3){
 
        modelData.standardWarranty =
            document.getElementById("standardWarranty")?.value || "";
 
        modelData.extendedWarranty =
            document.getElementById("extendedWarranty")?.value || "";
    }
 
    if(currentStep === 4){
 
        modelData.amazondart =
            document.getElementById("amazondart")?.value || "";
 
        modelData.brrefresh =
            document.getElementById("brrefresh")?.value || "";
    }
 
    if(currentStep === 5){
 
        modelData.drumOrder =
            document.getElementById("drumOrder")?.value || "";
 
        modelData.claimOrder =
            document.getElementById("claimOrder")?.value || "";
    }
}
 
async function saveModel(){
 
    const payload = {
 
        Matnr:
            document.getElementById("matnr")?.value || "",
 
        Country:
            document.getElementById("country")?.value || "",
 
        Ean11:
            document.getElementById("ean11")?.value || "",
 
        CrossplantMaterial:
            document.getElementById("crossplant")?.value || "",
 
        B1priceSetup:
            document.getElementById("b1price")?.value || "",
 
        BrpriceSetup:
            document.getElementById("brprice")?.value || "",
 
        StandardWarranty:
            document.getElementById("standardWarranty")?.value || "",
 
        ExtendedWarranty:
            document.getElementById("extendedWarranty")?.value || "",
 
        BrothercareWarranty:
            document.getElementById("brotherCareWarranty")?.value || "",
 
        BarracudaWarranty:
            document.getElementById("barracudaWarranty")?.value || "",
 
        BrotherplusWarranty:
            document.getElementById("brotherPlusWarranty")?.value || "",
 
        Amazondart:
            document.getElementById("amazondart")?.value || "",
 
        Brrefresh:
            document.getElementById("brrefresh")?.value || "",
 
        Barracuda:
            document.getElementById("barracuda")?.value || "",
 
        Bplus:
            document.getElementById("bplus")?.value || "",
 
        BackupOrder:
            document.getElementById("backupOrder")?.value || "",
 
        DrumOrder:
            document.getElementById("drumOrder")?.value || "",
 
        WasteToner:
            document.getElementById("wasteToner")?.value || "",
 
        BeltUnit:
            document.getElementById("beltUnit")?.value || "",
 
        Claimorder:
            document.getElementById("claimOrder")?.value || ""
 
    };
 
    console.log(payload);
 
    alert(
        "Model Data Ready For SAP POST"
    );
 
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
        <h3>Model Information</h3>
 
        <p><b>Model :</b> ${modelData.matnr || "-"}</p>
        <p><b>Country :</b> ${modelData.country || "-"}</p>
        <p><b>EAN :</b> ${modelData.ean11 || "-"}</p>
        <p><b>Cross Plant :</b> ${modelData.crossplant || "-"}</p>
    </div>
 
    <div class="detail-card">
        <h3>Pricing</h3>
 
        <p><b>Price :</b>
        ${modelData.price || "-"} ${modelData.currency || ""}</p>
 
        <p><b>B1 Price :</b>
        ${modelData.b1price || "-"}</p>
 
        <p><b>BR Price :</b>
        ${modelData.brprice || "-"}</p>
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
function toggleProgram(id){
 
    const card =
        document.getElementById(
            id + "Card"
        );
 
    const hidden =
        document.getElementById(id);
 
    const icon =
        document.getElementById(
            id + "Icon"
        );
 
    const status =
        document.getElementById(
            id + "Status"
        );
 
    if(hidden.value === "X"){
 
        hidden.value = "";
 
        card.classList.remove(
            "active"
        );
 
        if(icon){
 
           icon.innerHTML = "◇";
        }
 
        if(status){
 
           status.innerHTML = "Available";
        }
 
    }
    else{
 
        hidden.value = "X";
 
        card.classList.add(
            "active"
        );
 
        if(icon){
 
          icon.innerHTML = "◆";
        }
 
        if(status){
 
            status.innerHTML = "Configured";
        }
 
    }
 
}