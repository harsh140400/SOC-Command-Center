from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)

    rule_name = Column(String(120), nullable=False)
    description = Column(String(500), nullable=False)

    severity = Column(String(20), nullable=False)  # LOW/MEDIUM/HIGH/CRITICAL
    status = Column(String(30), default="OPEN", nullable=False)

    source_ip = Column(String(60), nullable=True)
    target_user = Column(String(80), nullable=True)

    evidence = Column(Text, nullable=True)
    analyst_notes = Column(Text, default="", nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
