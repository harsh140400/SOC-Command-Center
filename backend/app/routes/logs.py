import os
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.config import settings
from app.models.event import Event
from app.models.alert import Alert
from app.models.audit import AuditLog
from app.services.ingestion import read_logs_from_folder, read_txt_log_file
from app.services.detector import detect_alerts

router = APIRouter()

def audit(db: Session, actor: str, action: str, details: str):
    db.add(AuditLog(actor=actor, action=action, details=details))
    db.commit()

@router.post("/upload")
async def upload_logs(file: UploadFile = File(...), db: Session = Depends(get_db)):
    os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)

    save_path = os.path.join(settings.UPLOAD_FOLDER, file.filename)

    content = await file.read()
    with open(save_path, "wb") as f:
        f.write(content)

    events = read_txt_log_file(save_path)
    stored_events = 0

    for e in events:
        ev = Event(
            source="upload",
            source_file=file.filename,
            event_time=e.get("event_time"),
            event_type=e.get("event_type"),
            username=e.get("username"),
            ip_address=e.get("ip_address"),
            severity=e.get("severity", "LOW"),
            raw_line=e.get("raw_line")
        )
        db.add(ev)
        stored_events += 1

    db.commit()

    alerts = detect_alerts(events)
    stored_alerts = 0

    for a in alerts:
        al = Alert(
            rule_name=a["rule_name"],
            description=a["description"],
            severity=a["severity"],
            status=a["status"],
            source_ip=a.get("source_ip"),
            target_user=a.get("target_user"),
            evidence=a.get("evidence"),
            analyst_notes=""
        )
        db.add(al)
        stored_alerts += 1

    db.commit()
    audit(db, actor="system", action="UPLOAD_LOG", details=f"{file.filename} events={stored_events}, alerts={stored_alerts}")

    return {"message": "Log uploaded & processed", "events_added": stored_events, "alerts_added": stored_alerts}

@router.post("/auto-ingest")
def auto_ingest(db: Session = Depends(get_db)):
    os.makedirs(settings.INGEST_LOG_FOLDER, exist_ok=True)

    events = read_logs_from_folder(settings.INGEST_LOG_FOLDER)
    stored_events = 0

    for e in events:
        ev = Event(
            source=e.get("source", "auto_ingest"),
            source_file=e.get("source_file"),
            event_time=e.get("event_time"),
            event_type=e.get("event_type"),
            username=e.get("username"),
            ip_address=e.get("ip_address"),
            severity=e.get("severity", "LOW"),
            raw_line=e.get("raw_line")
        )
        db.add(ev)
        stored_events += 1

    db.commit()

    alerts = detect_alerts(events)
    stored_alerts = 0

    for a in alerts:
        al = Alert(
            rule_name=a["rule_name"],
            description=a["description"],
            severity=a["severity"],
            status=a["status"],
            source_ip=a.get("source_ip"),
            target_user=a.get("target_user"),
            evidence=a.get("evidence"),
            analyst_notes=""
        )
        db.add(al)
        stored_alerts += 1

    db.commit()

    audit(db, actor="system", action="AUTO_INGEST", details=f"events={stored_events}, alerts={stored_alerts}")

    return {"message": "Auto ingest completed", "events_added": stored_events, "alerts_added": stored_alerts}

@router.get("/events")
def get_events(db: Session = Depends(get_db), limit: int = 200):
    rows = db.query(Event).order_by(Event.id.desc()).limit(limit).all()
    return rows
