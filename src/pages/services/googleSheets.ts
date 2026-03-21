import { google } from "googleapis";

// Initialize Google Sheets API
const sheets = google.sheets("v4");

/**
 * Get authenticated Google Sheets client
 * Requires GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables
 */
function getAuth() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!email || !privateKey) {
        throw new Error(
            "Missing Google Service Account credentials in environment variables",
        );
    }

    return new google.auth.JWT({
        email,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
}

// fixed colums
function mapLeadToRow(lead: any) {
    return [
        lead.name,
        lead.email,
        lead.phone || "",
        lead.location,
        lead.quote?.toFixed?.(2) ?? "",
        lead.energyConsumption?.toString?.() ?? "",
        lead.bill?.toString?.() ?? "",
        lead.createdAt
            ? new Date(lead.createdAt).toISOString()
            : new Date().toISOString(),
    ];
}

/**
 * Append a lead row to a Google Sheet
 */
export async function appendLeadToSheet(sheetId: string, lead: any) {
    const auth = getAuth();

    await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: sheetId,
        range: "Sheet1!A:H", // Adjust sheet name if needed
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [mapLeadToRow(lead)],
        },
    });
}

/**
 * Initialize a Google Sheet with headers (run once per sheet)
 */
const headers = [
    [
        "Name",
        "Email",
        "Phone",
        "Location",
        "Quote ($)",
        "Energy Consumption (kWh)",
        "Bill ($)",
        "Created At",
    ],
];
