import test from "ava";
import {u32, ucmp, unot} from "./index";

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
