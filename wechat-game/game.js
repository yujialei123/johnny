// 微信小游戏入口：只依赖 wx Canvas API，不依赖 DOM。
import {LEVELS,ICONS,clone,moveRaw,resolveCompleted,legalMove,won} from '../src/game.js';
const canvas=wx.createCanvas(), ctx=canvas.getContext('2d');
const W=canvas.width,H=canvas.height; let level=0,state=clone(LEVELS[0]),selected=-1,moves=0;
const slots=()=>{const gap=12, margin=20, w=(W-margin*2-gap*3)/4; return state.map((_,i)=>({x:margin+(w+gap)*(i%4),y:180+180*Math.floor(i/4),w,h:150}));};
function draw(){ctx.fillStyle='#bceeff';ctx.fillRect(0,0,W,H);ctx.fillStyle='#07304c';ctx.font='bold 28px sans-serif';ctx.fillText('海底整理师',20,55);ctx.font='16px sans-serif';ctx.fillText(`第 ${level+1}/3 关   步数 ${moves}`,20,88);slots().forEach((r,i)=>{ctx.fillStyle=i===selected?'#ffd16d':'#ffffff66';ctx.strokeStyle='#4aabc2';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(r.x,r.y,r.w,r.h,14);ctx.fill();ctx.stroke();state[i].forEach((t,j)=>{ctx.fillStyle='#fff';ctx.fillRect(r.x+8,r.y+r.h-34-j*34,r.w-16,28);ctx.fillStyle='#07304c';ctx.font='22px sans-serif';ctx.fillText(ICONS[t],r.x+r.w/2-11,r.y+r.h-12-j*34);});});}
function reset(){state=clone(LEVELS[level]);selected=-1;moves=0;draw();}
canvas.onTouchStart=e=>{const t=e.touches[0], r=slots().findIndex(x=>t.clientX>=x.x&&t.clientX<=x.x+x.w&&t.clientY>=x.y&&t.clientY<=x.y+x.h);if(r<0)return;if(selected<0){if(state[r].length){selected=r;draw();}}else if(r===selected){selected=-1;draw();}else if(legalMove(state,selected,r)){state=moveRaw(state,selected,r);moves++;selected=-1;draw();setTimeout(()=>{state=resolveCompleted(state).state;draw();if(won(state))wx.showToast({title:'整理完成'});},420);}else wx.showToast({title:'无法放入',icon:'none'});};
wx.onShow(reset); reset();
