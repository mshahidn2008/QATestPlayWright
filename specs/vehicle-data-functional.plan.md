# Tricentis Vehicle Data Functional Test Plan

## Application Overview

Comprehensive functional test plan for the Tricentis sample Vehicle Insurance application, focused on the "Enter Vehicle Data" step at https://sampleapp.tricentis.com/102/app.php. The plan covers happy-path completion, field presence, dropdown data, validation rules, error handling, and basic accessibility/UX behaviors. Assumption: tests run via Playwright with a fresh browser context per test, no server-side state between runs.

## Test Scenarios

### 1. Vehicle Data - Happy Path & Smoke

**Seed:** `tests/vehicle-data-validation.spec.ts`

#### 1.1. Submit valid vehicle data for automobile

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to https://sampleapp.tricentis.com/102/app.php
    - expect: Page title is "Tricentis Vehicle Insurance - Enter Vehicle Data".
    - expect: Vehicle Data step in the wizard is highlighted as active.
  2. Select a valid Make (e.g., BMW) and Model (e.g., Scooter).
    - expect: Make and Model dropdowns display selected values.
    - expect: No validation error message is shown for Make or Model.
  3. Enter valid numeric values for Cylinder Capacity, Engine Performance, Payload, Total Weight, List Price, and Annual Mileage.
    - expect: Each numeric field accepts input and displays the entered value.
    - expect: No immediate validation error messages for valid numeric ranges.
  4. Enter a valid manufacture date (e.g., 01/15/2020) using the date textbox directly.
    - expect: Date is accepted and formatted as MM/DD/YYYY.
    - expect: No validation error for the date field.
  5. Select Number of Seats (e.g., 5), select Right Hand Drive = Yes, set Number of Seats (second dropdown if required), and select a Fuel Type (e.g., Petrol).
    - expect: Radio button for Right Hand Drive reflects the selected option.
    - expect: All dropdowns show selected options and no errors are displayed.
  6. Click the "Next »" button to navigate to the next wizard step.
    - expect: Browser navigates to the Insurant Data step.
    - expect: Page title changes to "Tricentis Vehicle Insurance - Enter Insurant Data" or similar.

#### 1.2. Basic smoke test: page load and primary controls

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to https://sampleapp.tricentis.com/102/app.php
    - expect: Page loads without client-side JavaScript errors in console (ignoring known deprecation warnings).
    - expect: Main navigation (Automobile, Truck, Motorcycle, Camper) is visible.
    - expect: Wizard navigation (Enter Vehicle Data, Enter Insurant Data, Enter Product Data, Select Price Option, Send Quote) is visible.
  2. Verify presence and basic interactivity of Make, Model, Date of Manufacture, Right Hand Drive, and Next button controls.
    - expect: Make and Model are exposed as comboboxes with at least one selectable option.
    - expect: Date of Manufacture is a textbox with an associated calendar button.
    - expect: Right Hand Drive has two radio options: Yes and No, both clickable.
    - expect: Next button is enabled on initial page load.

### 2. Vehicle Data - Field Presence & Layout

**Seed:** `tests/vehicle-data-validation.spec.ts`

#### 2.1. Verify all vehicle data form fields are present and visible

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to https://sampleapp.tricentis.com/102/app.php
    - expect: Vehicle Data form is visible within main content area.
  2. Check visibility of all primary input controls (Make, Model, Cylinder Capacity, Engine Performance, Date of Manufacture, Number of Seats, Right Hand Drive radios, second Number of Seats dropdown, Fuel Type, Payload, Total Weight, List Price, License Plate Number, Annual Mileage).
    - expect: Each field is present in the DOM and visible on screen.
    - expect: Each control is focusable (via click or tab) and not disabled.
  3. Verify labels and helper texts for each field (e.g., units like [ccm], [kW], [kg], [$], [mi]).
    - expect: Every input has an associated visible label text matching the design (e.g., "Cylinder Capacity [ccm]").
    - expect: Helper texts such as "Select an option" appear where expected.

#### 2.2. Verify header, navigation, and footer elements

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to https://sampleapp.tricentis.com/102/app.php
    - expect: Header shows the Tricentis logo, application title, and version text.
    - expect: Top navigation (Automobile, Truck, Motorcycle, Camper) is present.
  2. Verify support search area (Visit Support link, search textbox, search button).
    - expect: "Visit Support!" link navigates to https://support.tricentis.com in a new tab or window.
    - expect: Search textbox is visible and editable; search button is clickable.
  3. Scroll to page bottom and verify footer links and social icons.
    - expect: Footer links About, Products, Events & Webinars, Resources, and Services are visible and clickable.
    - expect: Social links (Facebook, Twitter, Google+) are visible and have the correct URLs.

### 3. Vehicle Data - Dropdown Options & Dependencies

**Seed:** `tests/vehicle-data-validation.spec.ts`

#### 3.1. Validate Make dropdown options

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page.
    - expect: Make combobox is visible and enabled.
  2. Open the Make dropdown and inspect available options.
    - expect: Options include at minimum: Audi, BMW, Ford, Honda, Mazda, Mercedes Benz, Nissan, Opel, Porsche, Renault, Skoda, Suzuki, Toyota, Volkswagen, Volvo.
    - expect: Placeholder option "– please select –" is present and selected by default.

#### 3.2. Validate Model dropdown options

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page.
    - expect: Model combobox is visible and enabled.
  2. Open the Model dropdown and inspect options.
    - expect: Options include at minimum: Scooter, Three-Wheeler, Moped, Motorcycle.
    - expect: Placeholder option "– please select –" is present and selected by default.

#### 3.3. Validate Fuel Type dropdown options

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page.
    - expect: Fuel Type combobox is visible and enabled.
  2. Open Fuel Type dropdown and inspect options.
    - expect: Options include: Petrol, Diesel, Electric Power, Gas, Other.
    - expect: Placeholder option "– please select –" is present and selected by default.

#### 3.4. Validate Number of Seats dropdowns

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page.
    - expect: Both Number of Seats comboboxes are visible (for vehicle and, if applicable, motorcycle).
  2. Open each Number of Seats dropdown.
    - expect: Each dropdown contains expected numeric ranges (1–9 for the main seats dropdown, at least 1–3 for the second dropdown).
    - expect: Placeholder option "– please select –" is present by default.

### 4. Vehicle Data - Validation & Error Handling

**Seed:** `tests/vehicle-data-validation.spec.ts`

#### 4.1. Required field validation on empty form submit

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page and click "Next »" without filling any fields.
    - expect: Form blocks navigation to the next step when required fields are missing.
    - expect: Validation messages or highlighting appear for required fields such as Make, Model, Cylinder Capacity, Engine Performance, Date of Manufacture, Number of Seats, Fuel Type, List Price, License Plate Number, and Annual Mileage.

#### 4.2. Numeric fields reject non-numeric values

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page.
    - expect: Numeric fields are initially empty.
  2. Attempt to enter alphabetic or special characters into Cylinder Capacity, Engine Performance, Payload, Total Weight, List Price, and Annual Mileage.
    - expect: Non-numeric input is either blocked or triggers validation errors on blur or submit.
    - expect: Field values are either sanitized to numeric-only or error messaging clearly indicates invalid input.

#### 4.3. Boundary testing for numeric fields

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Enter minimum allowed values (e.g., Cylinder Capacity = 1, Engine Performance = 1, Payload = 1, Total Weight = 1, List Price = 1, Annual Mileage = 1) and click Next.
    - expect: If within business rules, form accepts values and proceeds to the next step without errors.
    - expect: If below allowed bounds, clear validation errors point out which fields are invalid.
  2. Enter extreme high values for numeric fields (e.g., 999999 or a defined upper bound) and click Next.
    - expect: Application either accepts large values if allowed, or shows validation errors if exceeding limits.
    - expect: No client-side crashes or overflow rendering issues.

#### 4.4. Date of Manufacture validation

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page.
    - expect: Date of Manufacture field is visible and empty.
  2. Enter an invalid date format (e.g., 2020-13-40) and tab out or attempt to submit.
    - expect: Application rejects invalid date format (either by input masking or by validation errors on submit).
  3. Enter a future date (e.g., 01/01/2100) and attempt to submit.
    - expect: If future dates are not allowed, an error is shown and navigation is blocked.
    - expect: If future dates are allowed, document behavior in test notes.

### 5. Vehicle Data - UX & Accessibility Basics

**Seed:** `tests/vehicle-data-validation.spec.ts`

#### 5.1. Keyboard navigation and focus order

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Navigate to the Vehicle Data page and use only Tab/Shift+Tab to move through focusable elements from top to bottom.
    - expect: Focus starts from the browser chrome or top navigation and then proceeds logically through Vehicle Data fields in visual order (Make → Model → Cylinder Capacity → Engine Performance → Date of Manufacture → ... → Next button).
    - expect: No focus traps occur; user can reach all interactive elements using keyboard only.

#### 5.2. Form labels and accessible names

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Inspect accessible names of all form controls using Playwright locators based on roles/labels (e.g., getByLabel, getByRole).
    - expect: Each input has an accessible name that matches its visible label text (e.g., "Cylinder Capacity [ccm]").
    - expect: Radio buttons for Right Hand Drive have labels "Yes" and "No" read by screen readers.

#### 5.3. Button and link semantics

**File:** `tests/vehicle-data-validation.spec.ts`

**Steps:**
  1. Inspect key interactive elements (Next button, navigation links, Request Demo, Visit Support) using role-based locators.
    - expect: Primary call-to-action is implemented as a button role and not as a plain div.
    - expect: Navigation items expose correct link roles and accessible names matching their text labels.
