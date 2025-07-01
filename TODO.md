# TODO – Plantly Project

Notes and tasks to improve the application.

---

## Models & Database

- [ ] Replace `species_id` with `slug` or `externalId` in `UserPlant`
- [ ] Add `slug` field to `Species` model
- [ ] Write a migration script to update existing `UserPlant` entries with new species references
- [ ] Handle cases where `species_id` is missing or invalid (fallback to "Unknown species")

---

## Backend

- [ ] Add validation when creating a `UserPlant` to ensure the species exists
- [ ] Improve `getAllSpecies` endpoint (support filtering and sorting)
- [ ] Create a backup of the `species` collection before reseeding

---

## Frontend

- [ ] Style the table on the dashboard (sticky headers, pagination)
- [ ] Separate plant card and care info modal into reusable components
- [ ] Add image fallback if the plant species has no image
- [ ] Add Welcome landing with info about the project

---

## Dev & CI

- [ ] Update project dependencies (Mongoose, dotenv, React, etc.)
- [ ] Set up ESLint + Prettier
- [x] Consider splitting client and server for better deployment on Render

---

## Nice to Have

- [ ] Watering reminders
- [ ] User profile settings
- [ ] Built-in plant care calendar
- [ ] Export/import user plant collection

---

*Last updated: 06/30/2025*
