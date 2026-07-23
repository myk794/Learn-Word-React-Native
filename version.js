// Ana ekranda gosterilen surum bilgisi (saf JS - OTA ile guncellenebilir).
//
// APP_VERSION : native build surumu. app.json'daki "version" ile AYNI tutulmali;
//               sadece yeni bir eas build alindiginda degisir.
// OTA_REVISION: her OTA yayininda (eas update) MUTLAKA +1 artir. Telefonda
//               "1.0.2-4" gibi gorunur; sayi artmissa OTA inmis demektir.
export const APP_VERSION = '1.0.2';
export const OTA_REVISION = 4;
