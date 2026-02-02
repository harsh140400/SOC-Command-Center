from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.audit import AuditLog
from app.schemas.audit import AuditOut

router = APIRouter()

@router.get("/", response_model=list[AuditOut])
def list_audit_logs(db: Session = Depends(get_db), limit: int = 200):
    return db.query(AuditLog).order_by(AuditLog.id.desc()).limit(limit).all()
