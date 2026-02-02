from pydantic import BaseModel

class CaseCreate(BaseModel):
    name: str
    summary: str
    tags: str = ""

class CaseOut(BaseModel):
    id: int
    name: str
    summary: str
    status: str
    tags: str

    class Config:
        from_attributes = True

class CaseUpdate(BaseModel):
    status: str
