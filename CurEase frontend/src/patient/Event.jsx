import { ArrowUpWideNarrow, Calendar, Droplet, HeartPlus, Locate, PersonStanding, Search, Spotlight, Syringe } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";

// Single-file React component (Tailwind CSS assumed to be configured in the project)
// Default export: EventsPage
// Features:
// - Uses browser geolocation to get user's location (asks permission)
// - Shows a mixed list of events (health camps, blood donations, vaccination, runs, volunteer drives)
// - Filters by category, date, distance, and ability to search
// - Sorts by distance by default
// - RSVP/Volunteer modal (mock) to capture name + email
// - All data is local/mock but hooks are obvious places to plug a real API

// ---------------------- Helper utilities ----------------------
const toRad = (deg) => (deg * Math.PI) / 180;

// Haversine distance (km)
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// quick date helper
const isSameDay = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

// ---------------------- Mock events data ----------------------
// Replace or fetch from your backend for a production app.
const mockEvents = [
  {
    id: "e1",
    title: "Community Health Camp",
    Icon: HeartPlus,
    category: "health_camp",
    description: "Free general checkups, blood sugar tests and counseling.",
    lat: 28.6139,
    lon: 77.209,
    date: "2025-11-05",
    time: "09:00",
    venue: "Community Center, Sector 12",
    capacity: 200,
  },
  {
    id: "e2",
    title: "Blood Donation Drive — RedCross",
    category: "blood_donation",
    Icon: Droplet,
    description: "Walk-ins welcome. Please carry an ID and eat well before donating.",
    lat: 28.6200,
    lon: 77.200,
    date: "2025-11-02",
    time: "10:00",
    venue: "City Mall Atrium",
    capacity: 120,
  },
  {
    id: "e3",
    title: "5K Charity Run",
    Icon: PersonStanding,
    category: "run",
    description: "Family-friendly 5km run raising funds for children's health.",
    lat: 28.605,
    lon: 77.220,
    date: "2025-11-10",
    time: "06:30",
    venue: "Lake Park Entrance",
    capacity: 500,
  },
  {
    id: "e4",
    Icon: Spotlight,
    title: "Volunteer: Mobile Vaccination Van",
    category: "volunteer",
    description: "Volunteers required to assist with registration and crowd management.",
    lat: 28.600,
    lon: 77.210,
    date: "2025-11-03",
    time: "08:00",
    venue: "Health Dept HQ",
    capacity: 50,
  },
  {
    id: "e5",
    Icon: Syringe,
    title: "COVID-19 Vaccination Drive",
    category: "vaccination",
    description: "First & second dose available. Walk-ins accepted.",
    lat: 28.615,
    lon: 77.202,
    date: "2025-11-01",
    time: "09:30",
    venue: "Urban Clinic, Block B",
    capacity: 300,
  },
];

const CATEGORY_LABELS = {
  health_camp: "Health Camp",
  blood_donation: "Blood Donation",
  vaccination: "Vaccination",
  run: "Run",
  volunteer: "Volunteer",
};

// ---------------------- Component ----------------------
export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [userLoc, setUserLoc] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [error, setError] = useState(null);

  // UI states
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [maxDistanceKm, setMaxDistanceKm] = useState(20); // filter radius
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("distance");

  // RSVP modal
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpMessage, setRsvpMessage] = useState(null);

  // On mount, load events (mock) and request location
  useEffect(() => {
    // In real app, replace this with fetch('/api/events') etc.
    setEvents(mockEvents);
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setLoadingLoc(false);
      },
      (err) => {
        setError("Location access denied or unavailable. Showing approximate distances from city center.");
        // fallback to a reasonable default like New Delhi city center (example)
        setUserLoc({ lat: 28.6139, lon: 77.209 });
        setLoadingLoc(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }

  // compute distances and enrich events
  const enriched = useMemo(() => {
    if (!userLoc) return events.map((e) => ({ ...e, distanceKm: null }));
    return events.map((e) => ({ ...e, distanceKm: distanceKm(userLoc.lat, userLoc.lon, e.lat, e.lon) }));
  }, [events, userLoc]);

  // apply filters
  const filtered = useMemo(() => {
    let list = enriched.filter((e) => {
      if (query) {
        const q = query.toLowerCase();
        if (!(`${e.title} ${e.description} ${e.venue}`.toLowerCase().includes(q))) return false;
      }
      if (selectedCategories.size > 0 && !selectedCategories.has(e.category)) return false;
      if (selectedDate) {
        if (!isSameDay(e.date, selectedDate)) return false;
      }
      if (userLoc && e.distanceKm != null && e.distanceKm > maxDistanceKm) return false;
      return true;
    });

    if (sortBy === "distance" && userLoc) {
      list.sort((a, b) => (a.distanceKm ?? 1e6) - (b.distanceKm ?? 1e6));
    } else if (sortBy === "date") {
      list.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return list;
  }, [enriched, query, selectedCategories, maxDistanceKm, selectedDate, sortBy, userLoc]);

  function toggleCategory(cat) {
    const s = new Set(Array.from(selectedCategories));
    if (s.has(cat)) s.delete(cat);
    else s.add(cat);
    setSelectedCategories(s);
  }

  function openRsvp(e) {
    setModalEvent(e);
    setShowModal(true);
    setRsvpName("");
    setRsvpEmail("");
    setRsvpMessage(null);
  }

  function doRsvp() {
    if (!rsvpName || !rsvpEmail) {
      setRsvpMessage({ type: "error", text: "Please enter name and email." });
      return;
    }
    // In real app, post to API: fetch('/api/rsvp', {body: JSON.stringify({eventId: modalEvent.id, name: rsvpName, email: rsvpEmail})})
    setRsvpMessage({ type: "success", text: `Thanks ${rsvpName}! You're registered for ${modalEvent.title}.` });

    // close after small delay to mimic network
    setTimeout(() => {
      setShowModal(false);
    }, 1200);
  }

  return (
    <div className="max-h-screen overflow-x-hidden bg-[var(--bg)] p-4 md:p-8 text-[var(--text)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4 bg-[var(--card)] px-10 py-7 rounded-xl" >
          <div>
            <h1 className="text-4xl mb-5">Nearby Health & Fitness Events</h1>
            <p className="text-sm">Find health camps, blood donation drives, vaccination camps, volunteer opportunities and runs near you.</p>
          </div>

          <div className="flex gap-2 items-center flex flex-col">
            <div className="text-sm mb-2">{loadingLoc ? 'Locating you...' : userLoc ? `⚑ Using your location` : 'Location not available'}</div>
            <button
              className="text-xs flex gap-2 items-center px-5 py-2 bg-[var(--card)] border rounded-lg shadow-sm hover:bg-[var(--text)] hover:text-[var(--bg)] cursor-pointer transition-bg duration-400"
              onClick={() => getLocation()}
            >
              <Locate size={18}/>
              Refresh Location
            </button>
          </div>
        </div>

        {/* Filters */}
        <section className="bg-[var(--card)] rounded-lg shadow px-10 py-7 mb-6">
          <div className="flex flex-col md:flex-row md:items-center xl:grid xl:grid-cols-[2fr_1fr_1fr_.5fr] gap-3">
            <div className="flex flex-col">
              <p className="text-2xl mb-4">Search for Events</p>
              {/* <p className="text-xs mb-3 mt-1">Apply filters to easily discover the events you’re looking for.</p> */}
              <div className="px-3 py-2 border rounded focus:outline-none flex gap-5 items-center">
                {/* Search button */}
                <Search size={18}/>
                <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, venue or description"
                className="outline-none border-none text-sm w-full"
              />
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2 items-center bg-[var(--bg)] px-5 py-4 rounded-xl">
              <label className="text-sm text-center">Max distance (km)</label>
              <div className="text-right text-xs bg-[var(--card)] px-3 py-2 rounded-lg">{maxDistanceKm} km</div>
              <input
                type="range"
                min={1}
                max={50}
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="col-span-2"
              />
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2 items-center bg-[var(--bg)] px-5 py-4 rounded-xl">
              <label className="text-sm flex items-center gap-2"><Calendar size={15}/>Date</label>
              <button onClick={() => setSelectedDate("")} className="text-xs text-red-500 rounded">Clear</button>
              <input value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} type="date" className="cursor-pointer outline-none mt-2 col-span-2 bg-[var(--card)] text-xs px-5 py-2 rounded-sm" />
            </div>

            <div className="flex flex-col gap-2 items-end bg-[var(--bg)] px-5 py-4 rounded-xl">
              <label className="text-sm flex items-center gap-2"><ArrowUpWideNarrow size={15}/>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="cursor-pointer px-2 py-2 mt-2 px-3 text-xs bg-[var(--card)] outline-none rounded">
                <option value="distance">Distance</option>
                <option value="date">Date</option>
              </select>
            </div>
          </div>
          <p className="text-xs mt-5 mb-2 text-gray-400">Popular Filters</p>
          {/* Category toggles */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([k, label]) => (
              <button
                key={k}
                onClick={() => toggleCategory(k)}
                className={`px-4 py-1 rounded-xs text-xs border cursor-pointer transition-bg hover:bg-[var(--text)] hover:text-[var(--bg)] duration-300 ${selectedCategories.has(k) ? 'bg-[var(--button)] text-white border-[var(--button)]' : 'bg-[var(--card)]'}`}
              >
                {label}
              </button>
            ))}
            <button onClick={() => setSelectedCategories(new Set())} className="px-3 py-1 border-none cursor-pointer rounded text-sm border bg-red-500 ml-auto">Reset</button>
          </div>
        </section>

        {/* Results + map placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <section className="space-y-5">
              {error && (
                <div className="text-sm text-white bg-orange-500 px-5 py-3 rounded">{error}</div>
              )}

              {filtered.length === 0 ? (
                <div className="p-6 bg-[var(--card)] rounded shadow text-center">No events found with the selected filters.</div>
              ) : (
                filtered.map((e) => (
                  <article key={e.id} className="bg-[var(--card)] px-10 py-7 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                      <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3">
                        <span className="col-span-2 mb-2 text-xs px-4 py-1 rounded bg-yellow-500 text-black w-max">{CATEGORY_LABELS[e.category]}</span>
                        <e.Icon size={30} className="row-span-2 self-center" />
                        <h2 className="text-xl font-medium">{e.title}</h2>
                        <p className="text-xs mt-2">{e.description}</p>
                      </div>

                      <div className="mt-7 text-sm flex flex-col gap-2">
                        <div>📍 {e.venue}</div>
                        <div>📅 {new Date(e.date).toLocaleDateString()}</div>
                        <div>⏰ {e.time}</div>
                        <div>👥 Capacity: {e.capacity}</div>
                      </div>
                    </div>

                    <div className="w-44 flex-shrink-0 mt-auto text-right">
                      <div className="text-sm mb-2">{e.distanceKm == null ? '—' : `${e.distanceKm.toFixed(1)} km`}</div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => openRsvp(e)} className="px-3 py-2 rounded cursor-pointer transition-all duration-300 hover:scale-105 bg-teal-600 text-white text-sm">Participate</button>
                        <button className="px-3 py-2 rounded bg-[var(--button)] cursor-pointer transition-all duration-300 hover:scale-105 text-sm">Details</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </section>
          </div>

          {/* Sidebar: Quick summary + map placeholder */}
          <aside className="space-y-4">
            <div className="bg-[var(--card)] p-4 rounded shadow">
              <h3 className="font-medium">Summary</h3>
              <div className="mt-2 text-sm">
                <div>Total events: <strong>{events.length}</strong></div>
                <div>Showing: <strong>{filtered.length}</strong></div>
                <div>Using max distance: <strong>{maxDistanceKm} km</strong></div>
              </div>
            </div>

            <div className="bg-[var(--card)] p-4 rounded shadow">
              <h3 className="font-medium">Map (placeholder)</h3>
              <p className="text-sm mt-2">For a production app, integrate a map (Leaflet/Mapbox/Google Maps) here and plot event markers + user location.</p>
              <div className="mt-3 h-40 bg-[var(--bg)] rounded flex items-center justify-center text-sm">Map preview</div>
            </div>

            <div className="bg-[var(--card)] p-4 rounded shadow">
              <h3 className="font-medium">Tips</h3>
              <ul className="text-sm list-disc list-inside mt-2">
                <li>Allow location permission for accurate distances.</li>
                <li>Plug a real API endpoint to fetch live events.</li>
                <li>Use badges to show event status (open/full/cancelled).</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* RSVP Modal */}
        {showModal && modalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-[var(--card)] rounded-lg shadow-lg max-w-md w-full p-5 z-10">
              <h3 className="text-lg font-semibold">Register for</h3>
              <div className="text-sm mt-1 mb-3">{modalEvent.title} • {CATEGORY_LABELS[modalEvent.category]}</div>

              <input value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 border rounded mb-2" />
              <input value={rsvpEmail} onChange={(e) => setRsvpEmail(e.target.value)} placeholder="Your email" className="w-full px-3 py-2 border rounded mb-2" />

              <div className="flex gap-2 mt-3">
                <button onClick={doRsvp} className="flex-1 px-3 py-2 rounded bg-blue-600 text-white">Confirm</button>
                <button onClick={() => setShowModal(false)} className="px-3 py-2 rounded bg-gray-100">Cancel</button>
              </div>

              {rsvpMessage && (
                <div className={`mt-3 p-2 rounded text-sm ${rsvpMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{rsvpMessage.text}</div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        {/* <footer className="mt-8 text-center text-sm">Built with ❤️ — replace mock data with your backend to go live.</footer> */}
      </div>
    </div>
  );
}
