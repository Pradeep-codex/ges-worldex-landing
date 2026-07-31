import"./rolldown-runtime-CNC7AqOf.js";import{n as e,t}from"./react-BrRRJ8T6.js";import{t as n}from"./compiler-runtime-BwZ1Hg30.js";import{F as r,H as i,Lt as a,R as o,Rt as s,St as c,gt as l}from"./dist-Bfss2QGe.js";import{Fo as u,Go as d,Ho as f,Ko as p,Po as m,Ul as h,Uo as g,as as _,io as v,os as y,pn as b,qo as x,ro as S,vs as C,zo as w}from"./index2-XnglaLxW.js";var T=e(),E=n();t(),h(),x(),p(),w(),_(),d(),g(),f(),C(),y(),u(),m();var D=1,O=3,k=s(o).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>a`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[O]}px) {
      position: relative;
    }
  `),A=s(i).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return a`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[O]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[D]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function j(e){let t=(0,E.c)(12),n=l(),{state:i}=v(),{isOpen:a}=i,o=n<=D&&a?`hidden`:`auto`,s;t[0]===e?s=t[1]:(s=e.renderDefault(e),t[0]=e,t[1]=s);let u;t[2]!==o||t[3]!==s?(u=(0,T.jsx)(r,{flex:1,height:`fill`,overflow:o,children:s}),t[2]=o,t[3]=s,t[4]=u):u=t[4];let d;t[5]===a?d=t[6]:(d=a&&(0,T.jsx)(A,{zOffset:100,height:`fill`,children:(0,T.jsx)(b,{})}),t[5]=a,t[6]=d);let f;t[7]===d?f=t[8]:(f=(0,T.jsx)(c,{initial:!1,children:d}),t[7]=d,t[8]=f);let p;return t[9]!==u||t[10]!==f?(p=(0,T.jsxs)(k,{sizing:`border`,height:`fill`,children:[u,f]}),t[9]=u,t[10]=f,t[11]=p):p=t[11],p}function M(e){let t=(0,E.c)(4),{enabled:n}=S();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,T.jsx)(j,{...e}),t[2]=e,t[3]=r),r}export{M as TasksStudioActiveToolLayout};