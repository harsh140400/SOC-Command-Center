from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.alert import Alert
from app.models.audit import AuditLog
from app.schemas.alerts import AlertOut, AlertUpdate

router = APIRouter()

def audit(db: Session, actor: str, action: str, details: str):
    db.add(AuditLog(actor=actor, action=action, details=details))
    db.commit()

@router.get("/", response_model=list[AlertOut])
def list_alerts(db: Session = Depends(get_db), limit: int = 200):
    return db.query(Alert).order_by(Alert.id.desc()).limit(limit).all()

@router.get("/{alert_id}", response_model=AlertOut)
def get_alert(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.put("/{alert_id}", response_model=AlertOut)
def update_alert(alert_id: int, data: AlertUpdate, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert.status = data.status
    alert.analyst_notes = data.analyst_notes
    db.commit()

    audit(db, actor="system", action="UPDATE_ALERT", details=f"alert_id={alert_id} status={data.status}")
    return alert
