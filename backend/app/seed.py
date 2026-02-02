from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User

def seed_admin_user():
    db: Session = SessionLocal()
    try:
        admin = db.query(User).filter(User.username == "admin").first()
        if admin:
            return

        admin_user = User(
            username="admin",
            password_hash=hash_password("admin123"),
            role="admin"
        )
        db.add(admin_user)
        db.commit()
        print("✅ Seeded admin user: admin / admin123")
    finally:
        db.close()
