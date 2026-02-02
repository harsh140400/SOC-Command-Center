from pydantic import BaseModel

class DashboardStats(BaseModel):
    total_events: int
    total_alerts: int
    open_alerts: int
    critical_alerts: int
