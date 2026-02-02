from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.incident import Incident
from app.models.audit import AuditLog
from app.schemas.incidents import IncidentCreate, IncidentOut, IncidentUpdate

router = APIRouter()

def audit(db: Session, actor: str, action: str, details: str):
    db.add(AuditLog(actor=actor, action=action, details=details))
    db.commit()

@router.get("/", response_model=list[IncidentOut])
def list_incidents(db: Session = Depends(get_db), limit: int = 200):
    return db.query(Incident).order_by(Incident.id.desc()).limit(limit).all()

@router.post("/", response_model=IncidentOut)
def create_incident(data: IncidentCreate, db: Session = Depends(get_db)):
    inc = Incident(
        title=data.title,
        description=data.description,
        severity=data.severity,
        status="OPEN",
        analyst_notes=""
    )
    db.add(inc)
    db.commit()
    db.refresh(inc)

    audit(db, actor="system", action="CREATE_INCIDENT", details=f"incident_id={inc.id} title={inc.title}")
    return inc

@router.get("/{incident_id}", response_model=IncidentOut)
def get_incident(incident_id: int, db: Session = Depends(get_db)):
    inc = db.query(Incident).filter(Incident.id == incident_id).first()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    return inc

@router.put("/{incident_id}", response_model=IncidentOut)
def update_incident(incident_id: int, data: IncidentUpdate, db: Session = Depends(get_db)):
    inc = db.query(Incident).filter(Incident.id == incident_id).first()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    inc.status = data.status
    inc.analyst_notes = data.analyst_notes
    db.commit()

    audit(db, actor="system", action="UPDATE_INCIDENT", details=f"incident_id={incident_id} status={data.status}")
    return inc
