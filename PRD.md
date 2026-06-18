# Product Requirement Document (PRD)

## 1. Product Overview & Goals
* **Product Name:** HydroBot Companion App
* **Target Users:** Home hydroponics enthusiasts, smart furniture lovers.
* **Core Value:** Translates raw ESP32 IoT sensor data (water level, light intensity) into an emotional, anthropomorphic "smart botanical butler" experience, managing a decentralized ecosystem of stylish home hydroponic fixtures (desktop ornaments, pendant lights, floor-standing towers).

---

## 2. System Architecture & Tech Stack (Vibe Coding Target)
* **Frontend:** React (Vite) + Tailwind CSS (Mobile-responsive Web App).
* **Routing:** `react-router-dom` for client-side single-page app (SPA) routing.
* **Backend/Database:** Supabase (PostgreSQL with Realtime capabilities for instant status updates without page refreshing).
* **Hardware Integration (ESP32-r16n8):** Communicates via HTTP Post/Get or MQTT to fetch sensor states and update control parameters.

---

## 3. Core Page Specifications & User Flows

### Page 1: Dashboard (Home Screen)
#### UI/UX Structure:
1. **Top Section: Anthropomorphic Butler Persona (Visual Header)**
   * A cute digital robot/sprite avatar.
   * A dynamic dialogue box displaying customized, contextual greetings based on the global state of all connected devices.
2. **Bottom Section: Decentralized Device Cards (Grid/List View)**
   * Displays all connected hydroponic fixtures using user-defined nicknames (e.g., "Lily", "Living Room Tower").

#### Functional Logic & Data Mapping:
* **Butler AI Dialogue Engine (Contextual Rules):**
  * *Scenario A (All Healthy & Near Harvest):* If no alerts and any plant age > 10 days, display: `"Hello Master! Today is a beautiful day. Lily (Basil) has been growing for 10 days and is almost ready for harvest! 🌱"`
  * *Scenario B (Single Critical Alert):* If water level is LOW on any device, display: `"Oh no, Master! Lily is extremely thirsty and needs water immediately! Please refill the tank. 😰"`
  * *Scenario C (Multiple Events):* If multiple devices need attention, display: `"Master, 2 of your botanical babies need care: Lily is running low on water, and Bedroom Pendant has insufficient light (Auto-grow light activated)! 🤖"`
* **Device Card Component:**
  * Displays: Nickname, Plant Species, Growth Day (e.g., Day 12), and Growth Stage (Sprout/Growing/Harvest).
  * **Critical Alert Logic:** If ESP32 reports `water_level == "LOW"`, the card's water icon must **flash red** continuously, and a global top banner alert should appear.
  * **Mode Toggle:** A prominent switch on each card to toggle between `🤖 Smart Mode (ESP32 Autopilot)` and `🎛️ Custom Mode`.

---

### Page 2: Device Details & Control Center
#### UI/UX Structure:
* Accessed by clicking any device card from the Dashboard.
* **Top:** Animated placeholder reflecting the real-time activity (e.g., water ripples when the pump cycle is active, light glow when grow-lights are ON).
* **Middle:** Real-time telemetry dashboard (numerical displays for Light Intensity in Lux, and Water Level status).
* **Bottom:** Control Mode Settings Form.

#### Functional Logic:
* **Mode A: Smart Autopilot (Default):** The app locks manual sliders. ESP32 automatically controls the pump and grow-lights based on the predefined thresholds of the selected plant species from the Encyclopedia.
* **Mode B: Custom Mode:** When toggled ON, unlocks interactive UI controls:
  * *Grow-Light Schedule:* Time-range picker (e.g., ON from 08:00 to 22:00) to avoid light pollution at night.
  * *Water Pump Timer:* Interval adjustment (e.g., Run for 5 mins every 30 mins).
  * *Save Button:* Transmits customized parameters back to the database for ESP32 retrieval.

---

### Page 3: Botanical Encyclopedia & Plant Library
#### UI/UX Structure:
* Accessible via the permanent Bottom Navigation Bar.
* **Tab 1: Official Recommendations:** Curated list of plants perfectly optimized for indoor hydroponics (e.g., Roman Lettuce, Sweet Basil, Mint, Cherry Tomatoes).
* **Tab 2: My Custom Plants:** List of user-created plant profiles.

#### Functional Logic:
* **Official Plant Cards:** Clicking a plant opens a details modal showing its estimated growth cycle, light requirements, and ideal pump frequency.
* **"Start Planting" Flow (Core Integration):**
  1. User clicks `🌱 Start Planting` on a plant profile.
  2. A modal prompts: `"Which Hydro-Bot would you like to bind this plant to?"`
  3. Displays a list of the user’s active devices (e.g., "Lily", "Tower 1").
  4. User selects a device and confirms/modifies the device nickname.
  5. Upon confirmation, the app resets the target device's growth counter to `Day 1` and syncs the specific plant's automated growth parameters to that device card.
* **"Add Custom Plant" Feature:** A FAB (Floating Action Button) or button labeled `➕ Add Custom Plant`. Opens a form allowing users to type Name, Growth Cycle (Days), and manually define threshold values for custom automation.

---

### Page 4: Profile & System Settings
#### UI/UX Structure:
* Accessible via the Bottom Navigation Bar.
* Contains Account Info, Device Management list, and Push Notification toggles.

#### Functional Logic:
* **Add New Device Setup:** A simple guided wizard where users can register a new hardware device by entering the ESP32 MAC Address/Chip ID and assigns an initial nickname.
* **Notification Toggle:** Enables web browser push notifications for `LOW_WATER_LEVEL` emergency triggers.

---

## 4. Simplified Database Schema (Supabase/PostgreSQL Recommendation)

### 1. `devices` Table
* `id` (Primary Key, UUID)
* `chip_id` (Text, unique ESP32 identifier)
* `nickname` (Text, e.g., "Lily")
* `plant_type` (Text, references encyclopedia)
* `planting_date` (Timestamp, used to calculate growth days)
* `control_mode` (Text: "smart" or "custom")
* `custom_light_start` (Time)
* `custom_light_end` (Time)
* `custom_pump_interval` (Integer, minutes)

### 2. `telemetry` Table (Real-time updates from ESP32)
* `device_id` (Foreign Key)
* `updated_at` (Timestamp)
* `water_level` (Text: "NORMAL" or "LOW")
* `light_intensity` (Integer, Lux)

### 3. `encyclopedia` Table
* `id` (Primary Key)
* `name` (Text)
* `growth_cycle_days` (Integer)
* `is_custom` (Boolean)

---

## 5. Navigation & Routing Architecture
```text
[Dashboard / Home ("/") ]
   |-- Click Device Card --> [Device Details ("/device/:id")]
   |
[Bottom Nav]
   |-- Click Encyclopedia --> [Plant Library ("/encyclopedia")]
   |-- Click Profile      --> [User Settings ("/profile")]