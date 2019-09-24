import test from "ava";
import {ucmp, unot} from "./index";

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
