export const templeInfo = {
  name: "Sri Manakula Vinayagar Devasthanam",
  location: "Puducherry, India",
  address: "Manakula Vinayagar Koil Street, Puducherry – 605 001, India",
  phone: "+91 413 222 5563",
  description:
    "One of the oldest and most revered temples in Puducherry, dedicated to Lord Manakula Vinayagar, the sacred form of Lord Ganesha.",
  timings: [
    { session: "Morning", time: "5:45 AM – 12:30 PM" },
    { session: "Evening", time: "4:00 PM – 9:30 PM" },
    { session: "Friday", time: "Extended hours" },
  ],
};

export const services = [
  {
    id: 1,
    name: "Moolavar Abishegam",
    category: "Abhisegam",
    tamil: "மூலவர் அபிஷேகம்",
    description:
      "Sacred bathing ritual of the presiding deity with milk, curd, honey, and more.",
    session: "Morning",
    maxFamilies: 10,
    personsPerFamily: 3,
    advanceDays: 3,
  },
  {
    id: 2,
    name: "Ganapathy Homam",
    category: "Homam",
    tamil: "கணபதி ஹோமம்",
    description:
      "Vedic fire ritual offered to Lord Ganesha for prosperity, removal of obstacles, and blessings.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 5,
  },
  {
    id: 3,
    name: "Moolavar Sandhana Kaapu",
    category: "Kaapu",
    tamil: "மூலவர் சந்தன காப்பு",
    description:
      "Sacred sandalwood paste applied to the deity, a deeply auspicious offering.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 4,
    name: "Moolavar Vennai Kaapu",
    category: "Kaapu",
    tamil: "மூலவர் வெண்ணை காப்பு",
    description:
      "Butter offering to the deity — a traditional gesture of devotion and coolness.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 5,
    name: "Kavasam",
    category: "Kavasam",
    tamil: "கவசம்",
    description:
      "Armour prayers and ceremonial dressing of the deity for all auspicious events.",
    session: "All Day",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 6,
    name: "Gold Chariot",
    category: "Chariot",
    tamil: "தங்கத் தேர்",
    description:
      "The magnificent gold-plated chariot procession through the temple streets.",
    session: "Morning / Evening",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 7,
    name: "Silver Chariot",
    category: "Chariot",
    tamil: "வெள்ளித் தேர்",
    description:
      "The silver chariot procession — a divine spectacle of devotion.",
    session: "Morning / Evening",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 8,
    name: "Urchavar Thirukalyanam",
    category: "Thirukalyanam",
    tamil: "உற்சவர் திருக்கல்யாணம்",
    description:
      "The celestial wedding ceremony of the processional deity — a grand and auspicious event.",
    session: "Morning",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 9,
    name: "Annadhanam Prasadha Thonnai",
    category: "Annadhanam",
    tamil: "அன்னதானம் பிரசாத தொன்னை",
    description:
      "Sponsor holy leaf-cup food offerings distributed to devotees as divine prasadham.",
    session: "Session 1 / 2 / 3",
    maxPersons: 5,
    advanceDays: 3,
  },
  {
    id: 10,
    name: "Annadhanam Meals",
    category: "Annadhanam",
    tamil: "அன்னதான சாப்பாடு",
    description:
      "Sponsor a complete sacred meal served to devotees at the temple.",
    session: "Single Session",
    maxPersons: 1,
    advanceDays: 3,
  },
];

export const donation = {
  system: "E-Undiyal",
  description:
    "The temple's sacred digital donation system. Contributions support the divine welfare of Sri Manakula Vinayagar.",
  presetAmounts: ["₹108", "₹501", "₹1,001", "₹2,001", "₹5,001", "₹10,001"],
  features: [
    "80G Tax Certificate eligible under Section 80G",
    "Instant PDF receipt delivered to email",
    "Guest donations welcome — no account required",
    "Razorpay-powered secure encrypted transactions",
  ],
};

export const booking = {
  info: "Services can be booked online through the website. Advance booking is required.",
  advanceDays:
    "Minimum advance notice: 3 days for most services, 5 days for Ganapathy Homam.",
  process: "Select a service → Choose date & session → Enter devotee details → Review & proceed",
  sessions: ["Morning", "Evening", "All Day"],
};

export const festivals = [
  {
    name: "Vinayagar Chaturthi",
    description:
      "Annual Ganesha festival with extended darshan timings and special celebrations.",
  },
];

export const websiteSections = {
  "#services": "Browse and learn about all available sacred services",
  "#booking": "Book a pooja or service online",
  "#donate": "Make a donation through E-Undiyal",
  "#my-bookings": "Check your existing booking status",
  "#history": "Learn about temple history, architecture, festivals, and gallery",
};
