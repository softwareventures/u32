import test from "ava";
import {unot} from "./index";

test("unot", t => {
    t.is(unot(0), 1);
    t.is(unot(1), 0);
    t.is(unot(-1), 0);
    t.is(unot(342), 0);
    t.is(unot(-342), 0);
});