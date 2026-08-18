# 🏢 WorkCorp

> A modern workspace booking platform built for flexible and hybrid teams.

WorkHub is a full-stack workspace booking application that enables users to discover, explore, and book shared workspaces through an intuitive and responsive experience.

The platform supports multiple workspace types, interactive floor plans, real-time availability checks, hourly and day-pass booking flows, authentication, automated booking lifecycle management, check-ins, booking history, and dynamic pricing.

The project was built with a strong focus on **architecture, security, performance, accessibility, maintainability, and real-world booking logic**.

---

## ✨ Overview

Finding and reserving the right workspace should be simple.

WorkHub provides a centralized platform where users can:

- 🔎 Discover available workspaces by category
- 🗺️ Explore workspaces through interactive 2D floor plans
- 🏢 View detailed workspace information and amenities
- 📅 Check availability before booking
- ⏰ Make hourly or full-day reservations
- 👥 Select an appropriate team size
- 💰 View dynamically calculated pricing
- 🔐 Book through an authenticated flow
- ⚡ Enable automatic check-in
- ✅ Check into active bookings
- ❌ Cancel upcoming reservations
- 📊 Track active bookings and remaining booking time
- 📚 Review booking history across multiple lifecycle states

WorkHub handles both the user-facing booking experience and the underlying booking lifecycle required to keep reservations synchronized with time.

---

# 🧩 Workspace Categories

WorkHub supports four major workspace categories:

### ☎️ Phone Booths

Private spaces designed for focused work, calls, and virtual meetings.

### 🖥️ Hot Desks

Flexible desks for individuals and teams, including both solo and collaborative desk configurations.

### 🚪 Private Offices

Dedicated office spaces for individuals and teams requiring additional privacy.

Private offices include both **Executive** and **Deluxe** workspace options.

### 🤝 Meeting Rooms

Collaborative rooms designed for meetings, presentations, workshops, and team sessions.

Each workspace contains its own:

- Name and unique code
- Capacity range
- Description
- Location
- Amenities
- Pricing
- Workspace images
- Booking type
- Availability

---

# 🚀 Core Features

## 🗺️ Interactive Floor Plans

Workspace categories can be explored using an interactive **2D floor plan** in addition to the traditional grid view.

The floor plans visually represent where individual workspaces are located relative to surrounding spaces such as lounges, reception areas, entrances, and shared facilities.

Users can select a workspace directly from the floor plan.

Selecting a workspace:

1. Highlights the workspace
2. Reveals contextual actions
3. Allows the user to **View Details**
4. Allows the user to **Book Now**

Availability is intentionally **not fetched from the floor plan**. It is requested only when required by the booking flow, reducing unnecessary database requests.

---

## 🔄 Grid & Layout Views

Category pages support two browsing modes:

### Grid View

Displays workspaces as responsive cards containing key information.

Users can also filter supported workspace categories based on relevant workspace attributes.

### Layout View

Displays the interactive floor plan for the selected category.

The filtering interface is hidden while the layout view is active because the floor plan represents the physical workspace arrangement rather than a filtered catalogue.

---

# 🏢 Workspace Details

Every workspace has a dedicated details page containing:

- Workspace name
- Workspace code
- Location
- Capacity
- Pricing
- Description
- Image gallery
- Amenities
- Booking rules
- Booking action

Workspace information is retrieved using its unique slug.

Related images and amenities are retrieved through Supabase relationships:

```text
Workspace
   │
   ├── Workspace Images
   │
   └── Workspace Amenities
             │
             └── Amenities
```

This keeps the database normalized while allowing the frontend to retrieve the complete workspace information required by the page.

---

# 📅 Booking System

WorkHub contains **two independent booking flows** because different workspace categories have different reservation requirements.

```text
Booking
   │
   ├── Hourly Booking
   │
   └── Day-Pass Booking
```

This separation keeps booking logic easier to maintain and prevents unnecessary complexity between fundamentally different reservation models.

---

# ⏰ Hourly Booking Flow

Hourly bookings are designed for workspaces that can be reserved for specific periods during the working day.

The booking window runs between:

```text
08:00 → 17:00
```

with availability evaluated in **30-minute time blocks**.

The minimum booking duration is **1 hour**.

### Booking Flow

```text
Open Booking Modal
        ↓
Select Date
        ↓
Fetch Existing Bookings
        ↓
Calculate Valid Start Times
        ↓
Select Start Time
        ↓
Calculate Valid End Times
        ↓
Select End Time
        ↓
Calculate Duration
        ↓
Calculate Price
        ↓
Review Booking
        ↓
Confirm
```

Availability is **not fetched when the modal initially opens**.

Instead, the query is enabled only after the user selects a date.

This avoids unnecessary database requests when users open and close the modal without beginning the booking process.

---

## 🧠 Hourly Availability Engine

Hourly availability is derived from existing bookings rather than storing every possible time block in the database.

The application fetches existing reservations for:

```text
workspace_id + booking_date
```

Only bookings capable of blocking availability are considered.

The returned booking periods are transformed into 30-minute time blocks and removed from the workspace's normal bookable schedule.

### Default Start Times

```text
08:00
08:30
09:00
09:30
...
15:30
16:00
```

A start time is only valid when the system can guarantee the minimum booking duration.

---

## 🔭 Forward Availability Check

After booked periods are removed, each remaining start time is evaluated.

For a time to remain a valid start time, the following continuous blocks must also be available:

```text
Selected Time
     ↓
+ 30 minutes
     ↓
+ 60 minutes
```

This ensures users cannot select a start time that cannot satisfy the minimum **one-hour booking duration**.

---

## 🕐 Same-Day Booking Protection

Bookings made for the current day require additional validation.

The system calculates the current time and applies a cutoff before returning valid start times.

This prevents users from booking time periods that have already passed or are too close to the current time.

The availability engine therefore accounts for both:

```text
Existing Bookings
        +
Current Time
        ↓
Valid Start Times
```

---

## ⏱️ Dynamic End Times

End-time options are calculated only after the user selects a valid start time.

The first possible end time is:

```text
Selected Start Time + 1 Hour
```

Additional 30-minute intervals are then included while continuous availability remains.

For example:

```text
Start Time: 09:30

Possible End Times:

10:30
11:00
11:30
12:00
...
```

If an existing booking interrupts the sequence, later end times are excluded.

---

## 💵 Hourly Price Calculation

Hourly pricing is calculated from the selected booking duration.

```text
Duration = End Time - Start Time

Total Price = Duration × Hourly Rate
```

The price automatically updates when the selected time range changes.

---

# 📆 Day-Pass Booking Flow

Day-pass workspaces are reserved for an entire working day rather than individual time slots.

The booking flow is therefore intentionally simpler:

```text
Open Modal
    ↓
Fetch Booked Dates
    ↓
Display Availability Calendar
    ↓
Select Available Date
    ↓
Select Team Size
    ↓
Calculate Price
    ↓
Review Booking
    ↓
Confirm
```

Booked dates are disabled in the calendar, preventing conflicting reservations.

The calendar supports navigation across months while preventing invalid selections.

---

# 👥 Dynamic Team Capacity

Workspace capacities are stored using:

```text
capacity_min
capacity_max
```

The frontend dynamically generates every valid team size between these values.

For example:

```text
capacity_min = 13
capacity_max = 15
```

becomes:

```text
13
14
15
```

This means team-size options never need to be manually hardcoded for individual workspaces.

---

# 💰 Dynamic Day-Pass Pricing

Day-pass pricing can vary depending on the selected team size.

The workspace's maximum capacity represents its full base price, while smaller valid team sizes receive recalculated pricing.

This allows the booking UI to adapt automatically to workspaces with different capacity ranges.

---

# 🔐 Authentication & Protected Booking

Workspace discovery remains publicly accessible, while booking requires authentication.

When an unauthenticated user attempts to book:

```text
Book Now
   ↓
Authentication Check
   ↓
Not Authenticated
   ↓
Redirect to Login
```

The originating route is preserved so the user can return to the appropriate workspace after authentication.

Authentication is powered by **Supabase Auth**.

---

# 📚 Booking History

Authenticated users can manage their reservations from the History page.

Bookings are divided into five lifecycle states:

| Status | Meaning |
|---|---|
| 🟢 Active | Booking is currently in progress |
| 🔵 Upcoming | Booking has not started |
| ✅ Completed | Booking ended after successful check-in |
| ❌ Cancelled | Booking was cancelled before it began |
| ⚠️ No-Show | Booking ended without user check-in |

Tabs are managed within the same History page rather than separate routes.

TanStack Query handles fetching and caching booking data.

---

# 🔄 Automated Booking Lifecycle

Booking status transitions are handled automatically at the database layer.

```text
UPCOMING
   │
   │ Start time reached
   ▼
ACTIVE
   │
   │ End time reached
   ▼
 ┌───────────────┐
 │ Checked in?   │
 └───────┬───────┘
         │
    ┌────┴────┐
   YES        NO
    │          │
    ▼          ▼
COMPLETED   NO-SHOW
```

A scheduled **Supabase Cron job** periodically executes the booking lifecycle database function.

This architecture is important because lifecycle transitions should not depend on:

- The user's browser remaining open
- A React component being mounted
- Client-side timers
- The user refreshing the page

The database remains the authoritative source of booking state.

---

# ⚡ Auto Check-In

Users can enable **Auto Check-In** for upcoming reservations.

Enabling it updates the booking's:

```text
auto_check_in = true
```

When the booking automatically transitions from `upcoming` to `active`, the lifecycle logic checks this value.

If enabled:

```text
checked_in_at = current timestamp
```

The user therefore enters the active booking already checked in.

---

# ✅ Manual Check-In

Active bookings that were not automatically checked in display a manual check-in control.

When check-in succeeds:

```text
checked_in_at = current timestamp
```

Once checked in, the control becomes disabled because check-in cannot be reversed.

At booking completion, `checked_in_at` determines whether the booking becomes:

```text
Completed
```

or:

```text
No-Show
```

---

# ❌ Booking Cancellation

Upcoming bookings can be cancelled before they become active.

Cancellation updates the booking status and refreshes the relevant cached booking data through TanStack Query invalidation.

Cancelled bookings remain available in booking history for reference.

---

# 📊 Active Booking Progress

Active reservations display a dynamic progress indicator showing the **percentage of booking time remaining**.

Conceptually:

```text
Remaining Time = End Time - Current Time

Remaining Percentage =
(Remaining Time / Total Booking Duration) × 100
```

The progress bar therefore decreases as the booking approaches its end time.

---

# 🗄️ Database Architecture

WorkHub uses **Supabase PostgreSQL** as its primary database.

Core entities include:

```text
Users
  │
  └── Bookings
          │
          └── Workspaces
                 │
                 ├── Workspace Images
                 │
                 ├── Workspace Amenities
                 │        │
                 │        └── Amenities
                 │
                 └── Categories
```

Additional supporting entities manage application concerns such as roles, locations, and payments.

The schema is normalized to prevent unnecessary duplication and maintain clear relationships between workspace data.

---

# 🖼️ Workspace Image Architecture

Workspace images are stored separately from workspace records.

Each workspace can contain multiple images with metadata such as:

- Image path
- Alternative text
- Display order
- Primary image status

This allows image collections to grow independently without expanding the core workspace table.

---

# 🧰 Technology Stack

### Frontend

- ⚛️ **Next.js**
- ⚛️ **React**
- 🟦 **TypeScript**
- 🎨 **Tailwind CSS**
- 🧩 **shadcn/ui / Radix UI**
- 🎯 **Lucide React**

### Data & State

- 🗄️ **Supabase PostgreSQL**
- 🔐 **Supabase Authentication**
- 🔄 **TanStack Query**
- 📝 **React Hook Form**
- ✅ **Zod**

### Booking & UI

- 📅 **React DayPicker**
- 🗺️ **SVG-based interactive floor plans**

### Testing

- 🧪 **Jest**
- 🧪 **React Testing Library**
- 👤 **User Event**
- 🌐 **MSW**

---

# 🏗️ Architecture

WorkHub follows a component-driven architecture with clear separation between:

```text
UI Components
      ↓
Application / Booking Logic
      ↓
Data Query Layer
      ↓
Supabase
```

Responsibilities are intentionally separated between:

- Presentation components
- Booking components
- Availability utilities
- Authentication logic
- Database queries
- Application configuration
- Types
- Context providers
- Server and client concerns

This improves maintainability and makes individual pieces easier to test.

---

# 🔄 Server & Client Rendering Strategy

Next.js Server Components are used where client-side interactivity is unnecessary.

Client Components are reserved for functionality requiring:

- React state
- Event handlers
- Browser APIs
- TanStack Query
- Interactive calendars
- Booking modals
- Interactive floor plans

This reduces unnecessary JavaScript shipped to the browser while preserving rich interaction where required.

---

# ⚡ Performance Optimizations

Performance was treated as an architectural concern rather than a final styling pass.

Implemented and considered optimizations include:

### 🚀 Next.js Rendering

- Server Components where appropriate
- Route-level code splitting
- Lazy loading for expensive client functionality
- Dynamic imports where beneficial
- Suspense boundaries for asynchronous content

### 📦 Bundle Optimization

The production bundle was analyzed to identify unnecessarily large dependencies and client-side bundles.

Next.js automatically provides route-level splitting, while additional splitting is applied selectively where components do not need to be included in the initial bundle.

### 🔤 Font Optimization

Fonts are handled using Next.js font optimization to:

- Reduce layout shifts
- Improve loading behaviour
- Avoid unnecessary external font requests
- Improve Core Web Vitals

### 🖼️ Asset Optimization

Workspace assets are organized predictably and loaded according to their UI requirements.

Image dimensions and rendering behaviour are considered to reduce layout shifts and unnecessary asset loading.

### 🗄️ Database Optimization

Database indexes are used for frequently queried fields involved in operations such as:

```text
workspace_id
booking_date
status
slug
category_id
```

This improves lookup performance as booking and workspace data grows.

### 🔄 TanStack Query Caching

Server state is cached using TanStack Query.

Queries are configured around application behaviour rather than blindly refetching data.

Mutation operations invalidate relevant cached queries when fresh server data is required.

---

# 📈 Core Web Vitals

Performance auditing focused on metrics including:

- **LCP** — Largest Contentful Paint
- **FCP** — First Contentful Paint
- **CLS** — Cumulative Layout Shift
- **TTFB** — Time to First Byte
- **INP** — Interaction to Next Paint

Lighthouse was used during performance auditing to identify rendering, asset, accessibility, and loading bottlenecks.

---

# 🧪 Testing Strategy

WorkHub uses a layered testing approach.

## Unit Tests

Pure business logic is tested independently.

Examples include:

- Time → minute conversion
- Minute → time conversion
- Consecutive time-slot generation
- Same-day availability filtering
- End-time generation
- Booking availability utilities

These functions are deterministic and tested separately from the UI.

## Component Tests

React Testing Library verifies components from the user's perspective.

Tests focus on behaviour such as:

- Rendering expected data
- User selections
- Button interaction
- Capacity selection
- Conditional rendering
- Disabled states

Rather than testing internal implementation details, tests assert what users can see and do.

## Integration Tests

Integration tests verify that multiple application layers work together correctly.

Critical booking flows test interactions between:

```text
React Components
       ↓
TanStack Query
       ↓
Data Query Layer
       ↓
Availability Logic
       ↓
Rendered UI
```

External boundaries are mocked where appropriate so tests remain predictable and do not depend on the production database.

---

# 🔒 Security Considerations

Security measures and architectural decisions include:

- Supabase authentication
- Protected booking operations
- Server-side authorization where appropriate
- Row Level Security considerations
- Role-aware access
- Input validation with Zod
- Database constraints
- Controlled booking status transitions
- Avoiding client authority over automated lifecycle transitions

The client should never be considered the authoritative source for sensitive booking state.

---

# ♿ Accessibility

Accessibility considerations include:

- Semantic HTML
- Proper button elements for interactive controls
- Accessible labels
- Keyboard-accessible controls
- Visible selected and disabled states
- Sufficient interaction feedback
- Responsive layouts
- Image alternative text
- Clear loading and error states

Interactive functionality is designed to remain understandable beyond purely visual indicators.

---

# 📱 Responsive Design

WorkHub is designed to work across:

- 📱 Mobile devices
- 📟 Tablets
- 💻 Laptops
- 🖥️ Desktop screens

Floor plans use responsive SVG rendering so their coordinate system remains consistent while the visual layout scales with the available viewport.

Cards, booking interfaces, calendars, navigation, and workspace details adapt to smaller screens using responsive layouts.

---

# 🧠 Key Engineering Decisions

### Why derive availability instead of storing every available slot?

Availability is calculated from existing bookings.

This avoids maintaining a large table containing every possible 30-minute slot for every workspace and date.

---

### Why separate hourly and day-pass booking flows?

The two reservation models have fundamentally different availability requirements.

Keeping them separate reduces branching logic and makes each booking flow easier to reason about and maintain.

---

### Why TanStack Query?

Booking availability and history are **server state**.

TanStack Query provides:

- Query caching
- Loading/error states
- Conditional fetching
- Mutation handling
- Query invalidation
- Controlled refetching

---

### Why database Cron instead of browser timers?

Booking lifecycle transitions must happen even when nobody has the application open.

Database scheduling makes lifecycle processing independent of the frontend.

---

### Why SVG for floor plans?

SVG provides:

- Responsive scaling
- Precise coordinates
- Lightweight rendering
- Native browser support
- Interactive elements
- Easy integration with React state

This makes it well suited for WorkHub's interactive 2D workspace maps.

---

# ⚖️ Trade-Offs

### No dedicated availability table

Availability is derived from booking records.

**Benefit:** less duplicated data and simpler persistence.

**Trade-off:** additional computation is required when determining available periods.

---

### Periodic lifecycle processing

Booking transitions are processed by a scheduled database job.

**Benefit:** reliable server-controlled automation.

**Trade-off:** status changes may occur shortly after the exact boundary depending on the Cron interval.

---

### Client-side interactive floor plans

Floor plans require client-side state for workspace selection.

**Benefit:** rich interaction and immediate visual feedback.

**Trade-off:** the interactive portion requires client-side JavaScript.

---

### Cached booking data

TanStack Query reduces unnecessary network requests.

**Benefit:** faster navigation and better perceived performance.

**Trade-off:** automatically changed server data may remain cached briefly until the configured refetch strategy refreshes it.

---

# 📂 Project Structure

A simplified representation of the project:

```text
src/
│
├── app/
│   ├── workspaces/
│   ├── history/
│   ├── login/
│   └── ...
│
├── components/
│   ├── booking/
│   │   ├── hourly/
│   │   └── day/
│   ├── category/
│   ├── details/
│   ├── modal/
│   └── ...
│
├── lib/
│   ├── booking/
│   ├── context/
│   ├── db/
│   ├── supabase/
│   └── test/
│
├── types/
│
└── util/
```

---

# ⚙️ Local Setup

## 1. Clone the repository

```bash
git clone <repository-url>
cd workhub
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create:

```text
.env.local
```

Add the required Supabase environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

## 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Running Tests

Run the complete test suite:

```bash
npm test
```

Run Jest in watch mode if configured:

```bash
npm test -- --watch
```

---

# 📦 Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🔍 Bundle Analysis

If bundle analysis is configured:

```bash
npm run analyze
```

This generates information about the application's production bundles and helps identify unnecessarily large dependencies.

---

# 🌱 Future Improvements

Potential future iterations include:

- 💳 Production payment processing
- 🔔 Booking reminders and notifications
- 📧 Email confirmations
- 🏢 Multi-location workspace support
- 📊 Administrative analytics
- 🔎 Advanced workspace search
- ❤️ Saved/favourite workspaces
- 📲 Progressive Web App capabilities
- 📅 Calendar integrations
- 🔔 Real-time booking lifecycle notifications
- 📈 Workspace utilization analytics

---

# 🎯 Project Goals

WorkHub was built not simply as a UI exercise, but as an exploration of production-oriented frontend and application architecture.

The project demonstrates practical experience with:

- Complex booking logic
- Server-state management
- Database modelling
- Authentication
- Automated backend workflows
- Interactive SVG interfaces
- Responsive UI architecture
- Performance optimization
- Accessibility
- Testing
- Full-stack integration with Supabase

The result is a scalable foundation for a real-world flexible workspace booking product.

---

# 👩‍💻 Author

**Hafeezah Kadiri**  
Frontend Engineer & Architect

Built with Next.js, TypeScript, Supabase, TanStack Query, and a focus on building secure, performant, maintainable user experiences.

---

## ⭐ WorkHub

**Discover. Book. Work.**
