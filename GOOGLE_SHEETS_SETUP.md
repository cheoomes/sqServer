# Google Sheets Integration Setup

This guide explains how to set up Google Sheets integration to automatically sync leads to a Google Sheet for each client.

## Prerequisites

1. A Google Cloud Project
2. A Google Service Account with Sheets API access
3. Google Sheet(s) for each client

---

## Step 1: Create a Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)h
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **Service Account**
5. Fill in the service account details and click **Create**
6. Grant the service account the **Editor** role (or a custom role with Sheets access)
7. Click **Done**

---

## Step 2: Enable Google Sheets API

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

---

## Step 3: Create Service Account Key

1. Go to **APIs & Services** → **Credentials**
2. Find your service account in the list and click on it
3. Go to the **Keys** tab
4. Click **Add Key** → **Create New Key**
5. Choose **JSON** format
6. Download the JSON key file

The downloaded file will look like this:

```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

## Step 4: Add Environment Variables

Add the following to your `.env` file:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Important:**

-   Copy the `client_email` from the JSON file to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
-   Copy the entire `private_key` value (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`) to `GOOGLE_PRIVATE_KEY`
-   Keep the `\n` characters in the private key - they are important!

---

## Step 5: Create a Google Sheet for Each Client

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it (e.g., "Client Name - Leads")
4. Share the sheet with your service account email:
    - Click **Share** button
    - Add the service account email (`your-service-account@your-project.iam.gserviceaccount.com`)
    - Give it **Editor** permissions
5. Copy the **Sheet ID** from the URL:
    - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
    - Example: If URL is `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f/edit`, the Sheet ID is `1a2b3c4d5e6f`

---

## Step 6: Initialize Sheet Headers (One-Time Setup)

You can use this API endpoint to initialize the headers for a new sheet:

```typescript
// Example: Add this to your backend or call it once manually
import { initializeSheetHeaders } from "@/pages/services/googleSheets";

await initializeSheetHeaders("YOUR_SHEET_ID_HERE");
```

Or create an API endpoint for it:

```typescript
// src/pages/api/backend/initializeSheet.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { initializeSheetHeaders } from "@/pages/services/googleSheets";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { sheetId } = req.body;

        try {
            await initializeSheetHeaders(sheetId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: "Failed to initialize sheet" });
        }
    }
}
```

---

## Step 7: Add Sheet ID to Client

Update your client record in the database to include the Google Sheet ID:

```sql
UPDATE "Client"
SET "googleSheetId" = 'YOUR_SHEET_ID_HERE'
WHERE email = 'client@example.com';
```

Or via your settings page, add a field to let clients input their Sheet ID.

---

## How It Works

Once configured:

1. When a lead is submitted via the `PUT /api/public/putQuote` endpoint
2. The lead is saved to your Postgres database
3. **If the client has a `googleSheetId` configured**, the lead is automatically appended to their Google Sheet
4. Each row in the sheet contains:
    - Name
    - Email
    - Phone
    - Location
    - Quote ($)
    - Energy Consumption (kWh)
    - Bill ($)
    - Created At (timestamp)

---

## Troubleshooting

### Error: "Missing Google Service Account credentials"

-   Make sure `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` are in your `.env` file
-   Restart your development server after adding environment variables

### Error: "The caller does not have permission"

-   Make sure you shared the Google Sheet with the service account email
-   Give the service account **Editor** permissions

### Error: "Unable to parse range: Sheet1!A:H"

-   Make sure your sheet has a tab named "Sheet1" (or update the range in `googleSheets.ts`)
-   Initialize the headers using `initializeSheetHeaders()`

### Leads are saved to database but not appearing in Google Sheets

-   Check the server logs for any error messages
-   Verify the `googleSheetId` is set correctly in the Client record
-   The integration is designed to not fail the API request if Google Sheets sync fails - check logs for warnings

---

## Optional: Add Sheet Management to Settings Page

You can add a field in your settings page to let clients manage their Google Sheet ID:

1. Add an input field for `googleSheetId` in `src/pages/settings.tsx`
2. Update the `updateSettings` API to accept and save the `googleSheetId`
3. Clients can then paste their Sheet ID and start syncing leads automatically

---

## Security Notes

-   **Never commit your `.env` file or service account JSON to git**
-   Keep your private key secure
-   Only share sheets with your specific service account
-   Consider rotating your service account keys periodically
-   The service account only needs access to specific sheets, not your entire Google Drive

---

## Next Steps

-   Create an admin UI to manage Sheet IDs per client
-   Add a button to manually initialize sheet headers
-   Create a sync endpoint to backfill existing leads to a new sheet
-   Add validation to check if a Sheet ID is valid before saving
