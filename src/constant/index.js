export const svgIcons = {
  RichText: '/images/richTextIcon.svg',
  Text: '/images/textIcon.svg',
  Number: '/images/numberIcon.svg',
  Media: '/images/mediaIcon.svg',
  Location: '/images/locationIcon.svg',
  Json: '/images/jsonIcon.svg',
  Bool: '/images/boolIcon.svg',
  Date: '/images/dateIcon.svg',
  Reference: '/images/referenceIcon.svg',
  background: '/images/bg.svg',
  logo: '/images/nettleger-logo-color.svg',
  white_logo: '/images/nettleger-logo-white.svg'
};
export const fieldTypes = [
  {
    id: 1,
    type: 'RichText',
    svg: '/images/rich-text.svg',
    title: 'Rich text',
    description: 'Text formatting with references and media'
  },
  {
    id: 2,
    type: 'Text',
    svg: '/images/text.svg',
    title: 'Text',
    description: 'Titles, names, paragraphs, list of names'
  },
  { id: 3,
    type: 'Number',
    svg: '/images/number.svg',
    title: 'Number',
    description: 'ID, order number, rating, quantity'
  },
  { id: 4,
    type: 'Date',
    svg: '/images/date.svg',
    title: 'Date and time',
    description: 'Event dates'
  },
  { id: 5,
    type: 'Media',
    svg: '/images/media.svg',
    title: 'Media',
    description: 'Images, videos PDFs and other files'
  },
  { id: 6,
    type: 'Button',
    svg: '/images/button.svg',
    title: 'Button',
    description: 'Type of button with name'
  }
];

export const texts = {
  siteTitle: 'Nettleger CMS Backend',
  dashboard: 'Dashboard',
  login: 'Logg inn',
  logout: 'Logg ut',
  pages: 'Sider',
  page: 'Side',
  createPage: 'Lag en side',
  updatePage: 'Oppdater siden',
  createPageSuccess: 'Siden ble opprettet.',
  updatePageSuccess: 'Oppdateringssiden er fullført.',
  deletePageSuccess: 'Fjerningssiden er fullført.',
  deletePageQue: 'Er du sikker på at du vil slette denne siden?',
  sections: 'Seksjoner',
  section: 'seksjon',
  updateSection: 'Oppdater seksjonen',
  createSectionSuccess: 'Seksjonen er opprettet.',
  updateSectionSuccess: 'Oppdateringsdelen er fullført.',
  deleteSectionSuccess: 'Fjerningen er fullført.',
  createSection: 'Lag en seksjon',
  deleteSectionQue: 'Er du sikker på at du vil slette denne delen?',
  modules: 'Moduler',
  module: 'modul',
  updateModule: 'Oppdater modulen',
  createModuleSuccess: 'Modulen er opprettet.',
  updateModuleSuccess: 'Oppdateringsmodulen er fullført.',
  deleteModuleSuccess: 'Fjerningsmodulen er fullført.',
  createModule: 'Lag en modul',
  deleteModuleQue: 'Er du sikker på at du vil slette denne modulen?',
  steps: 'Trinn',
  selected: 'valgt',
  contentType: 'Innholdstype',
  contentTypeId: 'INNHOLDSTYPE ID',
  contentTypeIdDescription: 'Bruk denne ID-en til å hente alt relatert til denne innholdstypen via API-en.',
  details: 'detaljer',
  fields: 'enger',
  fieldsDescription: {'first': 'Innholdstypen har brukt', 'second': 'av 50 felt.'},
  documentation: 'dokumentasjon',
  documentationDescription: {'first': 'Les mer om innholdstyper i vår', 'second': 'guide til innholdsmodellering.', 'third': 'For å lære mer om de forskjellige måtene å deaktivere og slette felt, se på', 'fourth': 'feltets livssyklus.'},
  entryTitle: 'Oppføringstittel',
  entryTitleDescription: 'Bruk denne IDen til å hente alt relatert til denne typen innhold via API.',
  validText: 'Dette feltet er obligatorisk',
  detailPage: 'Detaljside',
  detailModule: 'Detaljmodul',
  detailSection: 'Detaljavsnitt',
  detailStep: 'Detalj trinn',
  addField: 'Legg til felt',
  deleteFieldQue: 'Er du sikker på at du vil slette dette feltet?',
  actions: 'Handling',
  publish: 'Publisere',
  archive: 'Arkiv',
  name: 'Navn',
  nameDescription: 'Den vises i oppføringsredigereren',
  fieldId: 'Felt ID',
  fieldIdDescription: 'Den genereres automatisk basert på navnet og vises i API-svarene',
  save: 'Lagre',
  cancel: 'Avbryt',
  yes: 'Ja',
  no: 'Nei',
  create: 'Skape',
  changeType: 'Endre felttype',
  fieldSelectModalTitle: 'Legg til nytt felt',
  requiredField: 'Obligatorisk felt',
  requiredFieldDescription: 'Du vil ikke kunne publisere en oppføring hvis dette feltet er tomt',
  RichText:'Nytt rikt tekstfelt', 
  Text: 'Nytt tekstfelt',
  Number: 'Nytt heltallfelt',
  Date: 'Nytt felt for dato og tid',
  Location: 'Nytt plasseringsfelt',
  Media: 'Nytt mediefelt',
  Bool: 'Nytt boolsk felt',
  Json: 'Nytt JSON-objektfelt',
  Reference: 'Nytt referansefelt',
  dateTime: 'Dato tid',
  number: 'Nummer',
  notificationErr: 'Feil oppsto',
  notificationErrMsg: {name: 'Det kreves et navnefelt.', duplicate: 'Et navnefelt kan ikke dupliseres.', upload: 'Opplasting mislyktes.'},
  notificationSuccess: 'Suksess',
  notificationSuccessMsg: {upload: 'laste opp vellykket!'},
  notificationInfo: 'Informasjon',
  jsonPreview: 'Forhåndsvisning av JSON'
};

export const customPageData = {
  id: "",
  entry: "",
  type: "",
  fields: [
    {
      id: "slug",
      name: "slug",
      type: "text",
      required: true
    },
    {
      id: "metaTitle",
      name: "meta_title",
      type: "text",
      required: true
    },
    {
      id: "metaDescription",
      name: "meta_description",
      type: "RichText",
      required: false
    }
  ],
  sections: []
};

export const customSectionData= {
  name: "",
  title: "",
  description: "",
  direction: "",
  modules: [
    {
      moduleID: "",
      moduleX: "",
      direction: "" // 모듈들의 방향
    }
  ]
};
