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
  Button: '/images/button.svg',
  Select: '/images/select.svg',
  Input: '/images/input.svg',
  Radio: '/images/radio.svg',
  FormGroup: '/images/form.svg',
  Checkbox: '/images/checkbox.svg',
  Treatment: '/images/treatment.svg',
  background: '/images/bg.svg',
  logo: '/images/nettleger-logo-color.svg',
  white_logo: '/images/nettleger-logo-white.svg'
};
export const formFieldTypes = [
  {
    id: 1,
    type: 'Select',
    svg: '/images/select.svg',
    title: 'Select',
    description: 'Add select box to the form'
  },
  {
    id: 2,
    type: 'Input',
    svg: '/images/input.svg',
    title: 'Input',
    description: 'Add input box to the form'
  },
  {
    id: 3,
    type: 'Radio',
    svg: '/images/radio.svg',
    title: 'Radio Group',
    description: 'Add radio group to the form'
  },
  {
    id: 4,
    type: 'Checkbox',
    svg: '/images/checkbox.svg',
    title: 'Checkbox',
    description: 'Add check box to the form'
  },
  {
    id: 5,
    type: 'Textarea',
    svg: '/images/textIcon.svg',
    title: 'Textarea',
    description: 'Add textarea to the form'
  },
  {
    id: 6,
    type: 'Number',
    svg: '/images/number.svg',
    title: 'Number',
    description: 'ID, order number, rating, quantity'
  },
  {
    id: 7,
    type: 'Date',
    svg: '/images/date.svg',
    title: 'Date and time',
    description: 'Event dates'
  },
  {
    id: 8,
    type: 'Questions',
    svg: '/images/question.svg',
    title: 'Question list',
    description: 'Add question list to the form'
  }
];
export const treatmentFieldTypes = [
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
    type: 'Button',
    svg: '/images/button.svg',
    title: 'Button',
    description: 'Type of button with name'
  },
  {
    id: 5,
    type: 'FormGroup',
    svg: '/images/form.svg',
    title: 'Form Group',
    description: 'Bygg et skjema og legg det til trinnet'
  }
];
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
  },
  {
    id: 6,
    type: 'Treatment',
    svg: '/images/treatment.svg',
    title: 'Treatment',
    description: 'Select a treatment and make them as a group'
  },
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
export const treatmentHeadCells = [
  { id: 'id', align: false, disablePadding: true, label: 'Id' },
  { id: 'name', align: true, disablePadding: false, label: 'Navn' },
  { id: 'cost', align: true, disablePadding: false, label: 'Koste' },
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
      type: 'banner section ? set this value to banner',
      content: 'Group of modules or Group of treatments'
    }
  },
  modul: {
    title: 'Module',
    content: {
      name: 'Required',
      content: 'Group of fields'
    }
  },
  behandling: {
    title: 'Treatments',
    content: {
      name: 'Required',
      cost: 'Required',
      description: 'Required',
      steps: 'Step1 & Step2'
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
  createTreatmentSuccess: 'Behandlingen er opprettet.',
  updateTreatmentSuccess: 'Oppdater behandlingen er fullført.',
  deleteTreatmentSuccess: 'Fjerning behandlingen er fullført.',
  createTreatment: 'Lag en behandling',
  deleteTreatmentQue: 'Er du sikker på at du vil slette denne behandlingen?',
  treatments: 'Behandlinger',
  treatment: 'behandling',
  detailTreatment: 'Detaljbehandling',
  step1: 'Trinn1',
  step2: 'Trinn2',
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
  addSelect: 'Legg til et alternativ i alternativene',
  selectDescription: 'Velg en gjenstand',
  add: 'Legge til',
  save: 'Lagre',
  edit: 'Redigere',
  cancel: 'Avbryt',
  delete: 'Slett',
  yes: 'Ja',
  no: 'Nei',
  create: 'Skape',
  changeType: 'Endre felttype',
  fieldSelectModalTitle: 'Legg til nytt felt',
  requiredField: 'Obligatorisk felt',
  requiredFieldDescription: 'Du vil ikke kunne publisere en oppføring hvis dette feltet er tomt',
  RichText:'Nytt rikt tekstfelt', 
  Text: 'Nytt tekstfelt',
  Textarea: 'Nytt tekstfelt',
  Number: 'Nytt heltallfelt',
  Date: 'Nytt felt for dato og tid',
  Location: 'Nytt plasseringsfelt',
  Media: 'Nytt mediefelt',
  Bool: 'Nytt boolsk felt',
  Json: 'Nytt JSON-objektfelt',
  Reference: 'Nytt referansefelt',
  Module: 'Velg en modul',
  Section: 'Velg en seksjon',
  Select: 'Ny Plukke ut',
  Input: 'Ny inngangsboks',
  Radio: 'Ny radiogruppe',
  Checkbox: 'Ny avkrysningsrute',
  FormGroup: 'Ny skjema gruppe',
  dateTime: 'Dato tid',
  dateFrom: 'Dato fra',
  dateTo: 'Dato til',
  number: 'Nummer',
  notificationErr: 'Feil oppsto',
  notificationErrMsg: {name: 'Det kreves et navnefelt.', duplicate: 'Et navnefelt kan ikke dupliseres.', upload: 'Opplasting mislyktes.', page: 'Kontroller validering av sidemodell. Kontroller MODELLVALIDERINGEN på skuffpanelet.', treatment: 'Kontroller MODELLVALIDERINGEN på skuffpanelet.', addForm: 'Kan ikke legge til skjemagruppe her. Velg trinn 2.'},
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
  dropzoneQue: ['Sti: ', 'Klikk her eller slipp en fil for å laste den opp!', 'Slipp det som det er varmt!', 'Filtype aksepteres ikke, beklager!'],
  basic: "Grunnleggende",
  detailFormGroup: 'Rediger detaljene for skjemagruppe',
  title: 'Tittel',
  description: 'Beskrivelse',
  question: 'Spørsmål',
  addQuestion: 'Legg til et spørsmål i listen',
  option: 'Alternativ',
  label: 'Merkelapp',
  tooltip: 'Verktøytips',
  multi: 'Flere',
  country: 'Land',
  radio: 'Radio',
  placeholder: 'Plassholder'
};
