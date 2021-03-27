import test from "ava";
import {u32, uadd, uand, ucmp, udiv, ueq, ugt, ugte, ult, ulte, umod, umul, uneg, uneq, unot, uor, upow, usub} from "./index";

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

test("uneg", t => {
    t.is(uneg(0), 0);
    t.is(uneg(1), 0xffffffff);
    t.is(uneg(-1), 1);
    t.is(uneg(342), 0xfffffeaa);
    t.is(uneg(-342), 342);
    t.is(uneg(1e10), 0xabf41c00);
    t.is(uneg(0x7fffffff), 0x80000001);
    t.is(uneg(-0x80000000), 0x80000000);
});

test("upow", t => {
    t.is(upow(0, 0), 1);
    t.is(upow(0, -1), 0);
    t.is(upow(0, -2481), 0);
    t.is(upow(0, 1), 0);
    t.is(upow(0, 32147), 0);
    t.is(upow(1, 0), 1);
    t.is(upow(1, -1), 1);
    t.is(upow(1, 2), 1);
    t.is(upow(1, 100), 1);
    t.is(upow(2, -1), 0);
    t.is(upow(2, 0), 1);
    t.is(upow(2, 4), 16);
    t.is(upow(2, 7), 128);
    t.is(upow(2, 31), 2147483648);
    t.is(upow(2, 32), 0);
    t.is(upow(4, 16), 0);
    t.is(upow(3, 19), 1162261467);
    t.is(upow(3, 20), 3486784401);
    t.is(upow(3, 21), 0);
    t.is(upow(3, 30), 0);
    t.is(upow(5, -32478), 0);
    t.is(upow(5, 0), 1);
    t.is(upow(5, 2), 25);
    t.is(upow(5, 14), 0);
    t.is(upow(6, 11), 362797056);
    t.is(upow(6, 12), 2176782336);
    t.is(upow(6, 13), 0);
    t.is(upow(7, 0), 1);
    t.is(upow(7, 3), 343);
    t.is(upow(37, 9), 0);
    t.is(upow(6, 179), 0);
    t.is(upow(7, 190), 0);
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

test("umod", t => {
    t.is(umod(0, 5), 0);
    t.is(umod(4, 5), 4);
    t.is(umod(5, 5), 0);
    t.is(umod(6, 5), 1);
    t.is(umod(5.1, 5), 0);
    t.is(umod(-3, 5), 3);
    t.is(umod(-6, 5), 0);
    t.is(umod(0, -5), 0);
    t.is(umod(4, -5), 4);
    t.is(umod(5, -5), 5);
    t.is(umod(6, -5), 6);
    t.is(umod(5.1, -5), 5);
    t.is(umod(-3, -5), 2);
    t.is(umod(-6, -5), 4294967290);
});

test("uadd", t => {
    t.is(uadd(0, 0), 0);
    t.is(uadd(0, 21), 21);
    t.is(uadd(0, -21), 4294967275);
    t.is(uadd(1, 2), 3);
    t.is(uadd(3e9, 1), 3000000001);
    t.is(uadd(1e10, 1), 1410065409);
    t.is(uadd(123, 456), 579);
});

test("usub", t => {
    t.is(usub(0, 0), 0);
    t.is(usub(0, 21), 4294967275);
    t.is(usub(0, -21), 21);
    t.is(usub(1, 2), 0xffffffff);
    t.is(usub(1e10, 1), 1410065407);
    t.is(usub(3e9, 1), 2999999999);
    t.is(usub(579, 456), 123);
});

test("ult", t => {
    t.is(ult(0, 0), 0);
    t.is(ult(1, 0), 0);
    t.is(ult(-1, 0), 0);
    t.is(ult(6, 8), 1);
    t.is(ult(6, 6), 0);
    t.is(ult(6, 4), 0);
    t.is(ult(6, -2), 1);
    t.is(ult(-6, 2), 0);
    t.is(ult(-6, -2), 1);
    t.is(ult(-6, -6), 0);
    t.is(ult(-6, -7), 0);
    t.is(ult(-0x7fffffff, 15243), 0);
    t.is(ult(-0x80000000, 15243), 0);
    t.is(ult(-0x80000001, 15243), 0);
    t.is(ult(0x80000000, 15243), 0);
    t.is(ult(0x80000001, 15243), 0);
});

test("ulte", t => {
    t.is(ulte(0, 0), 1);
    t.is(ulte(1, 0), 0);
    t.is(ulte(-1, 0), 0);
    t.is(ulte(6, 8), 1);
    t.is(ulte(6, 6), 1);
    t.is(ulte(6, 4), 0);
    t.is(ulte(6, -2), 1);
    t.is(ulte(-6, 2), 0);
    t.is(ulte(-6, -2), 1);
    t.is(ulte(-6, -6), 1);
    t.is(ulte(-6, -7), 0);
    t.is(ulte(-0x7fffffff, 15243), 0);
    t.is(ulte(-0x80000000, 15243), 0);
    t.is(ulte(-0x80000001, 15243), 0);
    t.is(ulte(0x80000000, 15243), 0);
    t.is(ulte(0x80000001, 15243), 0);
});

test("ugt", t => {
    t.is(ugt(0, 0), 0);
    t.is(ugt(1, 0), 1);
    t.is(ugt(-1, 0), 1);
    t.is(ugt(6, 8), 0);
    t.is(ugt(6, 6), 0);
    t.is(ugt(6, 4), 1);
    t.is(ugt(6, -2), 0);
    t.is(ugt(-6, 2), 1);
    t.is(ugt(-6, -2), 0);
    t.is(ugt(-6, -6), 0);
    t.is(ugt(-6, -7), 1);
    t.is(ugt(-0x7fffffff, 15243), 1);
    t.is(ugt(-0x80000000, 15243), 1);
    t.is(ugt(-0x80000001, 15243), 1);
    t.is(ugt(0x80000000, 15243), 1);
    t.is(ugt(0x80000001, 15243), 1);
});

test("ugte", t => {
    t.is(ugte(0, 0), 1);
    t.is(ugte(1, 0), 1);
    t.is(ugte(-1, 0), 1);
    t.is(ugte(6, 8), 0);
    t.is(ugte(6, 6), 1);
    t.is(ugte(6, 4), 1);
    t.is(ugte(6, -2), 0);
    t.is(ugte(-6, 2), 1);
    t.is(ugte(-6, -2), 0);
    t.is(ugte(-6, -6), 1);
    t.is(ugte(-6, -7), 1);
    t.is(ugte(-0x7fffffff, 15243), 1);
    t.is(ugte(-0x80000000, 15243), 1);
    t.is(ugte(-0x80000001, 15243), 1);
    t.is(ugte(0x80000000, 15243), 1);
    t.is(ugte(0x80000001, 15243), 1);
});

test("ueq", t => {
    t.is(ueq(0, 0), 1);
    t.is(ueq(1, 0), 0);
    t.is(ueq(-1, 0), 0);
    t.is(ueq(6, 8), 0);
    t.is(ueq(6, 6), 1);
    t.is(ueq(6, 4), 0);
    t.is(ueq(6, -2), 0);
    t.is(ueq(-6, 2), 0);
    t.is(ueq(-6, -2), 0);
    t.is(ueq(-6, -6), 1);
    t.is(ueq(-6, -7), 0);
    t.is(ueq(-0x7fffffff, 0x80000000), 0);
    t.is(ueq(-0x7fffffff, 0x80000001), 1);
    t.is(ueq(0x80000000, -0x80000000), 1);
    t.is(ueq(0x100000000, 0), 1);
});

test("uneq", t => {
    t.is(uneq(0, 0), 0);
    t.is(uneq(1, 0), 1);
    t.is(uneq(-1, 0), 1);
    t.is(uneq(6, 8), 1);
    t.is(uneq(6, 6), 0);
    t.is(uneq(6, 4), 1);
    t.is(uneq(6, -2), 1);
    t.is(uneq(-6, 2), 1);
    t.is(uneq(-6, -2), 1);
    t.is(uneq(-6, -6), 0);
    t.is(uneq(-6, -7), 1);
    t.is(uneq(-0x7fffffff, 0x80000000), 1);
    t.is(uneq(-0x7fffffff, 0x80000001), 0);
    t.is(uneq(0x80000000, -0x80000000), 0);
    t.is(uneq(0x100000000, 0), 0);
});

test("uand", t => {
    t.is(uand(0, 0), 0);
    t.is(uand(0, 1), 0);
    t.is(uand(1, 1), 1);
    t.is(uand(-1, 1), 1);
    t.is(uand(-334, 423792), 423792);
    t.is(uand(0, 347829), 0);
    t.is(uand(0x80000000, 234782), 234782);
    t.is(uand(0x80000000, -324293), 4294643003);
    t.is(uand(-0x80000000, 32489), 32489);
    t.is(uand(0x100000000, 0), 0);
    t.is(uand(0x100000000, 234782), 0);
    t.is(uand(0x100000000, -324293), 0);
    t.is(uand(-0x100000000, 32489), 0);
    t.is(uand(0x100000001, 2431), 2431);
    t.is(uand(0x100000001, 0), 0);
    t.is(uand(1, 0x100000012), 0x12);
});

test("uor", t => {
    t.is(uor(0, 0), 0);
    t.is(uor(0, 1), 1);
    t.is(uor(1, 1), 1);
    t.is(uor(-1, 1), 0xffffffff);
    t.is(uor(-334, 423792), 4294966962);
    t.is(uor(0, 347829), 347829);
    t.is(uor(0x80000000, 234782), 0x80000000);
    t.is(uor(0x80000000, -324293), 0x80000000);
    t.is(uor(-0x80000000, 32489), 0x80000000);
    t.is(uor(0x100000000, 0), 0);
    t.is(uor(0x100000000, 234782), 234782);
    t.is(uor(0x100000000, -324293), 4294643003);
    t.is(uor(-0x100000000, 32489), 32489);
    t.is(uor(0x100000001, 2431), 1);
    t.is(uor(0x100000001, 0), 1);
    t.is(uor(1, 0x100000012), 1);
});