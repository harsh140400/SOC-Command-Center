from pydantic import BaseModel

class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str = "MEDIUM"

class IncidentOut(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    status: str
    analyst_notes: str

    class Config:
        from_attributes = True

class IncidentUpdate(BaseModel):
    status: str
    analyst_notes: str = ""
