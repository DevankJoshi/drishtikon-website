# Supabase Database Setup for DRISHTIKON

## Required Table: `access_grants`

To track paid users with email addresses and timestamps, you need to create this table in your Supabase project:

### Table Creation SQL

Run this SQL in your Supabase SQL Editor (Project → SQL Editor → New Query):

```sql
-- Create access_grants table to track paid users
CREATE TABLE IF NOT EXISTS access_grants (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_access_grants_email ON access_grants(email);

-- Enable Row Level Security (RLS) for security
ALTER TABLE access_grants ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert/update
CREATE POLICY "Allow service role to manage access_grants"
  ON access_grants
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
```

### Table Structure

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key, auto-generated |
| email | TEXT | User's email address (unique) |
| created_at | TIMESTAMP | When the user paid (auto-set) |
| updated_at | TIMESTAMP | When the record was updated (auto-set) |

## API Endpoints

### 1. Check User Access
**Endpoint:** `POST /api/check-access`
- **Body:** `{ "email": "user@example.com" }`
- **Response:** `{ "hasAccess": boolean }`

### 2. Get Paid Users Count & List
**Endpoint:** `GET /api/paid-users`
- **Response:** 
```json
{
  "success": true,
  "totalPaidUsers": 42,
  "paidEmails": [
    {
      "email": "user1@example.com",
      "paidAt": "2026-03-17T10:30:00Z"
    },
    {
      "email": "user2@example.com",
      "paidAt": "2026-03-17T11:45:00Z"
    }
  ],
  "message": "42 user(s) have purchased access to DRISHTIKON EP"
}
```

## How It Works

1. **User Purchases**: When a user completes payment via Stripe, the webhook is triggered
2. **Email Stored**: The webhook (`/api/webhook`) automatically stores their email in `access_grants`
3. **Timestamp Auto-Added**: Supabase automatically sets `created_at` to current time
4. **Counter Maintained**: The total count = number of rows in `access_grants` table
5. **Verification**: When user visits site, `/api/check-access` verifies if their email is in the table

## Features

✅ Automatic counter increments on each payment  
✅ All email addresses stored with timestamps  
✅ Duplicate emails handled (UPSERT) - same person paying twice won't create duplicates  
✅ Chronologically ordered by payment date  
✅ Database-backed (persistent across app restarts)  
✅ Easy to query and export for analytics  

## Optional: Add Admin Secret Key Protection

To protect the `/api/paid-users` endpoint, add this to your `.env.local`:

```
ADMIN_SECRET_KEY=your-secret-key-here
```

Then uncomment the auth check in `/src/app/api/paid-users/route.ts`

Access the endpoint with:
```
curl -H "Authorization: Bearer your-secret-key-here" http://localhost:3000/api/paid-users
```
