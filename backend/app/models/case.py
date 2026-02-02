from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200), nullable=False)
    summary = Column(Text, nullable=False)

    status = Column(String(30), default="OPEN", nullable=False)
    tags = Column(String(250), default="", nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
