import os

# The settings need a DATABASE_URL. Tests never open a real connection (the engine is lazy),
# so a placeholder is enough and no PostgreSQL server is required.
os.environ.setdefault("DATABASE_URL", "postgresql+psycopg://test:test@localhost:5432/unidorm_test")
