# 🩺 MediSync — Longitudinal Health Passport & Cross-Provider Care Continuity

> **24-Hour Web Development Hackathon • IIITDM Kancheepuram**  
> **Domain:** HealthTech  
> **Problem Statement:** *Lost in Transit: Fragmented Medical Records and Repeated Care Across Providers*  
> **Live Demo:** `http://localhost:3000` (Locally running) | Deployable to Vercel / Netlify in 1 click  

---

## 📌 Executive Summary & Problem Context

Patients with long-term conditions (Type 2 Diabetes, Hypertension, Coronary Artery Disease, Asthma) frequently consult multiple doctors across diverse clinics, diagnostic labs, and pharmacies over the years. 

Each provider maintains its own records—often trapped in physical paper prescriptions, PDF reports, or messaging app screenshots. When patients switch physicians, move cities, or arrive at an emergency room:
1. **Scattered Records:** No unified longitudinal health timeline exists.
2. **Unreliable Recall:** Patients struggle to recall past dosages, allergies, or contraindications during short consultations.
3. **Repeated Tests & Conflicting Treatment:** Doctors unwittingly re-order expensive lab diagnostics (HbA1c, 2D Echo) and prescribe interacting or duplicate medications.
4. **Insecure Sharing:** Forwarding records over chat exposes sensitive data with no way to revoke access.
5. **Broken Continuity in Emergencies:** Clinicians in trauma bays start from scratch with zero visibility into blood group, anticoagulants, or anaphylactic allergies.

**MediSync solves this with a patient-sovereign digital health passport that guarantees seamless care continuity while keeping the patient in 100% control of their health data.**

---

## 🚀 Key Features & Differentiating Innovation

### 1. 🛡️ Sovereign Scoped Consent Gateway (PIN & QR Code)
* **Zero permanent data silos:** Doctors do not retain permanent copies of patient records.
* **Granular scopes:** Patients can generate time-limited (15-min, 1-hour, 24-hour) access passes scoped specifically to:
  * *Full Longitudinal Record*
  * *Cardiology & Vitals Only*
  * *Diagnostics & Lab Panels Only*
* **1-Click Instant Revocation:** Patients can sever active clinician access immediately from their portal.

### 2. ⚡ Real-Time Clinical Safety Radar (Drug-Drug & Allergy Checker)
* In the Doctor OPD workspace, when a physician types or selects a medication:
  * **Allergy Contraindications:** Instantly flags lethal allergies (e.g., prescribing *Amoxicillin* to a Penicillin-allergic patient triggers an immediate fatal anaphylaxis alert).
  * **Drug-Drug Interactions (DDI):** Cross-references the patient's active regimen in real-time (e.g., flags that prescribing *Ibuprofen* while the patient takes *Clopidogrel* causes a 5x elevated risk of major gastrointestinal hemorrhage).
  * **Evidence-Based Guidance:** Recommends safer clinical alternatives (e.g., substituting Paracetamol or Azithromycin).

### 3. 🧪 Diagnostic Redundancy Radar (Cost & Trauma Prevention)
* Algorithms cross-check newly ordered tests against recent results from outside labs (Apollo Diagnostics, City Heart Scans).
* Flags redundant tests based on clinical validity guidelines (e.g., ADA guidelines state HbA1c reflects 90-day erythrocyte turnover).
* **Quantified Impact:** In our demo case, MediSync prevented 2 duplicate blood draws and saved **₹3,750** in unnecessary diagnostic expenditures.

### 4. 🚨 Universal Emergency ICE (In Case of Emergency) HUD
* Zero-friction triage protocol for 108 Paramedics and Trauma Center teams.
* One-tap view of **Blood Group (B+)**, **Life-Threatening Anaphylactic Allergies**, and **Active Blood Thinners** (Clopidogrel).
* Direct one-touch phone dialer to primary next-of-kin.
* Automatic tamper-evident audit logging of emergency access.

### 5. 📄 Simulated AI Medical Ingestion Pipeline
* Ingests legacy paper prescriptions and fragmented lab PDFs.
* Simulates image deskewing, Optical Character Recognition (OCR), and Clinical Named Entity Recognition (NER) to convert paper into structured timeline events.

### 6. 🔒 Cryptographic Access Audit Trail
* Full transparency: Patients can inspect every clinician session, facility name, timestamp, and scope access.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript) |
| **Build Tool & Bundler** | Vite 6.0 |
| **Styling & Design System**| Tailwind CSS 3.4 (Medical-grade Clean UI) |
| **Icons & Visuals** | Lucide React |
| **QR Code Engine** | `qrcode.react` (Dynamic SVG QR generation) |
| **UX Enhancements** | `canvas-confetti` (Feedback moments) |
| **Deployment Target** | Vercel / Netlify / Render (Static SPA, Zero backend cold-start) |

---

## 📦 Local Installation & Setup Instructions

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** (v9.x or higher)

### Steps to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/medisync-healthtech.git
cd medisync-healthtech

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The application will launch at: **`http://localhost:3000`**

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎥 3-Minute Video Demo Script (For Hackathon Judges)

Follow this structured flow for the mandatory 2–5 minute submission video:

1. **Minute 0:00 – 0:45: The Problem & Patient Portal**
   * Introduce Ramesh Kumar (54 M, diabetic, hypertensive, stable CAD, penicillin-allergic).
   * Show his **Longitudinal Health Timeline** combining records from Apollo Labs, MedPlus, and Fortis Malar Hospital.
   * Highlight the **Redundancy Shield**: saved ₹3,750 and avoided duplicate blood draws.
2. **Minute 0:45 – 1:30: Sovereign Consent Generation**
   * Click **"Share with Doctor (QR/PIN)"**.
   * Show the dynamic 6-digit PIN (`849201`) and live QR code with 15-minute countdown and scoped permissions.
3. **Minute 1:30 – 2:30: Doctor OPD Consultation & Safety Radar**
   * Switch to **Doctor Clinic (OPD)**.
   * Auto-fill PIN (`849201`) and unlock chart.
   * In the Prescribing Pad, type **`Amoxicillin`** ➔ Red **Fatal Anaphylaxis Warning** pops up due to documented Penicillin allergy!
   * Type **`Ibuprofen`** ➔ Warning pops up: **Critical DDI with active Clopidogrel** (severe GI bleed risk).
   * Switch to safe drug **`Paracetamol`** ➔ Green **Safe to Prescribe** banner!
   * Go to Diagnostics tab: Click **HbA1c** ➔ System flags redundant test done 14 days ago at Apollo, saving ₹850.
   * Sign prescription with digital sync.
4. **Minute 2:30 – 3:00: Emergency ER & Audit Trail**
   * Switch to **Emergency (ER)** view: show how a paramedic immediately sees blood group (B+), blood thinners, and calls next-of-kin with zero login delay.
   * Open the **Audit Trail** to show complete transparency of every access event.

---

## 🌐 Public Deployment Guide (Vercel)

To satisfy the mandatory public deployment requirement (10% marks):

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete MediSync HealthTech platform"
   git branch -M main
   git remote add origin https://github.com/<your-username>/medisync-healthtech.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) ➔ Import Git Repository ➔ Framework Preset: **Vite** ➔ Click **Deploy**.
3. Copy the live `.vercel.app` URL and include it in your final Google Form submission!

---

## 👥 Hackathon Team & Acknowledgments
* Built for **24-Hour Web Development Hackathon**, IIITDM Kancheepuram.
* Designed in accordance with Ayushman Bharat Digital Mission (ABDM) and HIPAA principles.
