// Profile

document.getElementById("studentName").textContent = profile.name;
document.getElementById("colviaId").textContent = profile.colviaId;

const nameParts = profile.name.trim().split(" ");

let initials = nameParts[0].charAt(0).toUpperCase();

if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
}

document.getElementById("initialCircle").textContent = initials;


// Menu

const hamburger = document.getElementById("hamburger");
const hamburgerMenu = document.getElementById("hamburgerMenu");

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


// Preferences

document.getElementById("preferencesButton").addEventListener("click", function () {
    window.location.href = "preferences.html";
});


// Colleges

let colleges = [];

async function loadColleges() {
    try {
        const response = await fetch("/api/colleges");

        if (!response.ok) {
            throw new Error("Failed to load colleges");
        }

        colleges = await response.json();

        // backend data
        displayColleges(colleges);

    } catch (error) {
        console.error("Error loading colleges:", error);
    }
}

loadColleges();

function getEligibilityClass(eligible) {
    return "eligibility-" + eligible;
}

function createEligibilityLines(eligible, total) {

    let lines = "";

    for (let i = 1; i <= total; i++) {

        if (i <= eligible) {
            lines += `<span class="active"></span>`;
        } else {
            lines += `<span></span>`;
        }

    }

    return lines;
}

function createCollegeCard(college) {

    const card = document.createElement("article");

    const eligibilityClass =
        getEligibilityClass(college.eligible);

    card.className =
        "college-card " + eligibilityClass;

    card.innerHTML = `
        <div>

            <div class="college-top">

                <div class="college-icon">
                    ▣
                </div>

            </div>

            <h2>${college.name}</h2>

            <div class="eligibility-box">

                <div class="eligibility-label">
                    <span>Eligibility</span>

                    <span class="eligibility-number">
                        ${college.eligible}/${college.total}
                    </span>
                </div>

                <div class="eligibility-line">
                    ${createEligibilityLines(
                        college.eligible,
                        college.total
                    )}
                </div>

            </div>

        </div>

        <div class="card-buttons">

            <button
                class="view-button"
                data-id="${college.id}">
                View
            </button>

            <button
                class="compare-button"
                data-id="${college.id}">
                Compare
            </button>

        </div>
    `;

    return card;
}

function displayColleges() {

    const collegeGrid =
        document.getElementById("collegeGrid");

    collegeGrid.innerHTML = "";

    colleges.forEach(function (college) {

        collegeGrid.appendChild(
            createCollegeCard(college)
        );

    });

    document.querySelectorAll(".view-button").forEach(function (button) {

        button.addEventListener("click", function () {

            const collegeId =
                button.dataset.id;

            window.location.href =
                "college.html?id=" +
                encodeURIComponent(collegeId);

        });

    });

    document.querySelectorAll(".compare-button").forEach(function (button) {

        button.addEventListener("click", function () {

            const collegeId =
                button.dataset.id;

            window.location.href =
                "compare.html?id=" +
                encodeURIComponent(collegeId);

        });

    });
}



displayColleges();
// hero elements

const colviaHero =
    document.querySelector(".colvia-hero");

const colviaVisual =
    document.querySelector(".colvia-visual");

const colviaGlow =
    document.querySelector(".colvia-glow");

const colviaParticles =
    document.querySelector(".colvia-particles");


// mouse movement

if (colviaHero) {

    colviaHero.addEventListener(
        "mousemove",
        function(event) {

            const rect =
                colviaHero.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                (x - centerX) / 45;

            const rotateX =
                (centerY - y) / 45;


            colviaVisual.style.transform =
                `
                translate(
                    ${(x - centerX) / 50}px,
                    ${(y - centerY) / 50}px
                )
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
                `;


            colviaGlow.style.transform =
                `
                translate(
                    calc(-50% + ${(x - centerX) / 8}px),
                    calc(-50% + ${(y - centerY) / 8}px)
                )
                `;
        }
    );


    // reset

    colviaHero.addEventListener(
        "mouseleave",
        function() {

            colviaVisual.style.transform =
                "translate(0, 0) rotateX(0deg) rotateY(0deg) scale(1)";

            colviaGlow.style.transform =
                "translate(-50%, -50%)";
        }
    );
}


// purple particles

function createColviaParticle() {

    if (!colviaParticles) return;

    const particle =
        document.createElement("div");

    particle.classList.add(
        "colvia-particle"
    );


    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.top =
        "-10px";


    const size =
        Math.random() * 5 + 2;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";


    particle.style.setProperty(
        "--drift",
        (Math.random() * 160 - 80) + "px"
    );


    const duration =
        Math.random() * 4 + 3;

    particle.style.animationDuration =
        duration + "s";


    colviaParticles.appendChild(
        particle
    );


    setTimeout(
        function() {
            particle.remove();
        },
        duration * 1000
    );
}


// keep adding particles

setInterval(
    createColviaParticle,
    120
);


// start with some particles already there

for (let i = 0; i < 25; i++) {

    setTimeout(
        createColviaParticle,
        i * 100
    );
}
