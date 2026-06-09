/**
 * OSA GA Study — Google Apps Script
 *
 * Deploy this as a Web App in your Google Sheet:
 *   Extensions → Apps Script → paste this code → Save → Deploy → New Deployment
 *   Type: Web App | Execute as: Me | Who has access: Anyone
 *
 * Copy the resulting /exec URL into config.js → SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write header row on the very first submission
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp","Study ID","Date of Surgery","Age","Sex",
        "Height (cm)","Weight (kg)","BMI",
        "OSA Diagnosed","Sleep Study Type","AHI","OSA Severity","ODI",
        "Lowest SpO2 Sleep (%)","Mean SpO2 (%)","T90 (%)","STOP-BANG Score","SONA Score","Epworth Score",
        "PAP Prescribed","Device Type","Compliance (hrs/night)","PAP Used Pre-op","PAP Used Post-op",
        "Surgery Type","Specialty","Urgency","Surgery Duration (min)","Entry Technique","IAP Range",
        "Anaesthesia Type","ASA Grade","Mallampati","Difficult Intubation","Intubation Attempts",
        "Opioid Used","Opioid Dose (mcg)","Maintenance Agent",
        "Intraop Desat <90%","Lowest Intraop SpO2","Difficult Mask Vent",
        "Laryngospasm","Bronchospasm","Hypotension","Arrhythmia",
        "Intra-op BP (mmHg)","Intra-op HR (bpm)","ETCO2 (mmHg)","GTN Dosage (mcg/min)",
        "PACU Arrival","PACU Discharge","PACU Duration (min)","Aldrete Score",
        "O2 Required","Post-op Desat","Lowest PACU SpO2","Airway Obstruction","PACU CPAP","Re-intubation",
        "Ward Admission","HDU Required","ICU Required","Mechanical Vent Post-op",
        "LOS (days)","Complication 24h","Mortality"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp,
      data.study_id,
      data.date_surgery,
      data.age,
      data.sex,
      data.height_cm,
      data.weight_kg,
      data.bmi,
      data.osa_diagnosed,
      data.sleep_study_type,
      data.ahi,
      data.osa_severity,
      data.odi,
      data.lowest_spo2_sleep,
      data.mean_spo2,
      data.t90_pct,
      data.stopbang_score,
      data.sona_score,
      data.epworth_score,
      data.pap_prescribed,
      data.device_type,
      data.compliance_hrs,
      data.pap_used_preop,
      data.pap_used_postop,
      data.surgery_type,
      data.specialty,
      data.urgency,
      data.surgery_duration_min,
      data.entry_technique,
      data.iap_range,
      data.anaesthesia_type,
      data.asa_grade,
      data.mallampati,
      data.difficult_intubation,
      data.intubation_attempts,
      data.opioid_used,
      data.opioid_dose_mcg,
      data.maintenance_agent,
      data.intraop_desat_lt90,
      data.lowest_intraop_spo2,
      data.difficult_mask_vent,
      data.laryngospasm,
      data.bronchospasm,
      data.hypotension,
      data.arrhythmia,
      data.intraop_bp,
      data.intraop_hr,
      data.etco2,
      data.gtn_dosage,
      data.pacu_arrival,
      data.pacu_discharge,
      data.pacu_duration_min,
      data.aldrete_score,
      data.o2_required,
      data.postop_desat,
      data.lowest_pacu_spo2,
      data.airway_obstruction,
      data.pacu_cpap,
      data.reintubation,
      data.ward_admission,
      data.hdu_required,
      data.icu_required,
      data.mechanical_vent_postop,
      data.los_days,
      data.complication_24h,
      data.mortality
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check — open the /exec URL in a browser to confirm it's live
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ready", message: "OSA GA Study collector is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}
