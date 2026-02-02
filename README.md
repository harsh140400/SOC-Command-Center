# 🛡️ SOC Command Center

**SOC Command Center** is an industry-style **Mini SOC / SIEM Dashboard** built using **FastAPI (Backend)** + **React.js (Frontend)** with a **Cyberpunk Neon UI theme**.  
It supports **log ingestion**, **threat detection rules**, **alert handling**, **incident & case management**, and **audit logging** — all in a clean SOC workflow.

✅ Dark cyberpunk UI  
✅ Live scanning vibe  
✅ Log ingestion + alert detection  
✅ Analyst workflow like real SOC tools  

---

## 📸 Preview (Cyberpunk Neon UI)

This dashboard includes:
- Neon glow cards + animated scanlines
- Sidebar navigation with SOC modules
- Dashboard KPI counters (Events / Alerts / Open / Critical)
- Log ingestion using upload or auto-ingest mode
- Alerts → Incidents → Cases workflow

---

## 🧠 Why This Project?

Real SOC teams use tools like SIEM + EDR to:
- Ingest logs from endpoints
- Detect suspicious activity
- Create alerts
- Escalate alerts into incidents
- Track cases, evidence, and analyst notes

This project is designed as a **major industry-level portfolio project** showing:
✅ Blue-team workflow  
✅ Security event processing  
✅ Backend API development  
✅ Interactive cyber-themed frontend dashboard  

---

## ✅ Tech Stack

### Backend (FastAPI)
- FastAPI (REST API)
- SQLAlchemy ORM
- SQLite DB (easy local setup)
- JWT Auth (login system)
- Log ingestion + parsing
- Detection rules engine
- Audit logging

### Frontend (React)
- React.js + Vite
- TailwindCSS
- Chart.js + react-chartjs-2
- Cyberpunk Neon Theme (custom utilities + glow styling)

---

## 📂 Project Structure

```
SOC-Command-Center/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── main.py
│   │   └── seed.py
│   ├── requirements.txt
│   ├── run.py
│   ├── logs/
│   └── uploads/
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   └── styles/
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    └── postcss.config.js
```

---

## 🚀 Main Modules

### ✅ 1) Dashboard
Shows live SOC KPIs:
- Total Events
- Total Alerts
- Open Alerts
- Critical Alerts

Includes analytics chart and a **“Auto Ingest Logs”** control.

---

### ✅ 2) Log Ingestion
Two ingestion methods:

#### 🔹 Upload Logs (UI)
Upload `.txt` log file from the frontend:
- Backend parses logs
- Stores events into database
- Runs detection rules
- Auto-generates alerts

#### 🔹 Auto Ingest (Folder Mode)
Backend reads `.txt` files from:
```
backend/logs/
```

---

### ✅ 3) Alerts
- List all alerts
- View alert details + evidence
- Update status:
  - OPEN
  - INVESTIGATING
  - RESOLVED
  - FALSE_POSITIVE
- Add analyst notes

---

### ✅ 4) Incidents
- Create incidents manually
- Update incident status
- Add analyst notes
- Useful for SOC escalation workflow

---

### ✅ 5) Cases
- Create investigation cases
- Add tags
- Update case status:
  - OPEN
  - IN_PROGRESS
  - CLOSED

---

### ✅ 6) Audit Logs
SOC auditing of major actions:
- Upload log ingestion
- Auto-ingest ingestion
- Alert updates
- Incident creation and updates
- Case creation and updates

---

## ✅ Supported Log Format

Your `.txt` logs must follow this format (one event per line):

```
[YYYY-MM-DD HH:MM:SS] EventID=4625 User=Admin IP=45.33.12.77 Message=Failed logon attempt
```

### ✅ Sample Log File

Create this file:

📌 `backend/logs/windows_security_logs.txt`

```txt
[2026-01-31 09:20:11] EventID=4624 User=Administrator IP=192.168.1.10 Message=Successful logon
[2026-01-31 09:21:02] EventID=4625 User=Administrator IP=45.33.12.77 Message=Failed logon attempt
[2026-01-31 09:21:05] EventID=4625 User=Administrator IP=45.33.12.77 Message=Failed logon attempt
[2026-01-31 09:21:07] EventID=4625 User=Admin IP=45.33.12.77 Message=Failed logon attempt
[2026-01-31 09:21:09] EventID=4625 User=Admin IP=45.33.12.77 Message=Failed logon attempt
[2026-01-31 09:21:12] EventID=4625 User=Admin IP=45.33.12.77 Message=Failed logon attempt
[2026-01-31 09:22:40] EventID=4672 User=SYSTEM IP=10.10.10.2 Message=Special privileges assigned
[2026-01-31 09:27:10] EventID=5000 User=Nikhil IP=103.21.33.88 Message=Malware Trojan detected
```

---

## ⚙️ Setup & Installation

### ✅ 1) Clone the Repository
```bash
git clone https://github.com/harsh140400/SOC-Command-Center.git
cd SOC-Command-Center
```

---

## 🐍 Backend Setup (FastAPI)

### ✅ Create Virtual Environment
```bash
cd backend
python -m venv venv
```

### ✅ Activate Virtual Environment

#### Windows PowerShell
```powershell
venv\Scripts\Activate
```

#### Windows CMD
```cmd
venv\Scripts\activate
```

---

### ✅ Install Dependencies
```bash
pip install -r requirements.txt
```

### ✅ Run Backend
```bash
python run.py
```

Backend will start at:
```
http://127.0.0.1:8000
```

Swagger API Docs:
```
http://127.0.0.1:8000/docs
```

---

## 🌐 Frontend Setup (React + Tailwind)

### ✅ Install Dependencies
```bash
cd ../frontend
npm install
```

### ✅ Run Frontend
```bash
npm run dev
```

Frontend will start at:
```
http://localhost:5173
```

---

## 🔐 Default Login

✅ Username: `admin`  
✅ Password: `admin123`

---

## 🧪 Testing the Project

### ✅ 1) Auto Ingest Test
1. Put sample file into:
   ```
   backend/logs/windows_security_logs.txt
   ```
2. Open dashboard
3. Click:
   ✅ **Auto Ingest Logs**
4. Verify:
   - Events count increases
   - Alerts appear

---

### ✅ 2) Upload Log Test
1. Go to:
   ✅ Upload Logs page
2. Upload your `.txt` log file
3. Verify:
   - Events + alerts created

---

## 🧯 Common Errors & Fixes

### ❌ Tailwind / CSS errors (unknown utility class)
✅ Make sure:
- `tailwind.config.js` includes correct `content`
- You are not mixing `@tailwindcss/vite` plugin unless configured properly
- Your CSS `@apply` does not contain invalid syntax (like `focus: border-...`)

---

### ❌ `events=0, alerts=0`
✅ Means file parsing failed or logs do not match required format.  
Check your log lines and make sure they follow:

```
[time] EventID=XXXX User=XXXX IP=XXXX Message=XXXX
```

---

### ❌ bcrypt/passlib version error
If you see:
```
(trapped) error reading bcrypt version
```
Fix by installing compatible bcrypt:

```bash
pip uninstall bcrypt -y
pip install bcrypt==3.2.2
```

---

---

## ⚠️ Disclaimer
This tool is built for **educational and project/portfolio purposes**.  
It is not a replacement for enterprise SIEM/EDR platforms.

---

## ⭐ If You Like This Project
Give it a ⭐ on GitHub and use it as your major cybersecurity portfolio project ✅🔥
