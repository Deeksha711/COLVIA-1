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


// Course

function getCourseId() {

    const parameters =
        new URLSearchParams(window.location.search);

    return parameters.get("id");
}


// Course Information

function displayCourse(course) {

    document.getElementById("courseName").textContent =
        course.courseName || "";

    document.getElementById("collegeName").textContent =
        course.collegeName || "";

    document.getElementById("eligibility").textContent =
        course.eligibility || "";

    document.getElementById("minimumPercentage").textContent =
        course.minimumPercentage
            ? course.minimumPercentage + "%"
            : "—";

    document.getElementById("duration").textContent =
        course.duration || "";

    document.getElementById("fee").textContent =
        course.feeAmount
            ? "₹" + course.feeAmount
            : "—";

    document.getElementById("feePeriod").textContent =
        course.feePeriod || "";

    document.getElementById("academicYear").textContent =
        course.academicYear || "";

    document.getElementById("feeType").textContent =
        course.feeType || "";

    document.getElementById("source").textContent =
        course.source || "";

    document.getElementById("lastVerified").textContent =
        course.lastVerified || "";
}


// Course Data

function loadCourse() {

    const courseId =
        getCourseId();

    if (!courseId) {
        return;
    }

    /*
    Backend request will go here.
    The backend will return the selected course.
    */

}

loadCourse();