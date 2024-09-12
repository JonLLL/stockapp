from database import sessionLocal, engine

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

