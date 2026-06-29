# NSO API Connection Workflow

## Frontend
- Sends request to Google Apps Script Web App URL.
- Loads test series and questions dynamically.

## Backend
- Receives registration data.
- Stores results in Google Sheets.
- Sends email notifications.

## Security
- Validate user identity.
- Restrict result access by user email/User ID.
- Protect admin sheet permissions.

## Testing
- Check question loading.
- Check result saving.
- Check email delivery.
