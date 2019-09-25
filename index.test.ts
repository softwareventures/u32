import test from "ava";
import {u32, ucmp, udiv, umul, unot} from "./index";

test("u32", t => {
    t.is(u32(0), 0);
    t.is(u32(1), 1);
    t.is(u32(-1), 0xffffffff);
    t.is(u32(0x7fffffff), 0x7fffffff);
    t.is(u32(0x80000000), 0x80000000);
    t.is(u32(-0x7fffffff), 0x80000001);
    t.is(u32(-0x80000000), 0x80000000);
});

test("unot", t => {
    t.is(unot(0), 1);
    t.is(unot(1), 0);
    t.is(unot(-1), 0);
    t.is(unot(342), 0);
    t.is(unot(-342), 0);
});

test("ucmp", t => {
    t.is(ucmp(0), 0xffffffff);
    t.is(ucmp(1), 0xfffffffe);
    t.is(ucmp(-1), 0);
    t.is(ucmp(0xffffffff), 0);
    t.is(ucmp(0xfffffffe), 1);
    t.is(ucmp(-0x3abc5126), 0x3abc5125);
    t.is(ucmp(0xc543aeda), 0x3abc5125);
    t.is(ucmp(0x3abc5125), 0xc543aeda);
});

test("umul", t => {
    t.is(umul(0, 0), 0);
    t.is(umul(1, 0), 0);
    t.is(umul(0, 1), 0);
    t.is(umul(2, 0), 0);
    t.is(umul(0, 2), 0);
    t.is(umul(1, 1), 1);
    t.is(umul(1, 2), 2);
    t.is(umul(2, 1), 2);
    t.is(umul(2, 2), 4);
    t.is(umul(2, 0xffff), 0x1fffe);
    t.is(umul(0xffff, 0xffff), 0xfffe0001);
    t.is(umul(0x10000, 0xffff), 0xffff0000);
    t.is(umul(0x100000, 0xffff), 0xfff00000);
});

test("udiv", t => {
    t.is(udiv(0, 5), 0);
    t.is(udiv(4, 5), 0);
    t.is(udiv(5, 5), 1);
    t.is(udiv(6, 5), 1);
    t.is(udiv(24, 5), 4);
    t.is(udiv(-31, 5), 858993453);
    t.is(udiv(5.1, 5), 1);
    t.is(udiv(-3, 5), 858993458);
    t.is(udiv(-6, 5), 858993458);
    t.is(udiv(0, -5), 0);
    t.is(udiv(4, -5), 0);
    t.is(udiv(5, -5), 0);
    t.is(udiv(6, -5), 0);
    t.is(udiv(24, -5), 0);
    t.is(udiv(-31, -5), 0);
    t.is(udiv(5.1, -5), 0);
    t.is(udiv(-3, -5), 1);
    t.is(udiv(-6, -5), 0);
});