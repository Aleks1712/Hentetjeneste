export interface Child {
  id: string;
  name: string;
  group: string;
  status: 'present' | 'home';
  checkInTime?: string;
  checkOutTime?: string;
  pickupStatus?: 'pending' | 'approved' | null;
  pickupPerson?: string;
  age?: number;
  allergies?: string[];
}

export interface ApprovedPerson {
  id: string;
  childId: string;
  name: string;
  relation: string;
  phone: string;
  status: 'approved' | 'pending';
  approvedDate?: string;
  blocked?: boolean;
}

export interface Incident {
  id: string;
  childId: string;
  type: 'injury' | 'illness' | 'info' | 'emergency';
  title: string;
  description: string;
  reportedBy: string;
  reportedAt: string;
  severity: 'low' | 'medium' | 'high';
  actionTaken?: string;
  notifiedParents: boolean;
}

export interface PickupLog {
  id: string;
  childId: string;
  pickedUpBy: string;
  pickedUpAt: string;
  checkedOutTime: string;
  verifiedBy: string;
}

export interface DailyInfo {
  id: string;
  date: string;
  type: 'menu' | 'activity' | 'announcement';
  title: string;
  description: string;
  targetGroup?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'parent' | 'staff';
  message: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: 'incident' | 'pickup' | 'daily' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  childId?: string;
}

export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Emma Hansen',
    group: 'Blåklokka',
    status: 'present',
    checkInTime: '08:24',
    pickupStatus: null,
    age: 4,
    allergies: ['Peanøtter'],
  },
  {
    id: 'child-2',
    name: 'Lucas Berg',
    group: 'Blåklokka',
    status: 'present',
    checkInTime: '08:15',
    pickupStatus: null,
    age: 5,
  },
  {
    id: 'child-3',
    name: 'Olivia Andersen',
    group: 'Solstråla',
    status: 'home',
    pickupStatus: null,
    age: 3,
  },
  {
    id: 'child-4',
    name: 'Noah Nilsen',
    group: 'Blåklokka',
    status: 'present',
    checkInTime: '07:45',
    pickupStatus: null,
    age: 4,
  },
  {
    id: 'child-5',
    name: 'Sofia Larsen',
    group: 'Solstråla',
    status: 'present',
    checkInTime: '08:30',
    pickupStatus: 'pending',
    pickupPerson: 'Bestemor',
    age: 5,
    allergies: ['Laktose'],
  },
  {
    id: 'child-6',
    name: 'William Olsen',
    group: 'Blåklokka',
    status: 'home',
    pickupStatus: null,
    age: 3,
  },
  {
    id: 'child-7',
    name: 'Maja Johansen',
    group: 'Solstråla',
    status: 'present',
    checkInTime: '08:00',
    pickupStatus: 'approved',
    pickupPerson: 'Mamma',
    age: 4,
  },
  {
    id: 'child-8',
    name: 'Filip Pedersen',
    group: 'Blåklokka',
    status: 'present',
    checkInTime: '07:50',
    pickupStatus: null,
    age: 5,
  },
];

export const mockApprovedPersons: ApprovedPerson[] = [
  {
    id: 'person-1',
    childId: 'child-1',
    name: 'Kari Nordmann',
    relation: 'Mor',
    phone: '+47 123 45 678',
    status: 'approved',
    approvedDate: '2025-11-27',
    blocked: false,
  },
  {
    id: 'person-2',
    childId: 'child-1',
    name: 'Ola Nordmann',
    relation: 'Far',
    phone: '+47 987 65 432',
    status: 'approved',
    approvedDate: '2025-11-27',
    blocked: false,
  },
  {
    id: 'person-3',
    childId: 'child-1',
    name: 'Mormor Anne',
    relation: 'Besteforelder',
    phone: '+47 555 12 345',
    status: 'approved',
    approvedDate: '2025-11-20',
    blocked: false,
  },
  {
    id: 'person-4',
    childId: 'child-1',
    name: 'Tante Lisa',
    relation: 'Tante',
    phone: '+47 444 55 666',
    status: 'approved',
    approvedDate: '2025-11-15',
    blocked: false,
  },
  {
    id: 'person-5',
    childId: 'child-1',
    name: 'Stine Henting',
    relation: 'Annen',
    phone: '+47 333 22 111',
    status: 'pending',
    blocked: false,
  },
];

export const mockIncidents: Incident[] = [
  {
    id: 'incident-1',
    childId: 'child-1',
    type: 'injury',
    title: 'Mindre fall på lekeplassen',
    description: 'Emma falt og skrapte kneet sitt mens hun lekte på klatreutstyret. Såret ble rengjort og plaster ble påført.',
    reportedBy: 'Pedagog Anna Berg',
    reportedAt: '2025-12-09T10:15:00',
    severity: 'low',
    actionTaken: 'Rengjort sår, påført plaster, observert i 30 min',
    notifiedParents: true,
  },
  {
    id: 'incident-2',
    childId: 'child-1',
    type: 'info',
    title: 'Glemt matboks',
    description: 'Emma hadde glemt matboksen sin hjemme. Hun fikk mat fra barnehagen.',
    reportedBy: 'Pedagog Maria Lund',
    reportedAt: '2025-12-08T11:30:00',
    severity: 'low',
    notifiedParents: true,
  },
  {
    id: 'incident-3',
    childId: 'child-5',
    type: 'injury',
    title: 'Skrubbsår på albuen',
    description: 'Sofia falt mens hun løp i barnehagen og fikk et skrubbsår på albuen.',
    reportedBy: 'Pedagog Lisa Hansen',
    reportedAt: '2025-12-09T14:20:00',
    severity: 'low',
    actionTaken: 'Rengjort med vann, påført plaster',
    notifiedParents: true,
  },
  {
    id: 'incident-4',
    childId: 'child-7',
    type: 'info',
    title: 'Veldig sliten i dag',
    description: 'Maja virket sliten og sovnet under hvilen. Mamma sa hun sov dårlig i natt.',
    reportedBy: 'Pedagog Anna Berg',
    reportedAt: '2025-12-09T13:45:00',
    severity: 'low',
    notifiedParents: true,
  },
];

export const mockPickupLogs: PickupLog[] = [
  {
    id: 'log-1',
    childId: 'child-1',
    pickedUpBy: 'Kari Nordmann',
    pickedUpAt: '2025-12-08T15:30:00',
    checkedOutTime: '15:30',
    verifiedBy: 'Pedagog Anna Berg',
  },
  {
    id: 'log-2',
    childId: 'child-1',
    pickedUpBy: 'Ola Nordmann',
    pickedUpAt: '2025-12-07T16:15:00',
    checkedOutTime: '16:15',
    verifiedBy: 'Pedagog Maria Lund',
  },
  {
    id: 'log-3',
    childId: 'child-1',
    pickedUpBy: 'Mormor Anne',
    pickedUpAt: '2025-12-06T14:45:00',
    checkedOutTime: '14:45',
    verifiedBy: 'Pedagog Anna Berg',
  },
];

export const mockDailyInfo: DailyInfo[] = [
  {
    id: 'info-1',
    date: '2025-12-11',
    type: 'menu',
    title: 'Lunsj i dag',
    description: 'Fiskesuppe med grovbrød og smør. Dessert: Frukt og yoghurt.',
  },
  {
    id: 'info-2',
    date: '2025-12-11',
    type: 'activity',
    title: 'Utetur til skogen',
    description: 'I dag skal vi på tur til skogen klokken 10:00. Husk ekstra klær og godt fottøy!',
    targetGroup: 'Blåklokka',
  },
  {
    id: 'info-3',
    date: '2025-12-11',
    type: 'announcement',
    title: 'Julegranpynt neste uke',
    description: 'Neste uke skal vi pynte juletreet sammen. Alle er velkomne!',
  },
  {
    id: 'info-4',
    date: '2025-12-12',
    type: 'announcement',
    title: 'Lucia-feiring',
    description: 'Torsdag 12. desember feirer vi Lucia med sang og lussekatter kl. 11:00. Foreldre er velkomne!',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'staff',
    message: 'Hei! Emma har hatt en fin dag i dag 😊',
    timestamp: '14:20',
  },
  {
    id: 'msg-2',
    sender: 'parent',
    message: 'Så fint å høre! Har hun spist godt?',
    timestamp: '14:22',
  },
  {
    id: 'msg-3',
    sender: 'staff',
    message: 'Ja, hun spiste nesten hele fiskesuppen og fikk dessert også!',
    timestamp: '14:23',
  },
  {
    id: 'msg-4',
    sender: 'parent',
    message: 'Kjempebra! 👍',
    timestamp: '14:25',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'incident',
    title: 'Hendelse rapportert',
    message: 'Emma falt på lekeplassen. Mindre skrubbsår på kneet.',
    timestamp: '10:15',
    read: false,
    childId: 'child-1',
  },
  {
    id: 'notif-2',
    type: 'daily',
    title: 'Daglig rapport',
    message: 'Emma har hatt en fin dag! Spiste godt og lekte mye ute.',
    timestamp: '14:30',
    read: false,
    childId: 'child-1',
  },
  {
    id: 'notif-3',
    type: 'pickup',
    title: 'Henteforespørsel godkjent',
    message: 'Bestemor kan hente Sofia i dag kl. 15:00.',
    timestamp: 'I går',
    read: true,
    childId: 'child-5',
  },
  {
    id: 'notif-4',
    type: 'reminder',
    title: 'Påminnelse',
    message: 'Husk ekstra klær til Maja til turdag i morgen!', // Changed from description to message
    timestamp: '2 dager siden',
    read: true,
    childId: 'child-7',
  },
];