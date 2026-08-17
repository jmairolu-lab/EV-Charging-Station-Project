
let stations = [

    {
        id: 1,
        name: "Tata Power EV Station",
        location: "Mangalore",
        address: "Kottara, Mangalore",
        chargingType: "DC Fast Charging",
        availableSlots: 3,
        totalSlots: 5,
        operatingHours: "24 Hours",
        contact: "9876543210",
        status: "Available"
    },

    {
        id: 2,
        name: "Ather Grid Charging Station",
        location: "Mangalore",
        address: "Bejai, Mangalore",
        chargingType: "AC Charging",
        availableSlots: 2,
        totalSlots: 4,
        operatingHours: "6 AM - 11 PM",
        contact: "9876543211",
        status: "Available"
    },

    {
        id: 3,
        name: "ChargeZone EV Station",
        location: "Udupi",
        address: "Manipal Road, Udupi",
        chargingType: "DC Fast Charging",
        availableSlots: 1,
        totalSlots: 6,
        operatingHours: "24 Hours",
        contact: "9876543212",
        status: "Limited"
    },

    {
        id: 4,
        name: "Zeon Charging Station",
        location: "Bangalore",
        address: "Whitefield, Bangalore",
        chargingType: "Fast Charging",
        availableSlots: 0,
        totalSlots: 8,
        operatingHours: "24 Hours",
        contact: "9876543213",
        status: "Full"
    },

    {
        id: 5,
        name: "Statiq EV Station",
        location: "Mysore",
        address: "Hebbal Industrial Area, Mysore",
        chargingType: "DC Fast Charging",
        availableSlots: 4,
        totalSlots: 7,
        operatingHours: "24 Hours",
        contact: "9876543214",
        status: "Available"
    },

    {
        id: 6,
        name: "Jio-bp Pulse",
        location: "Mangalore",
        address: "NH 66, Surathkal",
        chargingType: "Fast Charging",
        availableSlots: 2,
        totalSlots: 5,
        operatingHours: "24 Hours",
        contact: "9876543215",
        status: "Available"
    }

];


// ------------------------------------------
// BOOKINGS
// ------------------------------------------

// Get saved bookings from browser local storage.

let bookings =
    JSON.parse(localStorage.getItem("evBookings")) || [];


// ------------------------------------------
// PAGE LOAD
// ------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    setMinimumDate();

    renderStations();

    renderBookings();

    populateStationSelect();

});


// ------------------------------------------
// DISPLAY STATIONS
// ------------------------------------------

function renderStations(stationList = stations) {

    const container =
        document.getElementById("stationContainer");

    const noStations =
        document.getElementById("noStations");


    container.innerHTML = "";


    if (stationList.length === 0) {

        noStations.classList.remove("hidden");

        return;
    }


    noStations.classList.add("hidden");


    stationList.forEach(function (station) {

        const card = document.createElement("div");

        card.className = "station-card";


        card.innerHTML = `

            <div class="station-top">

                <div>

                    <div class="station-icon">
                        ⚡
                    </div>

                </div>

                <span class="status ${station.status.toLowerCase()}">
                    ${station.status}
                </span>

            </div>


            <h3>
                ${station.name}
            </h3>


            <p class="location">
                📍 ${station.location}
            </p>


            <div class="station-info">

                <div class="info-row">

                    <span class="info-label">
                        Charging Type
                    </span>

                    <span class="info-value">
                        ${station.chargingType}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Available Slots
                    </span>

                    <span class="info-value">
                        ${station.availableSlots}/${station.totalSlots}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Operating Hours
                    </span>

                    <span class="info-value">
                        ${station.operatingHours}
                    </span>

                </div>

            </div>


            <div class="card-actions">

                <button
                    class="secondary-btn"
                    onclick="viewStationDetails(${station.id})"
                >
                    View Details
                </button>


                <button
                    class="primary-btn"
                    onclick="openBookingModal(${station.id})"
                    ${station.availableSlots === 0 ? "disabled" : ""}
                >
                    ${station.availableSlots === 0 ? "Fully Booked" : "Book Now"}
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ------------------------------------------
// SEARCH AND FILTER
// ------------------------------------------

function filterStations() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const chargingType =
        document.getElementById("chargingTypeFilter").value;


    const status =
        document.getElementById("statusFilter").value;


    const filteredStations =
        stations.filter(function (station) {

            const matchesSearch =

                station.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                station.location
                    .toLowerCase()
                    .includes(searchText)

                ||

                station.address
                    .toLowerCase()
                    .includes(searchText);


            const matchesChargingType =
                chargingType === "all" ||
                station.chargingType === chargingType;


            const matchesStatus =
                status === "all" ||
                station.status === status;


            return (
                matchesSearch &&
                matchesChargingType &&
                matchesStatus
            );

        });


    renderStations(filteredStations);

}


// ------------------------------------------
// VIEW STATION DETAILS
// ------------------------------------------

function viewStationDetails(stationId) {

    const station =
        stations.find(
            station => station.id === stationId
        );


    if (!station) {

        showToast("Station not found.");

        return;
    }


    const details =
        document.getElementById("stationDetails");


    details.innerHTML = `

        <div class="details-icon">
            ⚡
        </div>


        <h2>
            ${station.name}
        </h2>


        <p class="location">
            📍 ${station.location}
        </p>


        <div class="details-list">

            <div class="details-item">

                <span>
                    Address
                </span>

                <strong>
                    ${station.address}
                </strong>

            </div>


            <div class="details-item">

                <span>
                    Charging Type
                </span>

                <strong>
                    ${station.chargingType}
                </strong>

            </div>


            <div class="details-item">

                <span>
                    Availability
                </span>

                <strong>
                    ${station.availableSlots}/${station.totalSlots}
                </strong>

            </div>


            <div class="details-item">

                <span>
                    Status
                </span>

                <strong>
                    ${station.status}
                </strong>

            </div>


            <div class="details-item">

                <span>
                    Operating Hours
                </span>

                <strong>
                    ${station.operatingHours}
                </strong>

            </div>


            <div class="details-item">

                <span>
                    Contact
                </span>

                <strong>
                    ${station.contact}
                </strong>

            </div>

        </div>


        <br>


        <button
            class="primary-btn full-width"
            onclick="closeStationModal(); openBookingModal(${station.id})"
            ${station.availableSlots === 0 ? "disabled" : ""}
        >

            ${station.availableSlots === 0
                ? "Currently Full"
                : "Book Charging Slot"}

        </button>

    `;


    document
        .getElementById("stationModal")
        .classList.remove("hidden");

}


// ------------------------------------------
// CLOSE STATION MODAL
// ------------------------------------------

function closeStationModal() {

    document
        .getElementById("stationModal")
        .classList.add("hidden");

}


// ------------------------------------------
// POPULATE STATION DROPDOWN
// ------------------------------------------

function populateStationSelect() {

    const select =
        document.getElementById("stationSelect");


    select.innerHTML = `

        <option value="">
            Select station
        </option>

    `;


    stations.forEach(function (station) {

        const option =
            document.createElement("option");


        option.value = station.id;


        option.textContent =
            `${station.name} - ${station.location}`;


        select.appendChild(option);

    });

}


// ------------------------------------------
// SET MINIMUM BOOKING DATE
// ------------------------------------------

function setMinimumDate() {

    const dateInput =
        document.getElementById("bookingDate");


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1).padStart(2, "0");


    const day =
        String(today.getDate()).padStart(2, "0");


    const todayString =
        `${year}-${month}-${day}`;


    dateInput.min = todayString;

}


// ------------------------------------------
// OPEN BOOKING MODAL
// ------------------------------------------

function openBookingModal(stationId = null) {

    const form =
        document.getElementById("bookingForm");


    form.reset();


    document.getElementById(
        "editingBookingId"
    ).value = "";


    document.getElementById(
        "bookingFormTitle"
    ).textContent =
        "Book Charging Slot";


    document.getElementById(
        "formError"
    ).classList.add("hidden");


    populateStationSelect();


    if (stationId !== null) {

        document.getElementById(
            "stationSelect"
        ).value = stationId;

    }


    document
        .getElementById("bookingModal")
        .classList.remove("hidden");

}


// ------------------------------------------
// CLOSE BOOKING MODAL
// ------------------------------------------

function closeBookingModal() {

    document
        .getElementById("bookingModal")
        .classList.add("hidden");

}


// ------------------------------------------
// BOOKING FORM SUBMISSION
// ------------------------------------------

document
    .getElementById("bookingForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const errorBox =
            document.getElementById("formError");


        errorBox.classList.add("hidden");


        const userName =
            document.getElementById("userName").value.trim();


        const contact =
            document.getElementById("contact").value.trim();


        const stationId =
            parseInt(
                document.getElementById("stationSelect").value
            );


        const vehicleNumber =
            document
                .getElementById("vehicleNumber")
                .value
                .trim()
                .toUpperCase();


        const vehicleType =
            document.getElementById("vehicleType").value;


        const date =
            document.getElementById("bookingDate").value;


        const time =
            document.getElementById("bookingTime").value;


        const chargingType =
            document.getElementById("chargingType").value;


        const editingBookingId =
            document.getElementById(
                "editingBookingId"
            ).value;


        // VALIDATION

        if (userName.length < 3) {

            showFormError(
                "Please enter a valid name."
            );

            return;
        }


        if (!/^[0-9]{10}$/.test(contact)) {

            showFormError(
                "Contact number must contain exactly 10 digits."
            );

            return;
        }


        if (!stationId) {

            showFormError(
                "Please select a charging station."
            );

            return;
        }


        if (!vehicleNumber) {

            showFormError(
                "Please enter your vehicle number."
            );

            return;
        }


        if (!vehicleType) {

            showFormError(
                "Please select your vehicle type."
            );

            return;
        }


        if (!date) {

            showFormError(
                "Please select a booking date."
            );

            return;
        }


        if (!time) {

            showFormError(
                "Please select a booking time."
            );

            return;
        }


        if (!chargingType) {

            showFormError(
                "Please select a charging type."
            );

            return;
        }


        const station =
            stations.find(
                station => station.id === stationId
            );


        if (!station) {

            showFormError(
                "Selected station was not found."
            );

            return;
        }


        // --------------------------------------
        // UPDATE EXISTING BOOKING
        // --------------------------------------

        if (editingBookingId) {

            const booking =
                bookings.find(
                    booking =>
                        booking.id ===
                        parseInt(editingBookingId)
                );


            if (!booking) {

                showFormError(
                    "Booking not found."
                );

                return;
            }


            booking.userName = userName;

            booking.contact = contact;

            booking.stationId = stationId;

            booking.stationName = station.name;

            booking.vehicleNumber = vehicleNumber;

            booking.vehicleType = vehicleType;

            booking.date = date;

            booking.time = time;

            booking.chargingType = chargingType;


            saveBookings();


            renderBookings();


            closeBookingModal();


            showToast(
                "Booking updated successfully!"
            );


            return;

        }


        // --------------------------------------
        // CREATE NEW BOOKING
        // --------------------------------------

        if (station.availableSlots <= 0) {

            showFormError(
                "Sorry, this station is currently full."
            );

            return;
        }


        // Check if user already booked same slot

        const duplicate =
            bookings.some(function (booking) {

                return (

                    booking.stationId === stationId &&

                    booking.date === date &&

                    booking.time === time &&

                    booking.status === "Confirmed"

                );

            });


        if (duplicate) {

            showFormError(
                "This charging slot is already booked."
            );

            return;
        }


        const newBooking = {

            id:
                Date.now(),

            userName:
                userName,

            contact:
                contact,

            stationId:
                stationId,

            stationName:
                station.name,

            vehicleNumber:
                vehicleNumber,

            vehicleType:
                vehicleType,

            date:
                date,

            time:
                time,

            chargingType:
                chargingType,

            status:
                "Confirmed"

        };


        bookings.push(newBooking);


        // Reduce available slot

        station.availableSlots--;


        updateStationStatus();


        saveBookings();


        renderStations();


        renderBookings();


        closeBookingModal();


        showToast(
            "Booking confirmed successfully!"
        );

    });


// ------------------------------------------
// SHOW FORM ERROR
// ------------------------------------------

function showFormError(message) {

    const errorBox =
        document.getElementById("formError");


    errorBox.textContent = message;


    errorBox.classList.remove("hidden");

}


// ------------------------------------------
// SAVE BOOKINGS TO LOCAL STORAGE
// ------------------------------------------

function saveBookings() {

    localStorage.setItem(
        "evBookings",
        JSON.stringify(bookings)
    );

}


// ------------------------------------------
// DISPLAY BOOKINGS
// ------------------------------------------

function renderBookings() {

    const container =
        document.getElementById("bookingContainer");


    const noBookings =
        document.getElementById("noBookings");


    container.innerHTML = "";


    if (bookings.length === 0) {

        noBookings.classList.remove("hidden");

        return;
    }


    noBookings.classList.add("hidden");


    bookings.forEach(function (booking) {

        const card =
            document.createElement("div");


        card.className =
            "booking-card";


        card.innerHTML = `

            <div class="booking-header">

                <div>

                    <h3>
                        ${booking.stationName}
                    </h3>

                    <div class="booking-id">
                        Booking ID: ${booking.id}
                    </div>

                </div>


                <span class="status available">
                    ${booking.status}
                </span>

            </div>


            <div class="booking-details">

                <div class="booking-detail">

                    <span>
                        User
                    </span>

                    ${booking.userName}

                </div>


                <div class="booking-detail">

                    <span>
                        Contact
                    </span>

                    ${booking.contact}

                </div>


                <div class="booking-detail">

                    <span>
                        Date
                    </span>

                    ${formatDate(booking.date)}

                </div>


                <div class="booking-detail">

                    <span>
                        Time
                    </span>

                    ${booking.time}

                </div>


                <div class="booking-detail">

                    <span>
                        Vehicle
                    </span>

                    ${booking.vehicleNumber}

                </div>


                <div class="booking-detail">

                    <span>
                        Charging Type
                    </span>

                    ${booking.chargingType}

                </div>

            </div>


            <div class="booking-actions">

                <button
                    class="secondary-btn"
                    onclick="viewBookingDetails(${booking.id})"
                >
                    View Details
                </button>


                <button
                    class="secondary-btn"
                    onclick="editBooking(${booking.id})"
                >
                    Update
                </button>


                <button
                    class="danger-btn"
                    onclick="cancelBooking(${booking.id})"
                >
                    Cancel
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ------------------------------------------
// VIEW BOOKING DETAILS
// ------------------------------------------

function viewBookingDetails(bookingId) {

    const booking =
        bookings.find(
            booking => booking.id === bookingId
        );


    if (!booking) {

        showToast("Booking not found.");

        return;
    }


    const station =
        stations.find(
            station => station.id === booking.stationId
        );


    alert(

        "BOOKING DETAILS\n\n" +

        "Booking ID: " +
        booking.id +

        "\nUser: " +
        booking.userName +

        "\nContact: " +
        booking.contact +

        "\nStation: " +
        booking.stationName +

        "\nVehicle: " +
        booking.vehicleNumber +

        "\nVehicle Type: " +
        booking.vehicleType +

        "\nDate: " +
        formatDate(booking.date) +

        "\nTime: " +
        booking.time +

        "\nCharging Type: " +
        booking.chargingType +

        "\nStatus: " +
        booking.status

    );

}


// ------------------------------------------
// EDIT BOOKING
// ------------------------------------------

function editBooking(bookingId) {

    const booking =
        bookings.find(
            booking => booking.id === bookingId
        );


    if (!booking) {

        showToast("Booking not found.");

        return;
    }


    document.getElementById(
        "editingBookingId"
    ).value = booking.id;


    document.getElementById(
        "bookingFormTitle"
    ).textContent =
        "Update Booking";


    document.getElementById(
        "userName"
    ).value =
        booking.userName;


    document.getElementById(
        "contact"
    ).value =
        booking.contact;


    populateStationSelect();


    document.getElementById(
        "stationSelect"
    ).value =
        booking.stationId;


    document.getElementById(
        "vehicleNumber"
    ).value =
        booking.vehicleNumber;


    document.getElementById(
        "vehicleType"
    ).value =
        booking.vehicleType;


    document.getElementById(
        "bookingDate"
    ).value =
        booking.date;


    document.getElementById(
        "bookingTime"
    ).value =
        booking.time;


    document.getElementById(
        "chargingType"
    ).value =
        booking.chargingType;


    document.getElementById(
        "formError"
    ).classList.add("hidden");


    document
        .getElementById("bookingModal")
        .classList.remove("hidden");

}


// ------------------------------------------
// CANCEL BOOKING
// ------------------------------------------

function cancelBooking(bookingId) {

    const booking =
        bookings.find(
            booking => booking.id === bookingId
        );


    if (!booking) {

        showToast("Booking not found.");

        return;
    }


    const confirmation =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmation) {

        return;
    }


    const station =
        stations.find(
            station => station.id === booking.stationId
        );


    if (station) {

        station.availableSlots++;

    }


    bookings =
        bookings.filter(
            booking => booking.id !== bookingId
        );


    updateStationStatus();


    saveBookings();


    renderStations();


    renderBookings();


    showToast(
        "Booking cancelled successfully."
    );

}


// ------------------------------------------
// UPDATE STATION STATUS
// ------------------------------------------

function updateStationStatus() {

    stations.forEach(function (station) {

        if (station.availableSlots <= 0) {

            station.availableSlots = 0;

            station.status = "Full";

        }

        else if (
            station.availableSlots <=
            Math.ceil(station.totalSlots * 0.25)
        ) {

            station.status = "Limited";

        }

        else {

            station.status = "Available";

        }

    });

}


// ------------------------------------------
// FORMAT DATE
// ------------------------------------------

function formatDate(dateString) {

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ------------------------------------------
// CHANGE SECTION
// ------------------------------------------

function showSection(sectionId) {

    const stationsSection =
        document.getElementById(
            "stationsSection"
        );


    const bookingsSection =
        document.getElementById(
            "bookingsSection"
        );


    if (sectionId === "stationsSection") {

        stationsSection.classList.remove("hidden");

        bookingsSection.classList.add("hidden");

    }

    else {

        stationsSection.classList.add("hidden");

        bookingsSection.classList.remove("hidden");

        renderBookings();

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(function (button) {

            button.classList.remove("active");

        });


    if (sectionId === "stationsSection") {

        document
            .querySelectorAll(".nav-btn")[0]
            .classList.add("active");

    }

    else {

        document
            .querySelectorAll(".nav-btn")[1]
            .classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ------------------------------------------
// SCROLL TO STATIONS
// ------------------------------------------

function scrollToStations() {

    document
        .getElementById("stationsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ------------------------------------------
// TOAST MESSAGE
// ------------------------------------------

function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent =
        message;


    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


// ------------------------------------------
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ------------------------------------------

window.addEventListener("click", function (event) {

    const stationModal =
        document.getElementById("stationModal");


    const bookingModal =
        document.getElementById("bookingModal");


    if (event.target === stationModal) {

        closeStationModal();

    }


    if (event.target === bookingModal) {

        closeBookingModal();

    }

});