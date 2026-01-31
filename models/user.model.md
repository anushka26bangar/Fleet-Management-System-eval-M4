Table: users
Columns:
- id (uuid, PK)
- name (text)
- email (unique)
- password (text)
- role (customer | owner | driver)
- created_at (timestamp)

Relationships:
- Owner → Vehicles
- Customer → Trips
