# OSA GA Study — Clinical Data Entry App

A multi-step web form for collecting peri-operative risk data from OSA patients undergoing general anaesthesia. Submissions go directly to a Google Sheet via Apps Script.

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The full data entry app (single file, no build step needed) |
| `config.js` | **Edit this** — paste your Apps Script URL here |
| `apps-script.gs` | The Google Apps Script to deploy in your Sheet |

---

## One-time setup

### Step 1 — Set up the Google Sheet

1. Create (or open) the Google Sheet where study data should live.
2. Go to **Extensions → Apps Script**.
3. Delete any existing code in the editor.
4. Open `apps-script.gs` from this repo and paste the entire contents.
5. Click **Save** (💾).

### Step 2 — Deploy the script as a Web App

1. Click **Deploy → New Deployment**.
2. Click the gear icon next to *Select type* and choose **Web App**.
3. Set the following:
   - **Description:** OSA GA Study (or anything you like)
   - **Execute as:** Me
   - **Who has access:** Anyone *(or restrict to your organisation's domain)*
4. Click **Deploy**.
5. Authorise the script when prompted (you'll need to approve Google's permissions dialog).
6. Copy the **Web app URL** — it will look like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 3 — Add the URL to config.js

Open `config.js` and replace the placeholder:

```js
// Before
const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';

// After
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

Save the file.

### Step 4 — Host the app (pick one)

**GitHub Pages** *(recommended — free, instant)*
1. Push this repo to GitHub.
2. Go to repo **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` → `/ (root)`.
4. Your app will be live at `https://yourusername.github.io/osa-ga-data-entry/`.

**Cloudflare Pages / Netlify** — drag-and-drop the folder, same result.

**Local / Intranet** — open `index.html` directly in a browser, or serve via any static file server. Because submissions use `no-cors`, the app works from `file://` too.

---

## Updating the Apps Script URL

If you ever re-deploy the script (e.g. after editing it), Google issues a new URL.  
Just update `SCRIPT_URL` in `config.js` and commit/push.

---

## How the Sheet is structured

- On the **first** submission, the script writes a header row using the field names.
- Every subsequent submission appends one row.
- The header row is automatically frozen and bolded.
- Column order matches the order fields appear in `config.js` / `collectData()`.

---

## Health check

Visit your Apps Script URL directly in a browser. You should see:
```json
{ "status": "OSA GA Script is live" }
```
If you see an error instead, re-check the deployment settings (Step 2).

---

## Data fields collected

| Section | Fields |
|---|---|
| Demographics | Study ID, Date of Surgery, Age, Sex, Height, Weight, BMI, Neck Circumference |
| OSA Details | OSA Diagnosed, Sleep Study Type, AHI, Severity, ODI, Lowest/Mean SpO₂, T90, STOP-BANG, Epworth |
| PAP Therapy | Prescribed, Device Type, Compliance, Used pre-op, Used post-op |
| Surgery | Type, Specialty, Urgency, Duration |
| Anaesthesia | Type, ASA Grade, Mallampati, Difficult Intubation, Attempts, Opioid, Dose |
| Intra-operative | Desaturation <90%, Lowest SpO₂, Mask Ventilation, Laryngospasm, Bronchospasm, Hypotension, Arrhythmia |
| PACU | Arrival/Discharge times, Duration, Aldrete, O₂, Desaturation, Lowest SpO₂, Airway Obstruction, CPAP, Re-intubation |
| Post-op Outcomes | Ward, HDU, ICU/ICCU, Mechanical Ventilation, LOS, Complication 24h, Mortality |
