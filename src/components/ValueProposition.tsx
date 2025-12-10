import { Shield, Users, Smartphone, Lock, TrendingUp, Heart, Zap, CheckCircle, Star } from 'lucide-react';

interface ValuePropositionProps {
  onClose?: () => void;
}

export function ValueProposition({ onClose }: ValuePropositionProps) {
  const benefits = [
    {
      icon: Users,
      title: 'For foreldre',
      color: 'purple',
      items: [
        'Full kontroll over hvem som kan hente',
        'Blokker personer midlertidig (ferie, konflikt)',
        'Øyeblikkelig varsel ved ulykker/hendelser',
        'Chat direkte med barnehagen',
        'Komplett historikk over alle hentinger',
        'Alt på én plass - ikke 5 forskjellige systemer',
      ],
    },
    {
      icon: Shield,
      title: 'For barnehagen',
      color: 'blue',
      items: [
        'Slutt på Excel-kaos med personopplysninger',
        'GDPR-sikker håndtering automatisk',
        'Spar tid: Ikke ring foreldre for godkjenning',
        'Digital krysselista erstatter papir',
        'Send daglig info til alle samtidig',
        'Alt personalet trenger i én app',
      ],
    },
    {
      icon: Heart,
      title: 'For barn',
      color: 'pink',
      items: [
        'Tryggere: Bare godkjente personer kan hente',
        'Raskere respons ved skader/sykdom',
        'Foreldre får daglig info (mat, søvn, lek)',
        'Bedre kommunikasjon = tryggere barn',
        'Ingen misforståelser om hvem som henter',
      ],
    },
  ];

  const keyFeatures = [
    { icon: Zap, title: 'Spond-enkel UX', desc: 'Ingen læringskurve - kjent design' },
    { icon: Shield, title: 'GDPR-first', desc: 'Bygget med personvern fra dag 1' },
    { icon: Smartphone, title: 'Mobilvennlig', desc: 'Perfekt på telefon, fungerer overalt' },
    { icon: CheckCircle, title: 'Alt-i-ett', desc: 'Krysseliste + henting + varsler + chat' },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          border: 'border-purple-200',
          gradient: 'from-purple-500 to-purple-600',
        };
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200',
          gradient: 'from-blue-500 to-blue-600',
        };
      case 'pink':
        return {
          bg: 'bg-pink-100',
          text: 'text-pink-600',
          border: 'border-pink-200',
          gradient: 'from-pink-500 to-pink-600',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
          border: 'border-gray-200',
          gradient: 'from-gray-500 to-gray-600',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-10 text-center text-white shadow-xl">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl mb-4">Hentetjeneste</h2>
        <p className="text-xl text-blue-50 leading-relaxed max-w-3xl mx-auto mb-6">
          Vi erstatter usikre Excel-løsninger med en moderne, GDPR-sikker app som gir trygghet til foreldre, 
          pedagoger og barn.
        </p>
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
          <Star className="w-5 h-5 text-yellow-300" />
          <span className="text-sm">Enkel å bruke, trygg å stole på</span>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keyFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-gray-200 p-6 hover:shadow-lg transition-all hover:border-blue-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Who Benefits */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl text-gray-900 mb-2">Hvem tjener på Hentetjeneste?</h3>
          <p className="text-gray-600">Alle vinner når kommunikasjonen fungerer</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg text-gray-900 mb-3 text-center">Foreldre</h4>
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              Få full kontroll, øyeblikkelig varsel ved ulykker, og slippe stress om hvem som kan hente
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg text-gray-900 mb-3 text-center">Barnehageansatte</h4>
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              Slippe telefonkø, Excel-kaos og usikkerhet. Alt på ett sted = mer tid til barna
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg text-gray-900 mb-3 text-center">Barn</h4>
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              Tryggere miljø, raskere respons ved hendelser, og bedre kommunikasjon mellom hjem og barnehage
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          const colors = getColorClasses(benefit.color);
          
          return (
            <div
              key={benefit.title}
              className={`bg-white rounded-2xl border-2 ${colors.border} p-6 hover:shadow-xl transition-all`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-md`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-4">{benefit.title}</h3>
              <ul className="space-y-3">
                {benefit.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Security Focus */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl mb-3">GDPR-sikker fra dag 1</h3>
            <p className="text-blue-50 leading-relaxed mb-6">
              Hentetjeneste er designet med personvern i fokus. All sensitiv data håndteres i henhold til GDPR, 
              med kryptering, rollebasert tilgang og full sporbarhet.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="text-white">✓ End-to-end kryptering</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="text-white">✓ Rollebasert tilgang</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="text-white">✓ Full sporbarhet</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <div className="text-white">✓ Norske servere</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg text-lg"
        >
          Lukk
        </button>
      )}
    </div>
  );
}
