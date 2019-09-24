import {inot as unot} from "i32";

export function u32(value: number): number {
    return value >>> 0;
}

export {unot};

export function ucmp(value: number): number {
    return (~value) >>> 0;
}