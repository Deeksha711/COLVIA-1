/* =========================
   Navigation
========================= */

const hamburger =
    document.getElementById("hamburger");

const hamburgerMenu =
    document.getElementById("hamburgerMenu");


hamburger.addEventListener("click", function () {

    hamburgerMenu.classList.toggle("show");

});


document.addEventListener("click", function (event) {

    if (
        !hamburger.contains(event.target) &&
        !hamburgerMenu.contains(event.target)
    ) {

        hamburgerMenu.classList.remove("show");

    }

});


/* =========================
   Selected Colleges
========================= */

let selectedCollegeIds =
    JSON.parse(
        localStorage.getItem("compareColleges") || "[]"
    );


/*
    Maximum two colleges can be compared.
*/

if (selectedCollegeIds.length > 2) {

    selectedCollegeIds =
        selectedCollegeIds.slice(0, 2);

    localStorage.setItem(
        "compareColleges",
        JSON.stringify(selectedCollegeIds)
    );

}


/* =========================
   Elements
========================= */

const selectionGrid =
    document.getElementById("selectionGrid");

const selectionCount =
    document.getElementById("selectionCount");

const selectionMessage =
    document.getElementById("selectionMessage");

const compareNowButton =
    document.getElementById("compareNowButton");

const comparisonTable =
    document.getElementById("comparisonTable");


/* =========================
   Recommended Colleges
========================= */

/*
    The backend will provide the recommended
    colleges.

    Expected structure:

    window.recommendedColleges

    Each college should contain:

    id
    name
    location

    and the comparison information.
*/

function getRecommendedColleges() {

    if (
        Array.isArray(window.recommendedColleges)
    ) {

        return window.recommendedColleges;

    }

    return [];

}


/* =========================
   Selection Cards
========================= */

function displayRecommendedColleges() {

    const colleges =
        getRecommendedColleges();

    selectionGrid.innerHTML = "";


    if (colleges.length === 0) {

        selectionMessage.textContent =
            "No recommended colleges to select.";

        selectionCount.textContent =
            "0 / 2 selected";

        compareNowButton.disabled = true;

        return;

    }


    colleges.forEach(function (college) {

        const card =
            document.createElement("article");

        card.className =
            "selection-card";


        if (
            selectedCollegeIds.includes(
                String(college.id)
            )
        ) {

            card.classList.add("selected");

        }


        card.dataset.id =
            String(college.id);


        card.innerHTML = `

            <div class="selection-circle">
                ✓
            </div>

            <div class="selection-info">

                <h3>
                    ${college.name || ""}
                </h3>

                <p>
                    ${college.location || ""}
                </p>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                toggleCollege(
                    String(college.id)
                );

            }
        );


        selectionGrid.appendChild(card);

    });


    updateSelectionState();

}


/* =========================
   Select / Unselect
========================= */

function toggleCollege(collegeId) {

    const index =
        selectedCollegeIds.indexOf(collegeId);


    /*
        If already selected,
        remove it.
    */

    if (index !== -1) {

        selectedCollegeIds.splice(
            index,
            1
        );

    }


    /*
        If not selected,
        allow selection only if
        fewer than two are selected.
    */

    else {

        if (
            selectedCollegeIds.length >= 2
        ) {

            selectionMessage.textContent =
                "You can compare only two colleges at a time.";

            return;

        }


        selectedCollegeIds.push(
            collegeId
        );

    }


    localStorage.setItem(
        "compareColleges",
        JSON.stringify(selectedCollegeIds)
    );


    updateSelectionCards();

    updateSelectionState();

}


/* =========================
   Update Cards
========================= */

function updateSelectionCards() {

    const cards =
        document.querySelectorAll(
            ".selection-card"
        );


    cards.forEach(function (card) {

        const collegeId =
            card.dataset.id;


        if (
            selectedCollegeIds.includes(
                collegeId
            )
        ) {

            card.classList.add("selected");

        }

        else {

            card.classList.remove("selected");

        }

    });

}


/* =========================
   Selection Status
========================= */

function updateSelectionState() {

    selectionCount.textContent =
        selectedCollegeIds.length +
        " / 2 selected";


    if (
        selectedCollegeIds.length === 0
    ) {

        selectionMessage.textContent =
            "Select two recommended colleges to compare.";

        compareNowButton.disabled = true;

    }


    else if (
        selectedCollegeIds.length === 1
    ) {

        selectionMessage.textContent =
            "Select one more college to continue.";

        compareNowButton.disabled = true;

    }


    else if (
        selectedCollegeIds.length === 2
    ) {

        selectionMessage.textContent =
            "Two colleges selected.";

        compareNowButton.disabled = false;

    }

}


/* =========================
   Compare Button
========================= */

compareNowButton.addEventListener(
    "click",
    function () {

        if (
            selectedCollegeIds.length !== 2
        ) {

            return;

        }


        loadComparison();

    }
);


/* =========================
   Comparison Data
========================= */

/*
    The backend will provide the
    selected college information.

    Expected:

    window.comparisonColleges
*/

function loadComparison() {

    if (
        !Array.isArray(
            window.comparisonColleges
        )
    ) {

        comparisonTable.innerHTML = `
            <div class="empty-comparison">
                Comparison data is not available yet.
            </div>
        `;

        return;

    }


    const colleges =
        window.comparisonColleges.filter(
            function (college) {

                return selectedCollegeIds.includes(
                    String(college.id)
                );

            }
        );


    if (colleges.length !== 2) {

        comparisonTable.innerHTML = `
            <div class="empty-comparison">
                Please select two recommended colleges.
            </div>
        `;

        return;

    }


    createComparisonTable(
        colleges
    );

}


/* =========================
   Comparison Table
========================= */

function createComparisonTable(
    colleges
) {

    comparisonTable.innerHTML = "";


    createComparisonRow(
        "College",
        colleges[0].name,
        colleges[1].name,
        true
    );


    createComparisonRow(
        "Short Name",
        colleges[0].shortName,
        colleges[1].shortName
    );


    createComparisonRow(
        "Location",
        colleges[0].location,
        colleges[1].location
    );


    createComparisonRow(
        "Type",
        colleges[0].type,
        colleges[1].type
    );


    createComparisonRow(
        "Affiliation",
        colleges[0].affiliation,
        colleges[1].affiliation
    );


    createComparisonRow(
        "About",
        colleges[0].about,
        colleges[1].about
    );


    createComparisonRow(
        "Course",
        colleges[0].course,
        colleges[1].course
    );


    createComparisonRow(
        "Eligibility",
        colleges[0].eligibility,
        colleges[1].eligibility
    );


    createComparisonRow(
        "Minimum Percentage",
        colleges[0].minimumPercentage,
        colleges[1].minimumPercentage
    );


    createComparisonRow(
        "Duration",
        colleges[0].duration,
        colleges[1].duration
    );


    createComparisonRow(
        "Fee",
        colleges[0].fee,
        colleges[1].fee
    );


    createComparisonRow(
        "Seats",
        colleges[0].seats,
        colleges[1].seats
    );

}


/* =========================
   Create Row
========================= */

function createComparisonRow(
    label,
    firstValue,
    secondValue,
    isCollegeName
) {

    const row =
        document.createElement("div");


    row.className =
        "comparison-row";


    const labelCell =
        document.createElement("div");


    labelCell.className =
        "comparison-label";


    labelCell.textContent =
        label;


    const firstCell =
        document.createElement("div");


    firstCell.className =
        isCollegeName
            ? "comparison-college-name"
            : "comparison-value";


    firstCell.textContent =
        firstValue || "Not specified";


    const secondCell =
        document.createElement("div");


    secondCell.className =
        isCollegeName
            ? "comparison-college-name"
            : "comparison-value";


    secondCell.textContent =
        secondValue || "Not specified";


    row.appendChild(
        labelCell
    );

    row.appendChild(
        firstCell
    );

    row.appendChild(
        secondCell
    );


    comparisonTable.appendChild(
        row
    );

}


/* =========================
   Start
========================= */

displayRecommendedColleges();