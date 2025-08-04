/**
 * @typedef Artist
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2507-EduardoMaldonado";
const RESOURCE = "/events";
const API = `${BASE}/${COHORT}${RESOURCE}`;

let events = [];
let selectedEvents;

/** Updates state with all event from the API */
async function getEvents() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        events = data.data;
    } catch (error) {
        console.error(error)
    }
}

/** Updates state with a single event from the API */
async function getEvent(id) {
    try {
        const response = await fetch(`${API}/${id}`);
        const data = await response.json();
        selectedEvents = data.data;
        render();
    } catch (error) {
        console.error(error);
    }
}

// === Components ===

/** Event name that shows more details about the event when clicked */
function EventListItem(event) {
    const $div = document.createElement("div");
    const $h3 = document.createElement("h3");

    //$h3.href = "#selected";
    $h3.style.cursor = "pointer";
    $h3.textContent = event.name;
    $h3.className = "fake-input";

    $h3.addEventListener("click", () => {
        getEvent(event.id);
    });

    $div.append($h3);

    return $div;
}

/** A list of names of all events */
function EventList() {
    const $div = document.createElement("div");

    for (const event of events) {
        const $h3 = EventListItem(event);
        $div.append($h3);
    }
    // for (let i = 0; i < events.length; i++) {
    //     const event = events[i];
    //     const $h3 = EventListItem(event);
    //     $div.append($h3);

    // }

    return $div;
}

/** Detailed information about the selected events */
function EventDetails() {
    if (!selectedEvents) {
        const $p = document.createElement("p");
        $p.textContent = "Please select an event to learn more.";
        return $p;
    }

    const $section = document.createElement("section");
    const $h3 = document.createElement("h3");
    const $id = document.createElement("p");
    const $description = document.createElement("p");
    const $date = document.createElement("p")
    const $location = document.createElement("p")

    $section.className = "event";
    $h3.textContent = `Name: ${selectedEvents.name}`;
    $id.textContent = `ID: ${selectedEvents.id}`;
    $description.textContent = `Description: ${selectedEvents.description}`;
    $date.textContent = ` Date: ${selectedEvents.date}`;
    $location.textContent = `Location: ${selectedEvents.location}`;


    $section.append($h3, $id, $date, $location, $description);


    return $section;
}

// === Render ===
function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
        <h1>Party Planner</h1>
            <main>
                <section >
                    <h2 >Upcoming Parties</h2>
                    <EventList class="fake-input"  ></EventList>
                </section>
                <section id="selected" >
                    <h2>Party Details</h2>
                    <EventDetails></EventDetails>
                </section>
            </main>
    `;
    $app.querySelector("EventList").replaceWith(EventList());
    $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
    await getEvents();
    render();
}

init();
