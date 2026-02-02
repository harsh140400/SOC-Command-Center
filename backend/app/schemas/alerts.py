from pydantic import BaseModel

class AlertOut(BaseModel):
    id: int
    rule_name: str
    description: str
    severity: str
    status: str
    source_ip: str | None = None
    target_user: str | None = None
    evidence: str | None = None
    analyst_notes: str

    class Config:
        from_attributes = True

class AlertUpdate(BaseModel):
    status: str
    analyst_notes: str = ""
