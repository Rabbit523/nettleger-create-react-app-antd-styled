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
  Module: '/images/module.svg',
  Section: '/images/section.svg',
  Button: '/images/buttonOutline.svg',
  background: '/images/bg.svg',
  logo: '/images/nettleger-logo-color.svg',
  white_logo: '/images/nettleger-logo-white.svg'
};
export const moduleFieldTypes = [
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
  {
    id: 3,
    type: 'Number',
    svg: '/images/number.svg',
    title: 'Number',
    description: 'ID, order number, rating, quantity'
  },
  {
    id: 4,
    type: 'Date',
    svg: '/images/date.svg',
    title: 'Date and time',
    description: 'Event dates'
  },
  {
    id: 5,
    type: 'Media',
    svg: '/images/media.svg',
    title: 'Media',
    description: 'Images, videos PDFs and other files'
  },
  {
    id: 6,
    type: 'Button',
    svg: '/images/button.svg',
    title: 'Button',
    description: 'Type of button with name'
  }
];
export const sectionFieldTypes = [
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
  {
    id: 3,
    type: 'Number',
    svg: '/images/number.svg',
    title: 'Number',
    description: 'ID, order number, rating, quantity'
  },
  {
    id: 4,
    type: 'Media',
    svg: '/images/media.svg',
    title: 'Media',
    description: 'Images, videos PDFs and other files'
  },
  {
    id: 5,
    type: 'Module',
    svg: '/images/module.svg',
    title: 'Module',
    description: 'Select a module and make them as a group'
  }
];
export const pageFieldTypes = [
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
  {
    id: 3,
    type: 'Number',
    svg: '/images/number.svg',
    title: 'Number',
    description: 'ID, order number, rating, quantity'
  },
  {
    id: 4,
    type: 'Media',
    svg: '/images/media.svg',
    title: 'Media',
    description: 'Images, videos PDFs and other files'
  },
  {
    id: 5,
    type: 'Section',
    svg: '/images/section.svg',
    title: 'Section',
    description: 'Select a section and manage module group'
  }
];
export const moduleHeadCells = [
  { id: 'id', align: false, disablePadding: true, label: 'Id' },
  { id: 'name', align: true, disablePadding: false, label: 'Navn' },
  { id: 'time', align: true, disablePadding: false, label: 'Oppdatert tid' },
  { id: 'action', align: true, disablePadding: false, label: 'Handling' },
];
export const sectionHeadCells = [
  { id: 'id', align: false, disablePadding: true, label: 'Id' },
  { id: 'name', align: true, disablePadding: false, label: 'Navn' },
  { id: 'time', align: true, disablePadding: false, label: 'Oppdatert tid' },
  { id: 'action', align: true, disablePadding: false, label: 'Handling' },
];
export const pageHeadCells = [
  { id: 'id', align: false, disablePadding: true, label: 'Id' },
  { id: 'name', align: true, disablePadding: false, label: 'Navn' },
  { id: 'slug', align: true, disablePadding: false, label: 'Mordersnegle' },
  { id: 'status', align: true, disablePadding: false, label: 'Status' },
  { id: 'time', align: true, disablePadding: false, label: 'Oppdatert tid' },
  { id: 'action', align: true, disablePadding: false, label: 'Handling' },
];
export const pageModelValidationJson = {
  name: 'Required',
  meta_title: 'Required',
  meta_description: 'Required',
  slug: 'Page URL',
  type: 'Single/Multiple',
  sections: 'Group of sections'
};
export const modelValidationJson = {
  seksjon: {
    title: 'Section',
    content: {
      name: 'Required',
      content: 'Group of modules'
    }
  },
  modul: {
    title: 'Module',
    content: {
      name: 'Required',
      content: 'Group of fields'
    }
  }
};
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
  pageModelValidation: 'Validering av sidemodell',
  modelValidation: 'Modellvalidering',
  modelValidationDescription: 'Navnefeltet skal defineres, og det kan ikke være tomt.',
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
  published: 'Publisert',
  archived: 'Arkivert',
  name: 'Navn',
  nameDescription: 'Den vises i oppføringsredigereren',
  fieldId: 'Felt ID',
  fieldIdDescription: 'Den brukes til elementidentitet.',
  select: 'Plukke ut',
  selectDescription: 'Velg en gjenstand',
  save: 'Lagre',
  edit: 'Redigere',
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
  Module: 'Velg en modul',
  Section: 'Velg en seksjon',
  dateTime: 'Dato tid',
  number: 'Nummer',
  notificationErr: 'Feil oppsto',
  notificationErrMsg: {name: 'Det kreves et navnefelt.', duplicate: 'Et navnefelt kan ikke dupliseres.', upload: 'Opplasting mislyktes.', page: 'Kontroller validering av sidemodell.'},
  notificationSuccess: 'Suksess',
  notificationSuccessMsg: {upload: 'laste opp vellykket!', delete: 'Slette data er vellykket.'},
  notificationInfo: 'Informasjon',
  jsonPreview: 'Forhåndsvisning av JSON',
  direction: 'Retning',
  fieldModuleAmount: 'Antall moduler',
  editSectionData: 'Rediger seksjonsdata for siden',
  editModuleData: 'Rediger moduldata for siden',
  originModuleModel: 'Original modulmodell',
  sectionmoduleData: 'Seksjonsmoduldata',
  dropzoneQue: ['Sti: ', 'Klikk her eller slipp en fil for å laste den opp!', 'Slipp det som det er varmt!', 'Filtype aksepteres ikke, beklager!']
};
