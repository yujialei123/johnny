import test from 'node:test'; import assert from 'node:assert/strict'; import {LEVELS,legalMove,move,solve,won,hasLegalMove,applyMove} from '../src/game.js';
test('three initial levels have verified solutions',()=>LEVELS.forEach(level=>{const path=solve(level);assert.ok(path);let s=level;for(const [a,b] of path)s=move(s,a,b);assert.equal(won(s),true)}));
test('only top consecutive group moves',()=>{const s=[['a','b','b'],[],[],[],[],[],[],[]]; const n=move(s,0,1); assert.deepEqual(n[0],['a']); assert.deepEqual(n[1],['b','b']);});
test('reject full or mismatched target',()=>{assert.equal(legalMove([['a'],['b','b','b','b']],0,1),false); assert.equal(legalMove([['a'],['b']],0,1),false)});
test('full matching group clears, mixed group does not',()=>{assert.deepEqual(move([['a'],['a','a','a']],0,1),[[],[]]); assert.equal(move([['a'],['a','a','b']],0,1),null);});
test('win requires every slot empty',()=>{assert.equal(won([['a','a','a','a'],[],[],[],[],[],[],[]]),false);assert.equal(won([[],[],[],[],[],[],[],[]]),true)});
test('detect deadlock',()=>assert.equal(hasLegalMove([['a','b'],['b','a'],[],[],[],[],[],[]]),true));
test('one resolution handles every completed slot',()=>{const s=[['a','a','a','a'],['b','b','b','b'],[],[],[],[],[],[]];const r=applyMove([['a'],['a','a','a'],['b','b','b','b'],[],[],[],[],[]],0,1);assert.equal(r.cleared.length,2);assert.deepEqual(r.state,[[],[],[],[],[],[],[],[]]);});
