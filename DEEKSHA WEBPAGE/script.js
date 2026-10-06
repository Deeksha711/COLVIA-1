/* ==
MAIN PANELS
== */

const getStartedButton =
    document.getElementById("getStartedButton");

const privacyPanel =
    document.getElementById("privacyPanel");

const agreeCheckbox =
    document.getElementById("agreeCheckbox");

const continueButton =
    document.getElementById("continueButton");

const loginPanel =
    document.getElementById("loginPanel");

const loginForm =
    document.getElementById("loginForm");

const colviaId =
    document.getElementById("colviaId");

const password =
    document.getElementById("password");

const loginContinueButton =
    document.getElementById(
        "loginContinueButton"
    );

const createProfileButton =
    document.getElementById("createProfileButton");

const profilePanel =
    document.getElementById("profilePanel");

const profileForm =
    document.getElementById("profileForm");


/* ==
OPEN PANEL
== */

function openPanel(panel) {

    panel.classList.add("open");

    setTimeout(function () {

        panel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);

}


/* ==
GET STARTED
== */

getStartedButton.addEventListener("click", function () {

    openPanel(privacyPanel);

});


/* ==
I AGREE
== */

agreeCheckbox.addEventListener("change", function () {

    continueButton.disabled =
        !agreeCheckbox.checked;

});


/* ==
PRIVACY → LOGIN
== */

continueButton.addEventListener("click", function () {

    if (!agreeCheckbox.checked) {
        return;
    }

    openPanel(loginPanel);

});


/* ==
LOGIN BUTTON STATE
== */

function updateLoginButton() {

    loginContinueButton.continue =
        colviaId.value.trim() === "" ||
        password.value.trim() === "";

}


colviaId.addEventListener(
    "input",
    updateLoginButton
);

password.addEventListener(
    "input",
    updateLoginButton
);


/* ==
LOGIN
== */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!loginForm.checkValidity()) {

        loginForm.reportValidity();

        return;
    }

    openTemporaryDestination();

});


/* ==
CREATE PROFILE
== */

createProfileButton.addEventListener("click", function () {

    openPanel(profilePanel);

});


/* ==
PROFILE STEP SYSTEM == */

const profilePages =
    document.querySelectorAll(".profile-page");

const steps =
    document.querySelectorAll(".step");


function showStep(number) {

    profilePages.forEach(function (page) {

        page.classList.toggle(
            "active",
            Number(page.dataset.page) === number
        );

    });


    steps.forEach(function (step) {

        step.classList.toggle(
            "active",
            Number(step.dataset.step) <= number
        );

    });

}


/* ==
CURRENT STEP VALIDATION
== */

function validateCurrentStep() {

    const currentPage =
        document.querySelector(
            ".profile-page.active"
        );

    const requiredFields =
        currentPage.querySelectorAll(
            "input[required], select[required]"
        );


    for (const field of requiredFields) {

        if (!field.checkValidity()) {

            field.reportValidity();

            return false;
        }

    }


    const currentNumber =
        Number(currentPage.dataset.page);


    /* == STEP 2 == */

    if (currentNumber === 2) {

        const selectedExams =
            document.querySelectorAll(
                'input[name="entranceExam"]:checked'
            );

        if (selectedExams.length === 0) {

            alert(
                "Please select at least one entrance examination."
            );

            return false;
        }


        const otherExam =
            document.getElementById(
                "otherEntranceCheckbox"
            );


        if (
            otherExam.checked &&
            document
                .getElementById("otherEntrance")
                .value
                .trim() === ""
        ) {

            document
                .getElementById("otherEntrance")
                .focus();

            alert(
                "Please enter the name of the other entrance examination."
            );

            return false;
        }

    }


    /* == STEP 3 == */

    if (currentNumber === 3) {

        const careerChoices =
            document.querySelectorAll(
                'input[name="careerInterest"]:checked'
            );

        const courseChoices =
            document.querySelectorAll(
                'input[name="courseInterest"]:checked'
            );


        if (careerChoices.length === 0) {

            alert(
                "Please select at least one career interest."
            );

            return false;
        }


        if (courseChoices.length === 0) {

            alert(
                "Please select at least one course interest."
            );

            return false;
        }


        /* == OTHER COURSE == */

        const otherCourseCheckbox =
            document.getElementById(
                "otherCourseCheckbox"
            );

        if (
            otherCourseCheckbox.checked &&
            document
                .getElementById("otherCourse")
                .value
                .trim() === ""
        ) {

            document
                .getElementById("otherCourse")
                .focus();

            alert(
                "Please enter the other course."
            );

            return false;
        }


        /* == B.TECH == */

        const btechCheckbox =
            document.getElementById("btechCheckbox");

        if (btechCheckbox.checked) {

            const btechChoices =
                document.querySelectorAll(
                    'input[name="btechBranch"]:checked'
                );

            if (btechChoices.length === 0) {

                alert(
                    "Please select at least one B.Tech branch or specialization."
                );

                return false;
            }


            const otherBtech =
                document.getElementById(
                    "otherBtechBranchCheckbox"
                );

            if (
                otherBtech.checked &&
                document
                    .getElementById("otherBtechBranch")
                    .value
                    .trim() === ""
            ) {

                document
                    .getElementById("otherBtechBranch")
                    .focus();

                alert(
                    "Please enter the other B.Tech branch."
                );

                return false;
            }

        }


        /* == BCA == */

        const bcaCheckbox =
            document.getElementById("bcaCheckbox");

        if (bcaCheckbox.checked) {

            const bcaChoices =
                document.querySelectorAll(
                    'input[name="bcaChoice"]:checked'
                );

            if (bcaChoices.length === 0) {

                alert(
                    "Please select at least one BCA option."
                );

                return false;
            }


            const otherBca =
                document.getElementById(
                    "otherBcaCheckbox"
                );

            if (
                otherBca.checked &&
                document
                    .getElementById("otherBca")
                    .value
                    .trim() === ""
            ) {

                document
                    .getElementById("otherBca")
                    .focus();

                alert(
                    "Please enter the other BCA specialization or course."
                );

                return false;
            }

        }


        /* == B.SC ==*/

        const bscCheckbox =
            document.getElementById("bscCheckbox");

        if (bscCheckbox.checked) {

            const bscChoices =
                document.querySelectorAll(
                    'input[name="bscChoice"]:checked'
                );

            if (bscChoices.length === 0) {

                alert(
                    "Please select at least one B.Sc option."
                );

                return false;
            }


            const otherBsc =
                document.getElementById(
                    "otherBscCheckbox"
                );

            if (
                otherBsc.checked &&
                document
                    .getElementById("otherBsc")
                    .value
                    .trim() === ""
            ) {

                document
                    .getElementById("otherBsc")
                    .focus();

                alert(
                    "Please enter the other B.Sc course."
                );

                return false;
            }

        }


        /*== BBA ==*/

        const bbaCheckbox =
            document.getElementById("bbaCheckbox");

        if (bbaCheckbox.checked) {

            const bbaChoices =
                document.querySelectorAll(
                    'input[name="bbaChoice"]:checked'
                );

            if (bbaChoices.length === 0) {

                alert(
                    "Please select at least one BBA option."
                );

                return false;
            }


            const otherBba =
                document.getElementById(
                    "otherBbaCheckbox"
                );

            if (
                otherBba.checked &&
                document
                    .getElementById("otherBba")
                    .value
                    .trim() === ""
            ) {

                document
                    .getElementById("otherBba")
                    .focus();

                alert(
                    "Please enter the other BBA specialization or course."
                );

                return false;
            }

        }


        /* == B.COM == */

        const bcomCheckbox =
            document.getElementById("bcomCheckbox");

        if (bcomCheckbox.checked) {

            const bcomChoices =
                document.querySelectorAll(
                    'input[name="bcomChoice"]:checked'
                );

            if (bcomChoices.length === 0) {

                alert(
                    "Please select at least one B.Com option."
                );

                return false;
            }


            const otherBcom =
                document.getElementById(
                    "otherBcomCheckbox"
                );

            if (
                otherBcom.checked &&
                document
                    .getElementById("otherBcom")
                    .value
                    .trim() === ""
            ) {

                document
                    .getElementById("otherBcom")
                    .focus();

                alert(
                    "Please enter the other B.Com specialization or course."
                );

                return false;
            }

        }

    }


    /* = STEP 4 = */

    if (currentNumber === 4) {

        const priorityA =
            document.getElementById("priorityA").value;

        const priorityB =
            document.getElementById("priorityB").value;

        const priorityC =
            document.getElementById("priorityC").value;


        if (
            !priorityA ||
            !priorityB ||
            !priorityC
        ) {

            alert(
                "Please select all three preference priorities."
            );

            return false;
        }


        if (
            priorityA === priorityB ||
            priorityA === priorityC ||
            priorityB === priorityC
        ) {

            alert(
                "Each preference priority must be different."
            );

            return false;
        }


        const studyLocation =
            document.querySelector(
                'input[name="studyLocation"]:checked'
            );

        if (!studyLocation) {

            alert(
                "Please select your preferred study location."
            );

            return false;
        }


        if (
            studyLocation.value ===
            "Near my current location" &&
            document
                .getElementById("currentLocation")
                .value
                .trim() === ""
        ) {

            document
                .getElementById("currentLocation")
                .focus();

            alert(
                "Please enter your current location."
            );

            return false;
        }


        if (
            studyLocation.value ===
            "Specific area" &&
            document
                .getElementById("specificArea")
                .value
                .trim() === ""
        ) {

            document
                .getElementById("specificArea")
                .focus();

            alert(
                "Please enter your preferred area."
            );

            return false;
        }

    }


    return true;

}


/* ==
NEXT BUTTONS
== */

document
    .querySelectorAll(".next-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            if (!validateCurrentStep()) {
                return;
            }


            const nextStep =
                Number(button.dataset.next);


            showStep(nextStep);

        });

    });


/* ==
BACK BUTTONS
== */

document
    .querySelectorAll(".back-button")
    .forEach(function (button) {

        button.addEventListener("click", function () {

            const previousStep =
                Number(button.dataset.back);


            showStep(previousStep);

        });

    });


/* ==
STREAM → OTHER FIELD
== */

const stream =
    document.getElementById("stream");

const otherStreamContainer =
    document.getElementById(
        "otherStreamContainer"
    );

const otherStream =
    document.getElementById("otherStream");


stream.addEventListener("change", function () {

    if (stream.value === "Other") {

        otherStreamContainer.classList.add("show");

        otherStream.required = true;

    } else {

        otherStreamContainer.classList.remove("show");

        otherStream.required = false;

        otherStream.value = "";

    }

});


/* ==
SCIENCE → COMBINATION
== */

const scienceCombinationContainer =
    document.getElementById(
        "scienceCombinationContainer"
    );

const scienceCombination =
    document.getElementById(
        "scienceCombination"
    );

const otherScienceContainer =
    document.getElementById(
        "otherScienceContainer"
    );

const otherScienceCombination =
    document.getElementById(
        "otherScienceCombination"
    );


stream.addEventListener("change", function () {

    if (stream.value === "Science") {

        scienceCombinationContainer
            .classList
            .add("show");

        scienceCombination.required = true;

    } else {

        scienceCombinationContainer
            .classList
            .remove("show");

        scienceCombination.required = false;

        scienceCombination.value = "";

        otherScienceContainer
            .classList
            .remove("show");

        otherScienceCombination.required = false;

        otherScienceCombination.value = "";

    }

});


scienceCombination.addEventListener(
    "change",
    function () {

        if (
            scienceCombination.value ===
            "Other"
        ) {

            otherScienceContainer
                .classList
                .add("show");

            otherScienceCombination.required =
                true;

        } else {

            otherScienceContainer
                .classList
                .remove("show");

            otherScienceCombination.required =
                false;

            otherScienceCombination.value =
                "";

        }

    }
);


/* ==
MULTI SELECT SYSTEM
==*/

function setupMultiSelect(
    containerId,
    textId,
    inputName,
    placeholder
) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }


    const button =
        container.querySelector(
            ".multi-select-button"
        );

    const options =
        container.querySelector(
            ".multi-select-options"
        );

    const text =
        document.getElementById(textId);


    button.addEventListener("click", function (event) {

        event.stopPropagation();


        document
            .querySelectorAll(".multi-select.open")
            .forEach(function (menu) {

                if (menu !== container) {

                    menu.classList.remove("open");
                    menu.classList.remove("open-up");

                }

            });


        if (container.classList.contains("open")) {

            container.classList.remove("open");
            container.classList.remove("open-up");

            return;

        }


        const rect =
            container.getBoundingClientRect();

        const spaceBelow =
            window.innerHeight - rect.bottom;

        const spaceAbove =
            rect.top;

        const menuHeight =
            Math.min(
                options.scrollHeight || 240,
                240
            );


        if (
            spaceBelow < menuHeight + 20 &&
            spaceAbove > spaceBelow
        ) {

            container.classList.add("open-up");

        } else {

            container.classList.remove("open-up");

        }


        container.classList.add("open");

    });


    options.addEventListener("click", function (event) {

        event.stopPropagation();

    });


    container
        .querySelectorAll(
            `input[name="${inputName}"]`
        )
        .forEach(function (checkbox) {

            checkbox.addEventListener(
                "change",
                function () {

                    if (
                        checkbox.classList.contains(
                            "none-option"
                        ) &&
                        checkbox.checked
                    ) {

                        container
                            .querySelectorAll(
                                `input[name="${inputName}"]`
                            )
                            .forEach(function (other) {

                                if (other !== checkbox) {
                                    other.checked = false;
                                }

                            });

                    } else if (
                        !checkbox.classList.contains(
                            "none-option"
                        ) &&
                        checkbox.checked
                    ) {

                        const none =
                            container.querySelector(
                                ".none-option"
                            );

                        if (none) {
                            none.checked = false;
                        }

                    }


                    updateMultiSelectText();

                }
            );

        });


    function updateMultiSelectText() {

        const selected =
            Array.from(
                container.querySelectorAll(
                    `input[name="${inputName}"]:checked`
                )
            ).map(function (checkbox) {

                return checkbox.value;

            });


        if (selected.length === 0) {

            text.textContent = placeholder;

            return;

        }


        text.textContent =
            selected.join(", ");

    }

}


/* ==
MAIN MULTI SELECTS
== */

setupMultiSelect(
    "entranceMultiSelect",
    "entranceSelectedText",
    "entranceExam",
    "Select examinations"
);

setupMultiSelect(
    "careerMultiSelect",
    "careerSelectedText",
    "careerInterest",
    "Select career interests"
);

setupMultiSelect(
    "courseMultiSelect",
    "courseSelectedText",
    "courseInterest",
    "Select course interests"
);


/* ==
NESTED COURSE MULTI SELECT== */

setupMultiSelect(
    "btechMultiSelect",
    "btechSelectedText",
    "btechBranch",
    "Select B.Tech branches"
);

setupMultiSelect(
    "bcaMultiSelect",
    "bcaSelectedText",
    "bcaChoice",
    "Select BCA options"
);

setupMultiSelect(
    "bscMultiSelect",
    "bscSelectedText",
    "bscChoice",
    "Select B.Sc options"
);

setupMultiSelect(
    "bbaMultiSelect",
    "bbaSelectedText",
    "bbaChoice",
    "Select BBA options"
);

setupMultiSelect(
    "bcomMultiSelect",
    "bcomSelectedText",
    "bcomChoice",
    "Select B.Com options"
);


/* ==
CLOSE MULTI SELECT ONLY WHEN CLICKING ELSEWHERE
== */

document.addEventListener("click", function (event) {

    document
        .querySelectorAll(".multi-select.open")
        .forEach(function (menu) {

            if (!menu.contains(event.target)) {

                menu.classList.remove("open");
                menu.classList.remove("open-up");

            }

        });

});


/* ==
OTHER ENTRANCE EXAMINATION
== */

const otherEntranceCheckbox =
    document.getElementById(
        "otherEntranceCheckbox"
    );

const otherEntranceContainer =
    document.getElementById(
        "otherEntranceContainer"
    );

const otherEntrance =
    document.getElementById(
        "otherEntrance"
    );


otherEntranceCheckbox.addEventListener(
    "change",
    function () {

        if (otherEntranceCheckbox.checked) {

            otherEntranceContainer
                .classList
                .add("show");

            otherEntrance.required = true;

        } else {

            otherEntranceContainer
                .classList
                .remove("show");

            otherEntrance.required = false;

            otherEntrance.value = "";

        }

    }
);


/* ==
COURSE BRANCH VISIBILITY
== */

function setupCourseVisibility(
    checkboxId,
    containerId
) {

    const checkbox =
        document.getElementById(checkboxId);

    const container =
        document.getElementById(containerId);


    checkbox.addEventListener(
        "change",
        function () {

            if (checkbox.checked) {

                container.classList.add("show");

            } else {

                container.classList.remove("show");

            }

        }
    );

}


setupCourseVisibility(
    "btechCheckbox",
    "btechContainer"
);

setupCourseVisibility(
    "bcaCheckbox",
    "bcaContainer"
);

setupCourseVisibility(
    "bscCheckbox",
    "bscContainer"
);

setupCourseVisibility(
    "bbaCheckbox",
    "bbaContainer"
);

setupCourseVisibility(
    "bcomCheckbox",
    "bcomContainer"
);


/* ==
OTHER COURSE
== */

const otherCourseCheckbox =
    document.getElementById(
        "otherCourseCheckbox"
    );

const otherCourseContainer =
    document.getElementById(
        "otherCourseContainer"
    );

const otherCourse =
    document.getElementById(
        "otherCourse"
    );


otherCourseCheckbox.addEventListener(
    "change",
    function () {

        if (otherCourseCheckbox.checked) {

            otherCourseContainer
                .classList
                .add("show");

            otherCourse.required = true;

        } else {

            otherCourseContainer
                .classList
                .remove("show");

            otherCourse.required = false;

            otherCourse.value = "";

        }

    }
);


/* ==
NESTED OTHER FIELDS
== */

function setupOtherField(
    checkboxId,
    containerId,
    inputId
) {

    const checkbox =
        document.getElementById(checkboxId);

    const container =
        document.getElementById(containerId);

    const input =
        document.getElementById(inputId);


    checkbox.addEventListener(
        "change",
        function () {

            if (checkbox.checked) {

                container.classList.add("show");

                input.required = true;

            } else {

                container.classList.remove("show");

                input.required = false;

                input.value = "";

            }

        }
    );

}


setupOtherField(
    "otherBtechBranchCheckbox",
    "otherBtechBranchContainer",
    "otherBtechBranch"
);

setupOtherField(
    "otherBcaCheckbox",
    "otherBcaContainer",
    "otherBca"
);

setupOtherField(
    "otherBscCheckbox",
    "otherBscContainer",
    "otherBsc"
);

setupOtherField(
    "otherBbaCheckbox",
    "otherBbaContainer",
    "otherBba"
);

setupOtherField(
    "otherBcomCheckbox",
    "otherBcomContainer",
    "otherBcom"
);


/* ==
PREFERRED STUDY LOCATION
== */

const locationRadios =
    document.querySelectorAll(
        'input[name="studyLocation"]'
    );

const currentLocationContainer =
    document.getElementById(
        "currentLocationContainer"
    );

const specificAreaContainer =
    document.getElementById(
        "specificAreaContainer"
    );

const currentLocation =
    document.getElementById(
        "currentLocation"
    );

const specificArea =
    document.getElementById(
        "specificArea"
    );


locationRadios.forEach(function (radio) {

    radio.addEventListener(
        "change",
        function () {

            currentLocationContainer
                .classList
                .remove("show");

            specificAreaContainer
                .classList
                .remove("show");

            currentLocation.required = false;

            specificArea.required = false;

            currentLocation.value = "";

            specificArea.value = "";


            if (
                radio.value ===
                "Near my current location" &&
                radio.checked
            ) {

                currentLocationContainer
                    .classList
                    .add("show");

                currentLocation.required = true;

            }


            if (
                radio.value ===
                "Specific area" &&
                radio.checked
            ) {

                specificAreaContainer
                    .classList
                    .add("show");

                specificArea.required = true;

            }

        }
    );

});


/* ==
A / B / C PREFERENCE PRIORITY
== */

const prioritySelects = [
    document.getElementById("priorityA"),
    document.getElementById("priorityB"),
    document.getElementById("priorityC")
];


function updatePriorityOptions() {

    const selectedValues =
        prioritySelects.map(function (select) {

            return select.value;

        });


    prioritySelects.forEach(function (select) {

        Array.from(select.options).forEach(
            function (option) {

                if (option.value === "") {

                    option.disabled = false;

                    return;

                }


                const selectedByOther =
                    selectedValues.some(
                        function (value, index) {

                            return (
                                value === option.value &&
                                prioritySelects[index] !== select
                            );

                        }
                    );


                option.disabled =
                    selectedByOther;

            }
        );

    });

}


prioritySelects.forEach(function (select) {

    select.addEventListener(
        "change",
        updatePriorityOptions
    );

});


/* ==
FINAL PROFILE SUBMISSION
== */

profileForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!validateCurrentStep()) {
            return;
        }


        window.location.href="home.html";

    }
);


/* ==
INITIAL STATE
== */

showStep(1);

updatePriorityOptions();

updateLoginButton();

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
