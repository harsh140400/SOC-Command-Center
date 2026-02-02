from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.event import Event
from app.models.alert import Alert
from app.schemas.dashboard import DashboardStats

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_stats(db: Session = Depends(get_db)):
    total_events = db.query(Event).count()
    total_alerts = db.query(Alert).count()
    open_alerts = db.query(Alert).filter(Alert.status == "OPEN").count()
    critical_alerts = db.query(Alert).filter(Alert.severity == "CRITICAL").count()

    return DashboardStats(
        total_events=total_events,
        total_alerts=total_alerts,
        open_alerts=open_alerts,
        critical_alerts=critical_alerts
    )
