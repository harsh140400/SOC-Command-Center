from pydantic import BaseModel

class AuditOut(BaseModel):
    id: int
    actor: str
    action: str
    details: str

    class Config:
        from_attributes = True
