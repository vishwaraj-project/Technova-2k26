const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


const form = document.getElementById("registrationForm");
const success = document.getElementById("success");
const newRegistration = document.getElementById("newRegistration");
const recordsTable = document.getElementById("recordsTable");


function error(id, message) {
    document.getElementById(id).textContent = message;
}


function clearErrors() {

    document.querySelectorAll(".input-group small").forEach(item => {
        item.textContent = "";
    });

    document.getElementById("agreeError").textContent = "";
}


function loadRecords() {

    const records =
        JSON.parse(localStorage.getItem("technovaRegistrations")) || [];

    recordsTable.innerHTML = "";

    if (records.length === 0) {

        recordsTable.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No registrations yet.
                </td>
            </tr>
        `;

        return;
    }

    records.forEach(record => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.name}</td>
            <td>${record.registerNo}</td>
            <td>${record.department}</td>
            <td>${record.event}</td>
        `;

        recordsTable.appendChild(row);

    });
}


form.addEventListener("submit", function(e) {

    e.preventDefault();

    clearErrors();

    const name =
        document.getElementById("name").value.trim();

    const registerNo =
        document.getElementById("registerNo").value.trim();

    const department =
        document.getElementById("department").value;

    const year =
        document.getElementById("year").value;

    const email =
        document.getElementById("email").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const eventName =
        document.getElementById("event").value;

    const agree =
        document.getElementById("agree").checked;


    let valid = true;


    if (name === "") {

        error("nameError", "Please enter your name.");
        valid = false;

    } else if (name.length < 3) {

        error("nameError", "Name must contain at least 3 characters.");
        valid = false;
    }


    if (registerNo === "") {

        error("registerError", "Please enter your register number.");
        valid = false;
    }


    if (department === "") {

        error("departmentError", "Please select your department.");
        valid = false;
    }


    if (year === "") {

        error("yearError", "Please select your year.");
        valid = false;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        error("emailError", "Please enter your email.");
        valid = false;

    } else if (!emailPattern.test(email)) {

        error("emailError", "Enter a valid email address.");
        valid = false;
    }


    const mobilePattern =
        /^[6-9][0-9]{9}$/;

    if (mobile === "") {

        error("mobileError", "Please enter your mobile number.");
        valid = false;

    } else if (!mobilePattern.test(mobile)) {

        error("mobileError", "Enter a valid 10-digit mobile number.");
        valid = false;
    }


    if (eventName === "") {

        error("eventError", "Please select an event.");
        valid = false;
    }


    if (!agree) {

        error(
            "agreeError",
            "Please confirm the information provided."
        );

        valid = false;
    }


    if (!valid) {
        return;
    }


    const registration = {

        name: name,

        registerNo: registerNo,

        department: department,

        year: year,

        email: email,

        mobile: mobile,

        event: eventName,

        date: new Date().toLocaleString()

    };


    const registrations =
        JSON.parse(localStorage.getItem("technovaRegistrations")) || [];


    registrations.push(registration);


    localStorage.setItem(
        "technovaRegistrations",
        JSON.stringify(registrations)
    );


    form.style.display = "none";

    success.style.display = "block";

    loadRecords();

});


newRegistration.addEventListener("click", () => {

    form.reset();

    clearErrors();

    success.style.display = "none";

    form.style.display = "block";

});


document.getElementById("mobile").addEventListener("input", function() {

    this.value =
        this.value.replace(/\D/g, "").slice(0, 10);

});


loadRecords();