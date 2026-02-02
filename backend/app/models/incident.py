from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)

    severity = Column(String(20), nullable=False)
    status = Column(String(30), default="OPEN", nullable=False)

    analyst_notes = Column(Text, default="", nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
