import os

class Settings:
    # Pointing directly to your existing assets folder
    # This assumes the backend is running from Feature_Portal/backend
    DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "src", "assets")

settings = Settings()
