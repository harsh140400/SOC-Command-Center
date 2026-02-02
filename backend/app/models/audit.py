from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    actor = Column(String(80), nullable=False)
    action = Column(String(120), nullable=False)
    details = Column(Text, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
