import {inot as unot} from "i32";

export {unot};

export function ucmp(value: number): number {
    return (~value) >>> 0;
}