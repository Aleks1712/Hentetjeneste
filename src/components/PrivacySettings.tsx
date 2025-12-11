import { X, Shield, Download, Trash2, Eye, Lock, Database, Server, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Language, useTranslation } from '../translations/translations';
import { authService, profileService, consentService, dataExportService } from '../services/supabase';

interface PrivacySettingsProps {
  onClose: () => void;
  language?: Language;
}

export function PrivacySettings({ onClose, language = 'no' }: PrivacySettingsProps) {
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  const handleDownloadData = async () => {
    try {
      setIsLoading(true);
      const user = await authService.getCurrentUser();
      if (!user) {
        alert('Du må være innlogget for å eksportere data');
        return;
      }

      if (exportFormat === 'json') {
        await dataExportService.downloadUserDataAsJSON(user.id, user.user_metadata?.full_name || user.email || 'export');
      } else {
        await dataExportService.downloadUserDataAsCSV(user.id, user.user_metadata?.full_name || user.email || 'export');
      }
      alert('Data eksportert vellykket! Filen er lastet ned.');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Feil ved eksport av data. Vennligst prøv igjen senere.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      const user = await authService.getCurrentUser();
      if (!user) {
        alert('Du må være innlogget for å slette konto');
        return;
      }

      // Delete profile (cascade deletes related data)
      await profileService.deleteAccount(user.id);
      
      // Delete consent preferences
      await consentService.deleteConsentPreferences(user.id);
      
      // Sign out
      await authService.signOut();
      
      alert('Din konto og alle relaterte data har blitt permanent slettet.');
      onClose();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Feil ved sletting av konto. Vennligst kontakt support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConsent = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        alert('Du må være innlogget for å lagre innstillinger');
        return;
      }

      await consentService.saveConsentPreferences(user.id, {
        data_sharing: dataSharing,
        analytics: analytics,
      });
      alert('Dine samtykkevalg har blitt lagret.');
    } catch (error) {
      console.error('Error saving consent:', error);
      alert('Feil ved lagring av innstillinger. Vennligst prøv igjen.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Main Privacy Settings Modal - Hide when showing full policy or terms */}
      {!showFullPolicy && !showTerms && (
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-gray-900">Personvern og GDPR</h2>
                <p className="text-sm text-gray-600">Kontroller dine data og personvern</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 hover:bg-white/50 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* IMPORTANT NOTICE - Not for PII */}
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-2">⚠️ Viktig informasjon om datatrygghet</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      <strong>Hentetjeneste er IKKE designet for lagring av sensitive personopplysninger (PII) som:</strong>
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 mb-3 ml-4">
                      <li>• Fødselsnummer / personnummer</li>
                      <li>• Sensitive medisinske diagnoser</li>
                      <li>• Detaljert helseinformasjon</li>
                      <li>• Finansiell informasjon</li>
                    </ul>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Tjenesten er designet for <strong>praktisk barnehage-administrasjon</strong> med fokus på 
                      hvem som kan hente barn og inn/ut-registrering. All sensitive informasjon skal behandles 
                      i barnehagens ordinære journalsystem.
                    </p>
                  </div>
                </div>
              </div>

              {/* UX Principle - Privacy by Design */}
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-2">✅ Privacy by Design</h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      Vi følger "Privacy by Design"-prinsippet fra EU GDPR:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• <strong>Dataallokering:</strong> Vi samler kun nødvendige data</li>
                      <li>• <strong>Transparens:</strong> Du vet alltid hva som lagres</li>
                      <li>• <strong>Kontroll:</strong> Du eier dine egne data</li>
                      <li>• <strong>Enkelhet:</strong> Personvern skal ikke være komplisert</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* GDPR Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-2">GDPR-kompatibel</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Vi følger EUs personvernforordning (GDPR). Dine data er kryptert, 
                      lagret på norske servere, og behandles kun for formål du har samtykket til.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    AES-256 Kryptering
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Norske servere
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-xs">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ISO 27001
                  </span>
                </div>
              </div>

              {/* Privacy Controls */}
              <div className="space-y-4">
                <h3 className="text-gray-900 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-600" />
                  Personvernkontroller
                </h3>

                {/* Data Sharing */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">Datadeling</p>
                      <p className="text-sm text-gray-600">
                        Del anonymiserte data for analyse og forbedring
                      </p>
                    </div>
                    <button
                      onClick={() => setDataSharing(!dataSharing)}
                      className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ml-4 ${
                        dataSharing ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                          dataSharing ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Analytics */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">Analyse og statistikk</p>
                      <p className="text-sm text-gray-600">
                        Hjelp oss forbedre tjenesten med bruksstatistikk
                      </p>
                    </div>
                    <button
                      onClick={() => setAnalytics(!analytics)}
                      className={`relative w-14 h-8 rounded-full transition-colors flex-shrink-0 ml-4 ${
                        analytics ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                          analytics ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Management */}
              <div className="space-y-4">
                <h3 className="text-gray-900 flex items-center gap-2">
                  <Database className="w-5 h-5 text-gray-600" />
                  Datahåndtering
                </h3>

                {/* Download Data */}
                <button
                  onClick={handleDownloadData}
                  disabled={isLoading}
                  className="w-full bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-4 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Download className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">Last ned mine data</p>
                      <p className="text-sm text-gray-600">
                        Få en kopi av alle dine lagrede data (GDPR Art. 15 & 20)
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExportFormat('json');
                          }}
                          className={`px-2 py-1 text-xs rounded ${
                            exportFormat === 'json'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          JSON
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExportFormat('csv');
                          }}
                          className={`px-2 py-1 text-xs rounded ${
                            exportFormat === 'csv'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          CSV
                        </button>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                {/* Data Storage Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Server className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-gray-900 mb-1">Datalagring</p>
                      <p className="text-sm text-gray-600 mb-3">
                        Vi lagrer kun nødvendige data for å tilby tjenesten. 
                        Data slettes automatisk 30 dager etter at barnet slutter i barnehagen.
                      </p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>• Brukerinformasjon: 365 dager etter siste aktivitet</p>
                        <p>• Inn/ut-logger: 90 dager</p>
                        <p>• Meldinger: 180 dager</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="space-y-4">
                <h3 className="text-red-600 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Faresone
                </h3>

                {showDeleteConfirm ? (
                  <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
                    <h4 className="text-gray-900 mb-2">Er du HELT sikker?</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Dette vil PERMANENT slette din konto og alle tilknyttede data (barn, meldinger, logger). 
                      Denne handlingen KAN IKKE ANGRES.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isLoading}
                        className="flex-1 h-10 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                      >
                        {isLoading ? 'Sletter...' : 'Ja, slett permanent'}
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isLoading}
                        className="flex-1 h-10 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-xl transition-colors"
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isLoading}
                    className="w-full bg-white border-2 border-red-300 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-4 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">Slett min konto</p>
                        <p className="text-sm text-gray-600">
                          Permanent slett all data tilknyttet din konto (GDPR Art. 17)
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Footer with Save Consent Button */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
            <button
              onClick={handleSaveConsent}
              disabled={isLoading}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium"
            >
              {isLoading ? 'Lagrer...' : 'Lagre samtykkevalg'}
            </button>
            <p className="text-xs text-gray-600 text-center">
              Les vår fullstendige{' '}
              <button className="text-blue-600 hover:underline" onClick={() => setShowFullPolicy(true)}>
                personvernerklæring
              </button>
              {' '}og{' '}
              <button className="text-blue-600 hover:underline" onClick={() => setShowTerms(true)}>
                vilkår for bruk
              </button>
            </p>
          </div>
        </div>
      )}
      
      {/* Full Privacy Policy Modal */}
      {showFullPolicy && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setShowFullPolicy(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-gray-900">Personvernerklæring</h2>
              </div>
              <button
                onClick={() => setShowFullPolicy(false)}
                className="w-10 h-10 hover:bg-white/50 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-500 mb-4">Sist oppdatert: 9. desember 2024</p>
                <p className="mb-4">
                  Hentetjeneste AS er ansvarlig for behandlingen av personopplysninger i denne applikasjonen. 
                  Vi tar ditt personvern på alvor og forplikter oss til å beskytte dine personopplysninger i 
                  henhold til gjeldende personvernlovgivning, inkludert EU/EØS GDPR og norsk personopplysningslov.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">1. Behandlingsansvarlig</h3>
                <p className="mb-2">Hentetjeneste AS</p>
                <p className="mb-2">Org.nr: 123 456 789</p>
                <p className="mb-2">Adresse: Eksempelveien 1, 0123 Oslo</p>
                <p className="mb-2">E-post: personvern@hentetjeneste.no</p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">2. Hvilke personopplysninger samler vi inn?</h3>
                <p className="mb-2">Vi behandler følgende kategorier av personopplysninger:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Kontaktinformasjon:</strong> Navn, e-postadresse, telefonnummer</li>
                  <li><strong>Brukerinformasjon:</strong> Brukernavn, passord (kryptert), profilbilde</li>
                  <li><strong>Barneopplysninger:</strong> Barnets navn, fødselsdato, allergier/spesielle behov</li>
                  <li><strong>Hentedata:</strong> Inn/ut-tider, godkjente hentepersoner, hentemeldinger</li>
                  <li><strong>Hendelsesrapporter:</strong> Informasjon om hendelser som berører barnet</li>
                  <li><strong>Kommunikasjon:</strong> Meldinger mellom foreldre og barnehage</li>
                  <li><strong>Tekniske data:</strong> IP-adresse, enhetsinformasjon, bruksstatistikk</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">3. Formål med behandlingen</h3>
                <p className="mb-2">Vi behandler personopplysninger for følgende formål:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Administrere hvem som kan hente barn fra barnehagen (sikkerhet)</li>
                  <li>Registrere inn/ut-tidspunkt (oppmøte og dokumentasjon)</li>
                  <li>Kommunikasjon mellom foreldre og barnehage</li>
                  <li>Rapportere og dokumentere hendelser</li>
                  <li>Forbedre og utvikle tjenesten</li>
                  <li>Oppfylle lovpålagte krav (barnehageloven, arbeidsmiljøloven)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">4. Behandlingsgrunnlag (GDPR artikkel 6)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Samtykke (Art. 6.1.a):</strong> For frivillige funksjoner som statistikk og analyse</li>
                  <li><strong>Kontraktsoppfyllelse (Art. 6.1.b):</strong> For å levere tjenesten du har registrert deg for</li>
                  <li><strong>Rettslig forpliktelse (Art. 6.1.c):</strong> For dokumentasjonskrav i barnehageloven</li>
                  <li><strong>Berettiget interesse (Art. 6.1.f):</strong> For sikkerhet og forbedring av tjenesten</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">5. Hvor lenge lagrer vi dataene?</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Brukerkontoer:</strong> Slettes automatisk 365 dager etter siste aktivitet</li>
                  <li><strong>Inn/ut-logger:</strong> Slettes automatisk etter 90 dager</li>
                  <li><strong>Meldinger:</strong> Slettes automatisk etter 180 dager</li>
                  <li><strong>Barneinformasjon:</strong> Slettes 30 dager etter barnet slutter i barnehagen</li>
                  <li><strong>Hendelsesrapporter:</strong> Lagres i 3 år i henhold til barnehageloven</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">6. Deling av data med tredjeparter</h3>
                <p className="mb-2">Vi deler ikke dine personopplysninger med tredjeparter, med følgende unntak:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Databehandlere (GDPR Art. 28):</strong>
                    <ul className="list-disc pl-6 space-y-1 mt-1">
                      <li><strong>Supabase (https://supabase.com):</strong> Skylagring av database og autentisering - sertifisert for GDPR med databehandleravtale. Data lagres på EU-servere.</li>
                      <li><strong>AWS Norge:</strong> Underliggende infrastruktur for Supabase - sertifisert ISO 27001</li>
                      <li><strong>SendGrid:</strong> E-postlevering (kun hvis aktivert for varsler)</li>
                    </ul>
                  </li>
                  <li><strong>Lovpålagt deling:</strong> Politi, barnevern eller andre myndigheter ved lovkrav</li>
                  <li><strong>Anonymiserte data:</strong> Kun hvis du har samtykket til datadeling for statistikk</li>
                </ul>
                <p className="mt-2">Alle databehandlere er underlagt databehandleravtaler i henhold til GDPR artikkel 28. Du kan få innsyn i avtaler på forespørsel til personvern@hentetjeneste.no</p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">7. Dine rettigheter (GDPR Kapittel III)</h3>
                <p className="mb-2">Du har følgende rettigheter:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Rett til innsyn (Art. 15):</strong> Be om kopi av dine personopplysninger</li>
                  <li><strong>Rett til retting (Art. 16):</strong> Korrigere uriktige eller ufullstendige opplysninger</li>
                  <li><strong>Rett til sletting (Art. 17):</strong> Be om sletting av dine personopplysninger</li>
                  <li><strong>Rett til begrensning (Art. 18):</strong> Begrense behandlingen av dine data</li>
                  <li><strong>Rett til dataportabilitet (Art. 20):</strong> Få dine data i maskinlesbart format</li>
                  <li><strong>Rett til å protestere (Art. 21):</strong> Protestere mot behandling basert på berettiget interesse</li>
                  <li><strong>Rett til å trekke samtykke (Art. 7.3):</strong> Når som helst trekke tilbake samtykke</li>
                </ul>
                <p className="mt-2">For å utøve dine rettigheter, kontakt oss på personvern@hentetjeneste.no</p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">8. Sikkerhetstiltak</h3>
                <p className="mb-2">Vi har implementert følgende sikkerhetstiltak:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>AES-256 kryptering av sensitive data</li>
                  <li>TLS 1.3 for all dataoverføring</li>
                  <li>Tofaktorautentisering (2FA) tilgjengelig</li>
                  <li>Regelmessige sikkerhetsrevisjoner og penetrasjonstester</li>
                  <li>ISO 27001 sertifisert databehandling</li>
                  <li>Data lagres kun på servere i Norge (GDPR-kompatibelt)</li>
                  <li>Rollebasert tilgangskontroll (RBAC)</li>
                  <li>Automatisk logging av sikkerhetsrelevante hendelser</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">9. Informasjonskapsler (cookies)</h3>
                <p className="mb-2">Vi bruker følgende typer informasjonskapsler:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Nødvendige cookies:</strong> For innlogging og grunnleggende funksjonalitet</li>
                  <li><strong>Funksjonelle cookies:</strong> For å huske dine innstillinger (språk, tema)</li>
                  <li><strong>Analysecookies:</strong> Kun med ditt samtykke, for bruksstatistikk</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">10. Endringer i personvernerklæringen</h3>
                <p>
                  Vi forbeholder oss retten til å endre denne personvernerklæringen. 
                  Ved vesentlige endringer vil du bli varslet via e-post eller i appen. 
                  Siste oppdatering er angitt øverst i dokumentet.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">11. Klagerett</h3>
                <p>
                  Du har rett til å klage til Datatilsynet hvis du mener vi behandler dine 
                  personopplysninger i strid med personvernregelverket.
                </p>
                <p className="mt-2">
                  <strong>Datatilsynet:</strong><br />
                  Postboks 458 Sentrum<br />
                  0105 Oslo<br />
                  Telefon: 22 39 69 00<br />
                  E-post: postkasse@datatilsynet.no
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">12. Kontakt oss</h3>
                <p>
                  Hvis du har spørsmål om hvordan vi behandler dine personopplysninger, 
                  eller ønsker å utøve dine rettigheter, kan du kontakte oss:
                </p>
                <p className="mt-2">
                  E-post: personvern@hentetjeneste.no<br />
                  Telefon: +47 123 45 678<br />
                  Postadresse: Hentetjeneste AS, Eksempelveien 1, 0123 Oslo
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setShowTerms(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl text-gray-900">Vilkår for bruk</h2>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="w-10 h-10 hover:bg-white/50 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-500 mb-4">Sist oppdatert: 9. desember 2024</p>
                <p className="mb-4">
                  Velkommen til Hentetjeneste. Ved å bruke denne tjenesten godtar du følgende vilkår og betingelser. 
                  Vennligst les dem nøye før du tar i bruk tjenesten.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">1. Aksept av vilkårene</h3>
                <p>
                  Ved å registrere deg, logge inn eller bruke Hentetjeneste bekrefter du at du har lest, forstått 
                  og aksepterer disse vilkårene. Hvis du ikke godtar vilkårene, må du ikke bruke tjenesten.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">2. Hvem kan bruke tjenesten?</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tjenesten er kun tilgjengelig for foreldre/foresatte og ansatte i tilknyttede barnehager</li>
                  <li>Du må være minst 18 år for å registrere en brukerkonto</li>
                  <li>Du må oppgi korrekt og oppdatert informasjon ved registrering</li>
                  <li>Du er ansvarlig for å holde din påloggingsinformasjon konfidensiell</li>
                  <li>Du er ansvarlig for all aktivitet som skjer under din konto</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">3. Tjenestens formål</h3>
                <p className="mb-2">Hentetjeneste tilbyr følgende funksjoner:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Digital godkjenning av personer som kan hente barn</li>
                  <li>Inn/ut-registrering (krysseliste)</li>
                  <li>Kommunikasjon mellom foreldre og barnehage</li>
                  <li>Hendelsesrapportering og varsling</li>
                  <li>Daglig informasjon og ukeplaner</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">4. Brukerens ansvar</h3>
                <p className="mb-2">Som bruker forplikter du deg til å:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bruke tjenesten i samsvar med norsk lov og forskrifter</li>
                  <li>Ikke dele din påloggingsinformasjon med andre</li>
                  <li>Holde dine kontaktopplysninger oppdatert</li>
                  <li>Kun registrere godkjente hentepersoner du stoler på</li>
                  <li>Varsle barnehagen umiddelbart hvis en godkjent person ikke lenger skal kunne hente</li>
                  <li>Ikke misbruke tjenesten til ulovlige eller skadelige formål</li>
                  <li>Respektere andres personvern og konfidensialitet</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">5. Forbudt bruk</h3>
                <p className="mb-2">Du har IKKE lov til å:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dele bilder eller informasjon om andre barn uten samtykke</li>
                  <li>Bruke tjenesten til spam, phishing eller svindel</li>
                  <li>Forsøke å hacke, reverse-engineere eller kompromittere systemet</li>
                  <li>Laste opp virus, malware eller skadelig kode</li>
                  <li>Trakassere, mobbe eller true andre brukere</li>
                  <li>Oppgi falsk informasjon eller utgi deg for å være noen andre</li>
                  <li>Bruke tjenesten til kommersielle formål uten avtale</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">6. Ansvarsbegrensning</h3>
                <p className="mb-2">Hentetjeneste AS:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Leverer tjenesten som den er (as-is) uten garantier</li>
                  <li>Er ikke ansvarlig for tap eller skade som følge av tjenestens bruk</li>
                  <li>Er ikke ansvarlig for beslutninger tatt av barnehagen basert på informasjon i appen</li>
                  <li>Kan ikke holdes ansvarlig for tekniske feil, nedetid eller datatap</li>
                  <li>Er ikke ansvarlig for handling fra tredjeparter (f.eks. godkjente hentepersoner)</li>
                </ul>
                <p className="mt-2">
                  <strong>VIKTIG:</strong> Hentetjeneste er et verktøy for å forenkle kommunikasjon og administrasjon. 
                  Det fysiske ansvaret for barnets sikkerhet ligger fortsatt hos barnehagen og foresatte.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">7. Tilgjengelighet og oppetid</h3>
                <p>
                  Vi streber etter 99,9% oppetid, men kan ikke garantere at tjenesten alltid vil være tilgjengelig. 
                  Vi forbeholder oss retten til å utføre vedlikehold, oppdateringer og nødvendige endringer. 
                  Ved planlagt nedetid vil du bli varslet i god tid.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">8. Endringer i tjenesten</h3>
                <p>
                  Vi forbeholder oss retten til å:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Legge til, endre eller fjerne funksjoner</li>
                  <li>Endre prismodell (med 30 dagers varsel for eksisterende kunder)</li>
                  <li>Oppdatere design og brukergrensesnitt</li>
                  <li>Avslutte tjenesten (med minimum 90 dagers varsel)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">9. Oppsigelse og suspendering</h3>
                <p className="mb-2">Vi kan suspendere eller avslutte din konto hvis:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Du bryter disse vilkårene</li>
                  <li>Du misbruker tjenesten</li>
                  <li>Du ikke betaler for tjenesten (hvis abonnement)</li>
                  <li>Barnet ditt slutter i barnehagen</li>
                  <li>Kontoen har vært inaktiv i over 365 dager</li>
                </ul>
                <p className="mt-2">
                  Du kan når som helst avslutte din konto via innstillingene i appen. 
                  Ved avslutning slettes dataene dine i henhold til personvernerklæringen.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">10. Immaterielle rettigheter</h3>
                <p>
                  Alt innhold i Hentetjeneste, inkludert tekst, design, logo, kode og funksjoner, 
                  er beskyttet av opphavsrett og tilhører Hentetjeneste AS. Du får kun en begrenset, 
                  ikke-eksklusiv lisens til å bruke tjenesten for personlig bruk.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">11. Tredjeparts tjenester</h3>
                <p>
                  Hentetjeneste kan integreres med tredjeparts tjenester (f.eks. e-post, push-varsler). 
                  Vi er ikke ansvarlige for disse tjenestenes personvern eller funksjonalitet.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">12. Tvister og lovvalg</h3>
                <p>
                  Disse vilkårene er underlagt norsk lov. Eventuelle tvister skal søkes løst i minnelighet. 
                  Hvis dette ikke lykkes, kan saken bringes inn for Oslo tingrett.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">13. Endringer i vilkårene</h3>
                <p>
                  Vi forbeholder oss retten til å endre disse vilkårene. Ved vesentlige endringer vil du bli varslet 
                  via e-post eller i appen minst 30 dager før endringene trer i kraft. Fortsatt bruk av tjenesten 
                  etter endringene betyr at du godtar de nye vilkårene.
                </p>
              </div>

              <div>
                <h3 className="text-gray-900 mb-2">14. Kontaktinformasjon</h3>
                <p>
                  Hvis du har spørsmål om disse vilkårene, kan du kontakte oss:
                </p>
                <p className="mt-2">
                  Hentetjeneste AS<br />
                  Eksempelveien 1, 0123 Oslo<br />
                  E-post: support@hentetjeneste.no<br />
                  Telefon: +47 123 45 678<br />
                  Org.nr: 123 456 789
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 mb-1">Ved å bruke Hentetjeneste bekrefter du at:</p>
                    <ul className="list-disc pl-6 space-y-1 text-xs">
                      <li>Du har lest og forstått disse vilkårene</li>
                      <li>Du godtar å være bundet av disse vilkårene</li>
                      <li>Du har rett til å inngå denne avtalen</li>
                      <li>Du vil følge alle lover og regler som gjelder</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}