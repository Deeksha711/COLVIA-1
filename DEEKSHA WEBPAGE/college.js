// Navigation

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


// College

function getCollegeId() {

    const parameters =
        new URLSearchParams(window.location.search);

    return parameters.get("id");
}


// College Information

function displayCollege(college) {

    document.getElementById("collegeName").textContent =
        college.name || "";

    document.getElementById("collegeType").textContent =
        college.type || "";

    document.getElementById("collegeLocation").textContent =
        college.location || "";

    document.getElementById("collegeCategory").textContent =
        college.category || "";

    document.getElementById("collegeAffiliation").textContent =
        college.affiliation || "";

    document.getElementById("established").textContent =
        college.established || "";

    document.getElementById("campusSize").textContent =
        college.campusSize || "";

    document.getElementById("collegeDescription").textContent =
        college.description || "";

    document.getElementById("collegePhone").textContent =
        college.phone || "";

    document.getElementById("collegeEmail").textContent =
        college.email || "";

    document.getElementById("collegeAddress").textContent =
        college.address || "";

    displayFacilities(college.facilities);

    displayCourses(college.courses);

    setupOfficialWebsite(college.officialWebsite);
}


// Official Website

function setupOfficialWebsite(officialWebsite) {

    const officialButton =
        document.getElementById("officialButton");

    officialButton.addEventListener("click", function () {

        if (officialWebsite) {

            window.open(
                officialWebsite,
                "_blank"
            );

        }

    });
}


// Facilities

function displayFacilities(facilities) {

    const facilityGrid =
        document.getElementById("facilityGrid");

    facilityGrid.innerHTML = "";

    if (!facilities) {
        return;
    }

    facilities.forEach(function (facility) {

        const item =
            document.createElement("div");

        item.className = "facility-item";

        item.innerHTML = `
            <span class="facility-icon">✦</span>
            <span>${facility}</span>
        `;

        facilityGrid.appendChild(item);

    });
}


// Courses

function displayCourses(courses) {

    const courseGrid =
        document.getElementById("courseGrid");

    const coursesHeading =
        document.getElementById("coursesHeading");

    courseGrid.innerHTML = "";

    if (!courses || courses.length === 0) {

        coursesHeading.textContent = "Courses";

        return;
    }

    if (courses.length === 1) {

        coursesHeading.textContent = "Course";

    } else {

        coursesHeading.textContent = "Courses Offered";
    }


    courses.forEach(function (course) {

        const card =
            document.createElement("article");

        card.className = "course-card";

        card.innerHTML = `
            <div>

                <div class="course-icon">
                    ◆
                </div>

                <h3>
                    ${course.courseName}
                </h3>

            </div>

            <div class="course-bottom">

                <span class="course-duration">
                    ${course.duration || ""}
                </span>

                <span class="course-arrow">
                    →
                </span>

            </div>
        `;

        card.addEventListener("click", function () {

            window.location.href =
                "course.html?id=" +
                encodeURIComponent(course.id);

        });

        courseGrid.appendChild(card);

    });
}


// College Data

function loadCollege() {

    const collegeId =
        getCollegeId();

    if (!collegeId) {
        return;
    }

    /*
    Backend request will go here.
    The backend will return the college
    and its relevant courses.
    */

}

loadCollege();