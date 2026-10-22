export const CAPACITY=4;
export const TYPES=['shell','starfish','conch','pearl'];
export const ICONS={shell:'🐚',starfish:'⭐',conch:'🐌',pearl:'🟢'};
export const LEVELS=[
 [['shell','shell','starfish','starfish'],['conch','conch','pearl','pearl'],['shell','shell','conch','conch'],['starfish','starfish','pearl','pearl'],[],[],[],[]],
 [['shell','starfish','shell'],['starfish','shell','starfish'],['conch','conch','pearl','pearl'],['pearl','pearl','conch','conch'],[],[],[],[]],
 [['shell','starfish','conch','pearl'],['starfish','conch','pearl','shell'],['conch','pearl','shell','starfish'],['pearl','shell','starfish','conch'],[],[],[],[]]
];
export function clone(s){return s.map(x=>[...x]);}
export function topRun(state,from){const a=state[from]; if(!a.length)return 0; const t=a[a.length-1]; let n=0; for(let i=a.length-1;i>=0&&a[i]===t;i--)n++; return n;}
export function legalMove(state,from,to){if(from===to||!state[from]?.length||!state[to])return false; const n=topRun(state,from), dest=state[to]; return dest.length===0 || (dest[dest.length-1]===state[from][state[from].length-1] && dest.length+n<=CAPACITY);}
export function move(state,from,to){if(!legalMove(state,from,to))return null; const next=clone(state), n=topRun(next,from), items=next[from].splice(-n); next[to].push(...items); if(next[to].length===CAPACITY && next[to].every(x=>x===next[to][0])) next[to].length=0; return next;}
export function won(state){return state.every(a=>a.length===0);}
export function hasLegalMove(state){for(let i=0;i<state.length;i++)for(let j=0;j<state.length;j++)if(legalMove(state,i,j))return true;return false;}
export function key(s){return s.map(a=>a.join('')).join('|');}
export function solve(initial){const q=[clone(initial)], seen=new Set([key(initial)]), prev=new Map(); while(q.length){const s=q.shift(); if(won(s)){const path=[]; let k=key(s); while(prev.has(k)){const p=prev.get(k); path.push(p.move); k=p.from;} return path.reverse();} for(let i=0;i<s.length;i++)for(let j=0;j<s.length;j++){const n=move(s,i,j); if(n){const k=key(n); if(!seen.has(k)){seen.add(k); prev.set(k,{from:key(s),move:[i,j]}); q.push(n);}}}} return null;}
