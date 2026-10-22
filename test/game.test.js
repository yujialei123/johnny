import test from 'node:test'; import assert from 'node:assert/strict'; import {CAPACITY,LEVELS,legalMove,move,solve,won} from '../src/game.js';
test('all five levels have solutions',()=>LEVELS.forEach(l=>assert.ok(solve(l)?.length>=0)));
test('only top consecutive group moves',()=>{const s=[['a','b','b'],[],[],[],[],[],[],[]]; assert.equal(legalMove(s,0,1),true); const n=move(s,0,1); assert.deepEqual(n[0],['a']); assert.deepEqual(n[1],['b','b']);});
test('reject full or mismatched target',()=>{assert.equal(legalMove([['a'],['b','b','b','b']],0,1),false); assert.equal(legalMove([['a'],['b']],0,1),false)});
test('full matching group clears',()=>{const n=move([['a'],['a','a','a']],0,1); assert.deepEqual(n,[[],[]]); assert.equal(won(n),true)});
test('capacity and win',()=>{const s=[['a','a'],['a','a'],[],[],[],[],[],[]]; assert.equal(legalMove(s,0,1),true); assert.equal(won(move(s,0,1)),true)});
