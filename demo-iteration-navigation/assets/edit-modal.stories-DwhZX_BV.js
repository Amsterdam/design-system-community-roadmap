import{i as e}from"./preload-helper-usAeo7Bx.js";import{t}from"./jsx-runtime-O9QVJvLM.js";import{A as n,M as r,j as i,t as a,w as o}from"./src-BJn4c_FH.js";var s,c,l,u,d,f,p,m,h;e((()=>{r(),a(),s=t(),c={title:`Molecules/Edit Modal`,component:o,decorators:[(e,{args:t})=>(0,s.jsxs)(`div`,{style:{padding:`2rem`},children:[(0,s.jsx)(n,{onClick:()=>i.open(`#${t.id}`),type:`button`,children:`Bewerken`}),(0,s.jsx)(e,{})]})]},l={args:{id:`edit-modal-idea`,initialValues:{title:`Gebruikersprofiel aanpassen`,content:`Het zou handig zijn als gebruikers zelf hun profiel kunnen aanpassen.`,statusIdea:`in_review`},onSubmit:e=>(console.log(`Opslaan:`,e),!0),type:`idea`}},u={args:{id:`edit-modal-feature`,initialValues:{title:`Donkere modus`,content:`Implementeer een donkere modus voor de hele applicatie.`,endDate:`2025-09-30`,startDate:`2025-07-01`},onSubmit:e=>(console.log(`Opslaan:`,e),!0),type:`feature`}},d={args:{id:`edit-modal-story`,initialValues:{title:`Donkere modus instellen`,content:`Als gebruiker wil ik een donkere modus kunnen inschakelen.`,endDate:`2025-08-15`,startDate:`2025-07-01`},onSubmit:e=>(console.log(`Opslaan:`,e),!0),type:`story`}},f={args:{error:`Er is iets misgegaan. Probeer het opnieuw.`,id:`edit-modal-error`,initialValues:{title:`Idee met foutmelding`,content:`Beschrijving van het idee.`,statusIdea:`accepted`},onSubmit:e=>(console.log(`Opslaan:`,e),!1),type:`idea`}},p={args:{fieldErrors:{title:`Titel mag maximaal 140 tekens bevatten.`,endDate:`Einddatum moet op of na de startdatum liggen.`},id:`edit-modal-field-errors`,initialValues:{title:`Een veel te lange titel die de maximale lengte van honderdveertig tekens overschrijdt en dus een validatiefout veroorzaakt bij het opslaan…`,content:`Implementeer een donkere modus voor de hele applicatie.`,endDate:`2025-06-01`,startDate:`2025-07-01`},onSubmit:e=>(console.log(`Opslaan:`,e),!1),type:`feature`}},m={args:{id:`edit-modal-loading`,initialValues:{title:`Donkere modus`,content:`Implementeer een donkere modus voor de hele applicatie.`,endDate:`2025-09-30`,startDate:`2025-07-01`},loading:!0,onSubmit:e=>(console.log(`Opslaan:`,e),!0),type:`feature`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'edit-modal-idea',
    initialValues: {
      title: 'Gebruikersprofiel aanpassen',
      content: 'Het zou handig zijn als gebruikers zelf hun profiel kunnen aanpassen.',
      statusIdea: 'in_review'
    },
    onSubmit: values => {
      console.log('Opslaan:', values);
      return true;
    },
    type: 'idea'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'edit-modal-feature',
    initialValues: {
      title: 'Donkere modus',
      content: 'Implementeer een donkere modus voor de hele applicatie.',
      endDate: '2025-09-30',
      startDate: '2025-07-01'
    },
    onSubmit: values => {
      console.log('Opslaan:', values);
      return true;
    },
    type: 'feature'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'edit-modal-story',
    initialValues: {
      title: 'Donkere modus instellen',
      content: 'Als gebruiker wil ik een donkere modus kunnen inschakelen.',
      endDate: '2025-08-15',
      startDate: '2025-07-01'
    },
    onSubmit: values => {
      console.log('Opslaan:', values);
      return true;
    },
    type: 'story'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    error: 'Er is iets misgegaan. Probeer het opnieuw.',
    id: 'edit-modal-error',
    initialValues: {
      title: 'Idee met foutmelding',
      content: 'Beschrijving van het idee.',
      statusIdea: 'accepted'
    },
    onSubmit: values => {
      console.log('Opslaan:', values);
      return false;
    },
    type: 'idea'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    fieldErrors: {
      title: 'Titel mag maximaal 140 tekens bevatten.',
      endDate: 'Einddatum moet op of na de startdatum liggen.'
    },
    id: 'edit-modal-field-errors',
    initialValues: {
      title: 'Een veel te lange titel die de maximale lengte van honderdveertig tekens overschrijdt en dus een validatiefout veroorzaakt bij het opslaan…',
      content: 'Implementeer een donkere modus voor de hele applicatie.',
      endDate: '2025-06-01',
      startDate: '2025-07-01'
    },
    onSubmit: values => {
      console.log('Opslaan:', values);
      return false;
    },
    type: 'feature'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    id: 'edit-modal-loading',
    initialValues: {
      title: 'Donkere modus',
      content: 'Implementeer een donkere modus voor de hele applicatie.',
      endDate: '2025-09-30',
      startDate: '2025-07-01'
    },
    loading: true,
    onSubmit: values => {
      console.log('Opslaan:', values);
      return true;
    },
    type: 'feature'
  }
}`,...m.parameters?.docs?.source}}},h=[`EditIdea`,`EditFeature`,`EditStory`,`WithError`,`WithFieldErrors`,`Loading`]}))();export{u as EditFeature,l as EditIdea,d as EditStory,m as Loading,f as WithError,p as WithFieldErrors,h as __namedExportsOrder,c as default};