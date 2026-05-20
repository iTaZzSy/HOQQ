# Project Context: Simple Cafe Website Backend

## Technology Stack
- **Runtime:** Node.js (Latest LTS)
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript (Strict mode)

## Core Features
1. **Public Menu (Read-Only for Users):** Display categories, items, and prices (supports sizes/variants).
2. **Reservation System:** A form for users to book tables (Name, Date, Time, Guests).
3. **Admin Dashboard (Optional logic):** To add/edit menu items and view reservations.

## Coding Standards
- **Architecture:** Controller -> Service -> Model.
- **Validation:** Use **Zod** for reservation inputs (prevent past dates, invalid phone numbers).
- **Error Handling:** Use `async/await` with global error handler.

## Business Logic Rules
### 1. Menu (Display Only)
- The goal is to display prices.
- Schema must support:
  - **Single Price:** e.g., Sandwich = 20 SAR.
  - **Variable Price:** e.g., Latte (Small: 10, Large: 15).
  - *No "Order" processing needed, just storing and retrieving data.*

### 2. Reservations (The Main Logic)
- **Conflict Check:** Even though it's simple, we must prevent double-booking the same table/time.
- **Rules:**
  - Date must be in the future.
  - Required fields: Name, Phone, Date, Time, Guest Count.