from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    source = Column(String(120), default="upload", nullable=False)
    source_file = Column(String(200), nullable=True)

    event_time = Column(String(80), nullable=True)
    event_type = Column(String(60), nullable=True)

    username = Column(String(80), nullable=True)
    ip_address = Column(String(60), nullable=True)

    severity = Column(String(20), default="LOW", nullable=False)

    raw_line = Column(String(2000), nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
