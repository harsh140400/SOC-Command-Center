from pydantic import BaseModel

class EventOut(BaseModel):
    id: int
    source: str
    source_file: str | None = None
    event_time: str | None = None
    event_type: str | None = None
    username: str | None = None
    ip_address: str | None = None
    severity: str
    raw_line: str

    class Config:
        from_attributes = True
