Table Name: trips

Columns:
- id (uuid, primary key)
- customer_id (uuid)
- vehicle_id (uuid)
- start_date (date)
- end_date (date)
- location (text)
- distance_km (numeric)
- passengers (integer)
- tripCost (numeric)
- isCompleted (boolean, default false)
- created_at (timestamp)

Constraints:
- passengers should not exceed vehicle allowed_passengers
- vehicle must be available while creating trip

Relationships:
- One customer can create many trips
- One vehicle can be used in many trips
