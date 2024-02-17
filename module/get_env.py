import os
from dotenv import load_dotenv

load_dotenv()
app_key = os.getenv('APP_KEY')
google_client_id = os.getenv('GOOGLE_MAP_API')