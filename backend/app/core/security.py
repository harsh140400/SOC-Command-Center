from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status

from app.core.config import settings

# ✅ bcrypt works best with passlib when backend is correct
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def _safe_bcrypt_password(password: str) -> str:
    """
    ✅ IMPORTANT FIX:
    bcrypt only supports passwords up to 72 BYTES.
    If user enters long password, passlib crashes with:
    ValueError: password cannot be longer than 72 bytes

    We prevent that by truncating safely.
    """
    if password is None:
        return ""
    return password[:72]


def hash_password(password: str) -> str:
    password = _safe_bcrypt_password(password)
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    password = _safe_bcrypt_password(password)
    return pwd_context.verify(password, password_hash)


def create_access_token(subject: str, role: str, expires_minutes: Optional[int] = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes if expires_minutes else settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": subject,
        "role": role,
        "exp": expire
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=ALGORITHM)
    return token


def decode_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
