export const CAPACITY=4;
export const TYPES=['shell','starfish','conch','pearl'];
export const ICONS={shell:'🐚',starfish:'⭐',conch:'🐌',pearl:'🟢'};
export const LEVELS=[
 [['shell','starfish','shell','starfish'],['starfish','shell','starfish','shell'],[],[],[],[],[],[]],
 [['starfish','starfish','starfish'],['starfish'],['conch','conch','conch'],['conch'],['pearl','pearl','pearl'],['pearl'],['shell','shell','shell'],['shell']],
 [['conch','conch','conch'],['conch'],['pearl','pearl','pearl'],['pearl'],['shell','shell','shell'],['shell'],['starfish','starfish','starfish'],['starfish']]
];
export function clone(s){return s.map(x=>[...x]);}
export function topRun(state,from){const a=state[from]; if(!a.length)return 0; const t=a[a.length-1]; let n=0; for(let i=a.length-1;i>=0&&a[i]===t;i--)n++; return n;}
export function legalMove(state,from,to){if(from===to||!state[from]?.length||!state[to])return false; const n=topRun(state,from), dest=state[to]; return dest.length===0 || (dest[dest.length-1]===state[from][state[from].length-1] && dest.length+n<=CAPACITY);}
export function moveRaw(state,from,to){if(!legalMove(state,from,to))return null; const next=clone(state), n=topRun(next,from), items=next[from].splice(-n); next[to].push(...items); return next;}
export function resolveCompleted(state){const next=clone(state); const cleared=[]; next.forEach((slot,i)=>{if(slot.length===CAPACITY && slot.every(x=>x===slot[0])){cleared.push({slot:i,type:slot[0],count:CAPACITY});next[i]=[];}}); return {state:next,cleared};}
export function move(state,from,to){const raw=moveRaw(state,from,to); return raw?resolveCompleted(raw).state:null;}
export function applyMove(state,from,to){const raw=moveRaw(state,from,to); if(!raw)return null; const resolved=resolveCompleted(raw); return {state:resolved.state,rawState:raw,cleared:resolved.cleared};}
export function won(state){return state.every(a=>a.length===0);}
export function hasLegalMove(state){for(let i=0;i<state.length;i++)for(let j=0;j<state.length;j++)if(legalMove(state,i,j))return true;return false;}
export function key(s){return s.map(a=>a.join('')).join('|');}
export function solve(initial){const q=[clone(initial)], seen=new Set([key(initial)]), prev=new Map(); while(q.length){const s=q.shift(); if(won(s)){const path=[]; let k=key(s); while(prev.has(k)){const p=prev.get(k); path.push(p.move); k=p.from;} return path.reverse();} for(let i=0;i<s.length;i++)for(let j=0;j<s.length;j++){const n=move(s,i,j); if(n){const k=key(n); if(!seen.has(k)){seen.add(k); prev.set(k,{from:key(s),move:[i,j]}); q.push(n);}}}} return null;}
