/**
 * OSA GA Study — Google Apps Script
 *
 * Deploy this as a Web App in your Google Sheet:
 *   Extensions → Apps Script → paste this code → Deploy → New Deployment
 *   Type: Web App | Execute as: Me | Who has access: Anyone (or your domain)
 *
 * Copy the resulting /exec URL into config.js → SCRIPT_URL
 */

function doPost(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(10000);

  try {
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0];
    var data  = e.parameter;
    var keys  = Object.keys(data);

    // Write header row automatically on the very first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(keys);
      // Freeze and bold the header row
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, keys.length).setFontWeight('bold');
    }

    sheet.appendRow(keys.map(function(k) { return data[k]; }));

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/** Health-check — visit the /exec URL in a browser to confirm deployment */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'OSA GA Script is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
