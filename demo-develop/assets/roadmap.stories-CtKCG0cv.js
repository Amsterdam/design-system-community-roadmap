import{i as e}from"./preload-helper-usAeo7Bx.js";import{a as t,c as n,r,s as i,t as a,u as o}from"./src-CFw03op6.js";var s,c,l,u,d,f,p,m,h;e((()=>{a(),t(),{expect:s,userEvent:c}=__STORYBOOK_MODULE_TEST__,l=new Date,u=e=>n(e,`yyyy-MM-dd`),d={title:`Organisms/Roadmap`,component:r,args:{features:[{title:`Applicatie-layout`,documentId:`feature-1`,endDate:u(o(l,30)),id:1,startDate:u(i(l,5)),stories:[{title:`[Design] Achtergrond-kleur voor interne applicaties`,documentId:`story-1-1`,endDate:u(o(l,8)),id:11,startDate:u(i(l,3))},{title:`[Code] Geneste items en actieve weergave Menu`,documentId:`story-1-3`,endDate:u(o(l,30)),id:13,startDate:u(o(l,17))}]},{title:`Data tabel`,documentId:`feature-2`,endDate:u(o(l,55)),id:2,startDate:u(o(l,15)),stories:[{title:`[Design] Tabel varianten`,documentId:`story-2-1`,endDate:u(o(l,35)),id:21,startDate:u(o(l,15))},{title:`[Code] Sorteerbare kolommen`,documentId:`story-2-2`,endDate:u(o(l,55)),id:22,startDate:u(o(l,36))}]},{title:`Patronen`,documentId:`feature-3`,endDate:u(o(l,45)),id:3,startDate:u(o(l,20)),stories:[]},{title:`Form Control Design`,documentId:`feature-4`,endDate:u(o(l,80)),id:4,startDate:u(o(l,40)),stories:[{title:`[Design] Form layout richtlijnen`,documentId:`story-4-1`,endDate:u(o(l,60)),id:41,startDate:u(o(l,40))}]}],onFeatureNavigate:e=>console.log(`Navigate to feature:`,e.documentId),onStoryNavigate:e=>console.log(`Navigate to story:`,e.documentId),standaloneStories:[{title:`Testen`,documentId:`story-standalone-1`,endDate:u(o(l,25)),id:101,startDate:u(o(l,10))},{title:`Rich Text editor onderzoek`,documentId:`story-standalone-2`,endDate:null,id:102,startDate:u(o(l,50))}]},parameters:{layout:`fullscreen`}},f={},p={play:async({canvas:e})=>{let t=e.getByRole(`button`,{name:/^Feature: Applicatie-layout/});await c.click(t);let n=e.getByRole(`link`,{name:`Bekijk feature: Applicatie-layout`});await s(n).toBeVisible(),await s(n).toHaveAttribute(`href`,`/features/feature-1`)}},m={args:{standaloneStories:[]}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas
  }) => {
    const featureBar = canvas.getByRole('button', {
      name: /^Feature: Applicatie-layout/
    });
    await userEvent.click(featureBar);
    const detailLink = canvas.getByRole('link', {
      name: 'Bekijk feature: Applicatie-layout'
    });
    await expect(detailLink).toBeVisible();
    await expect(detailLink).toHaveAttribute('href', '/features/feature-1');
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    standaloneStories: []
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`FocusedFeature`,`FeaturesOnly`]}))();export{f as Default,m as FeaturesOnly,p as FocusedFeature,h as __namedExportsOrder,d as default};