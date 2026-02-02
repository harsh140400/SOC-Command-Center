from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.case import Case
from app.models.audit import AuditLog
from app.schemas.cases import CaseCreate, CaseOut, CaseUpdate

router = APIRouter()

def audit(db: Session, actor: str, action: str, details: str):
    db.add(AuditLog(actor=actor, action=action, details=details))
    db.commit()

@router.get("/", response_model=list[CaseOut])
def list_cases(db: Session = Depends(get_db), limit: int = 200):
    return db.query(Case).order_by(Case.id.desc()).limit(limit).all()

@router.post("/", response_model=CaseOut)
def create_case(data: CaseCreate, db: Session = Depends(get_db)):
    c = Case(
        name=data.name,
        summary=data.summary,
        tags=data.tags,
        status="OPEN"
    )
    db.add(c)
    db.commit()
    db.refresh(c)

    audit(db, actor="system", action="CREATE_CASE", details=f"case_id={c.id} name={c.name}")
    return c

@router.get("/{case_id}", response_model=CaseOut)
def get_case(case_id: int, db: Session = Depends(get_db)):
    c = db.query(Case).filter(Case.id == case_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Case not found")
    return c

@router.put("/{case_id}", response_model=CaseOut)
def update_case(case_id: int, data: CaseUpdate, db: Session = Depends(get_db)):
    c = db.query(Case).filter(Case.id == case_id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Case not found")

    c.status = data.status
    db.commit()

    audit(db, actor="system", action="UPDATE_CASE", details=f"case_id={case_id} status={data.status}")
    return c
