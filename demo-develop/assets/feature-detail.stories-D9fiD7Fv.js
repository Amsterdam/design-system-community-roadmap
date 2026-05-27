import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{C as n}from"./iframe-D3Cm_H3K.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{E as i,f as a,m as o,t as s}from"./src-DSSRyRWL.js";import{S as c,_ as l,b as u,d,g as f,h as p,l as m,m as h,n as g,o as _,r as v,t as y,u as b,v as x,x as S,y as C}from"./StrapiImageBlock-DPDiq5xp.js";import{n as w,r as T,t as E}from"./date-DDhTkvwE.js";var D,O=e((()=>{D={"feature-detail__stories-container":`_feature-detail__stories-container_cbgs1_1`,"feature-detail__stories":`_feature-detail__stories_cbgs1_1`,"feature-detail__story-content":`_feature-detail__story-content_cbgs1_9`,"feature-detail__story-date":`_feature-detail__story-date_cbgs1_16`,"feature-detail__details":`_feature-detail__details_cbgs1_20`,"feature-detail__header":`_feature-detail__header_cbgs1_33`}}));function k({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,featureDocumentId:c,images:m,isLiked:h,reactions:g,startDate:b,stories:T,voteCount:O}){let k=p(),[M,N]=(0,A.useState)(!1),[P,F]=(0,A.useState)(),I=g.find(e=>e.author?.isTeam),L=I?g.filter(e=>e.id!==I.id):g,R=[...T].sort((e,t)=>!e.startDate&&!t.startDate?0:e.startDate?t.startDate?new Date(e.startDate).getTime()-new Date(t.startDate).getTime():-1:1),z=async e=>{if(!n){k.push(`/inloggen`);return}if((await d(c,e)).needsLogin){k.push(`/inloggen`);return}k.refresh()},B=async e=>{(await _(c,e)).success&&k.refresh()};return(0,j.jsxs)(l,{gapVertical:`large`,children:[(0,j.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,j.jsxs)(`div`,{className:D[`feature-detail__header`],children:[(0,j.jsx)(x,{level:1,size:`level-2`,children:e}),(0,j.jsx)(i,{count:O,isLiked:h,onToggle:z,size:`large`})]}),(0,j.jsx)(C,{children:t}),(0,j.jsx)(y,{fallbackAlt:e,images:m}),T.length>0&&(0,j.jsxs)(`div`,{className:D[`feature-detail__stories-container`],children:[(0,j.jsx)(x,{level:2,size:`level-4`,children:`Stories`}),(0,j.jsx)(`div`,{className:D[`feature-detail__stories`],children:(0,j.jsx)(u,{headingLevel:3,children:R.map(e=>(0,j.jsx)(u.Step,{heading:e.title,status:w(e.startDate,e.endDate),children:(0,j.jsxs)(`div`,{className:D[`feature-detail__story-content`],children:[(0,j.jsx)(`div`,{className:D[`feature-detail__story-date`],children:(0,j.jsx)(f,{label:E(e.startDate,e.endDate)})}),(0,j.jsx)(S,{href:`/stories/${e.documentId}`,children:`Bekijk details`})]})},e.documentId))})})]})]}),(0,j.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,j.jsx)(x,{level:2,size:`level-4`,children:`Details`}),(0,j.jsxs)(`dl`,{className:D[`feature-detail__details`],children:[(0,j.jsx)(`dt`,{children:(0,j.jsx)(`strong`,{children:`Status`})}),(0,j.jsx)(`dd`,{children:(0,j.jsx)(f,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,j.jsx)(`dt`,{children:(0,j.jsx)(`strong`,{children:`Startdatum`})}),(0,j.jsx)(`dd`,{children:b?new Date(b).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(`dt`,{children:(0,j.jsx)(`strong`,{children:`Einddatum`})}),(0,j.jsx)(`dd`,{children:new Date(s).toLocaleDateString(`nl-NL`)})]})]}),I&&(0,j.jsx)(a,{onDeleteReaction:r?B:void 0,reactions:[I]}),(0,j.jsx)(x,{level:2,size:`level-4`,children:`Reacties`}),(0,j.jsx)(a,{compact:!0,onDeleteReaction:r?B:void 0,reactions:L}),(0,j.jsx)(o,{error:P,isLoggedIn:!!n,loading:M,onSubmit:async e=>{N(!0),F(void 0);let t=await v(c,e);if(N(!1),t.needsLogin){k.push(`/inloggen`);return}if(t.error){F(t.error);return}t.success&&k.refresh()}})]})]})}var A,j,M=e((()=>{c(),s(),h(),A=t(n()),b(),m(),T(),O(),g(),j=r(),k.__docgenInfo={description:``,methods:[],displayName:`FeatureDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},featureDocumentId:{required:!0,tsType:{name:`string`},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},stories:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`endDate`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`startDate`,value:{name:`string`,required:!1}},{key:`title`,value:{name:`string`,required:!0}}]}}],raw:`ConnectedStory[]`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),N,P,F,I,L,R,z,B;e((()=>{M(),N=r(),P=[{author:{name:`Lieke Smit`},content:`Fijn om te zien dat dit op de planning staat. Wij wachten hier al lang op.`,id:1},{author:{name:`Bart Hendriks`},content:`Zijn er al Figma-bestanden beschikbaar voor de nieuwe tabelopmaak?`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`De designfase is gestart. We delen de Figma-link zodra de eerste versie klaar is.`,id:3}],F=[{title:`[Design] Tabel varianten`,documentId:`story-dt-001`,endDate:`2025-05-10`,startDate:`2025-04-15`},{title:`[Code] Sorteerbare kolommen`,documentId:`story-dt-002`,endDate:`2025-06-20`,startDate:`2025-05-12`},{title:`[Code] Paginering integratie`,documentId:`story-dt-003`,endDate:null,startDate:`2025-06-23`}],I={title:`Pages/Feature Detail`,component:k,decorators:[e=>(0,N.jsx)(`div`,{style:{padding:`2rem`},children:(0,N.jsx)(e,{})})],parameters:{layout:`fullscreen`}},L={args:{title:`Data Tabel`,content:`Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.`,endDate:null,featureDocumentId:`feature-dt-main`,isLiked:!1,reactions:P,startDate:`2025-04-15`,stories:F,voteCount:53}},R={args:{title:`Applicatie-layout`,content:`De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.`,endDate:`2025-03-28`,featureDocumentId:`feature-layout-main`,isLiked:!0,reactions:P.slice(0,2),startDate:`2025-01-10`,stories:[{title:`[Design] Achtergrond-kleur voor interne applicaties`,documentId:`story-layout-001`,endDate:`2025-01-31`,startDate:`2025-01-10`},{title:`[Code] Geneste items en actieve weergave Menu`,documentId:`story-layout-002`,endDate:`2025-03-28`,startDate:`2025-02-03`}],voteCount:38}},z={args:{title:`Patronen`,content:`Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.`,endDate:null,featureDocumentId:`feature-patterns-main`,isLiked:!1,reactions:[],startDate:`2025-05-20`,stories:[],voteCount:22}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Data Tabel',
    content: 'Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.',
    endDate: null,
    featureDocumentId: 'feature-dt-main',
    isLiked: false,
    reactions: mockReactions,
    startDate: '2025-04-15',
    stories: mockStories,
    voteCount: 53
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Applicatie-layout',
    content: 'De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.',
    endDate: '2025-03-28',
    featureDocumentId: 'feature-layout-main',
    isLiked: true,
    reactions: mockReactions.slice(0, 2),
    startDate: '2025-01-10',
    stories: [{
      title: '[Design] Achtergrond-kleur voor interne applicaties',
      documentId: 'story-layout-001',
      endDate: '2025-01-31',
      startDate: '2025-01-10'
    }, {
      title: '[Code] Geneste items en actieve weergave Menu',
      documentId: 'story-layout-002',
      endDate: '2025-03-28',
      startDate: '2025-02-03'
    }],
    voteCount: 38
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Patronen',
    content: 'Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.',
    endDate: null,
    featureDocumentId: 'feature-patterns-main',
    isLiked: false,
    reactions: [],
    startDate: '2025-05-20',
    stories: [],
    voteCount: 22
  }
}`,...z.parameters?.docs?.source}}},B=[`InProgress`,`Completed`,`NoStories`]}))();export{R as Completed,L as InProgress,z as NoStories,B as __namedExportsOrder,I as default};