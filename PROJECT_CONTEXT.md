# Healthcare Platform Project Context

## Project Type
This is a real startup healthcare platform, NOT a college project.

Build it like a production SaaS product.

## Core Product Vision
Healthcare marketplace/platform connecting:

- Patients
- Doctors
- Clinics
- Hospitals
- Labs
- Healthcare providers
- Admin team

Initial launch location:
- Vasai-Virar only

Do not show future cities until decided.

---

# Important Development Rules

1. Do not redesign existing working UI unnecessarily.
2. Do not replace files unless required.
3. Fix specific bugs only.
4. Maintain existing architecture.
5. Keep UI premium/professional.
6. Avoid beginner/college project style.
7. When giving code, provide complete files.
8. Preserve existing features.

---

# Authentication System

There is ONE login system.

Roles:

PATIENT
PROVIDER
ADMIN
SUPER_ADMIN


Login flow:

User logs in once.

System checks role.

Redirect:

PATIENT:
patient dashboard

PROVIDER:
provider dashboard

ADMIN:
admin dashboard

SUPER_ADMIN:
super admin dashboard


---

# Registration Logic

Patient:

Normal registration.

Creates:
User
PatientProfile


Provider:

Registration is separate option:
"Healthcare Partner"

Provider types:

- Doctor
- Clinic
- Hospital
- Lab


Provider registration creates:

User role:
PROVIDER

Provider profile:

status:
PENDING


Provider cannot fully operate until approved.

Super Admin approves/rejects provider.


---

# Super Admin

Super admin has full control.

Can:

- manage admins
- approve providers
- reject providers
- manage platform


---

# Theme System

After login user can switch:

LIGHT mode
DARK mode


Theme preference stored per user.

Do not remove theme button.

---

# Healthcare UI Requirements

Design should feel like:

Practo / Apollo / modern healthcare SaaS

Not:

college project
basic cards
plain HTML


---

# Current Features Implemented

- Backend Node.js
- Express
- Prisma
- PostgreSQL
- JWT authentication
- Role system
- Registration
- Login
- Provider approval logic
- Super admin dashboard
- Patient dashboard
- Provider dashboard


---

# Search Feature

Healthcare search:

Example:

Typing:
"N"

should only show matching names.

Typing:
"NAV"

should show only results containing NAV.


Recent searches:

- Store per user
- Show only that user's history


Trending searches:

Global popular searches.


---

# Future Planned Features

Booking email confirmation system.

Same style as salon management system:

After booking:

Send email confirmation

Contains:

- booking details
- provider
- service
- date
- time
- status


---

# Database

Current stack:

Prisma ORM

PostgreSQL


Be careful with Prisma syntax.

Relations must be written:

field Type @relation(...)

NOT:

field Type
@relation(...)


---

# Development Style

Before modifying:

Check existing file.

Do not assume missing code.

Ask for file if needed.



