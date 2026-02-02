import threading

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.routes.auth import router as auth_router
from app.routes.dashboard import router as dashboard_router
from app.routes.logs import router as logs_router
from app.routes.alerts import router as alerts_router
from app.routes.incidents import router as incidents_router
from app.routes.cases import router as cases_router
from app.routes.audit import router as audit_router
from app.seed import seed_admin_user

# ✅ NEW: Auto Investigation module
# You must create this file: app/core/system_investigator.py
from app.core.system_investigator import auto_investigate_loop


# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SOC Command Center API",
    version="1.0.0",
    description="Industry-level SOC Backend (FastAPI + SQLite) with Auth, Alerts, Incidents, Cases, Audit, Log Ingestion & Detection"
)

# CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(logs_router, prefix="/api/logs", tags=["Logs"])
app.include_router(alerts_router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(incidents_router, prefix="/api/incidents", tags=["Incidents"])
app.include_router(cases_router, prefix="/api/cases", tags=["Cases"])
app.include_router(audit_router, prefix="/api/audit", tags=["Audit"])


def handle_auto_investigation_alert(alert: dict):
    """
    ✅ Called whenever system investigator detects something suspicious.
    Right now it prints alerts.
    Next step: store alert into SQLite alerts table.
    """
    print("\n========== AUTO INVESTIGATION ALERT ==========")
    print(alert)
    print("=============================================\n")


# Seed admin on startup (safe)
@app.on_event("startup")
def startup_event():
    # ✅ Seed admin user
    seed_admin_user()

    # ✅ Start system auto-investigation thread
    t = threading.Thread(
        target=auto_investigate_loop,
        kwargs={
            "callback_alert": handle_auto_investigation_alert,
            "interval": 10,  # seconds
        },
        daemon=True,
    )
    t.start()

    print("✅ Auto Investigation Started (Processes + Network Monitoring)")
