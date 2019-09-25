import {imul, inot as unot} from "i32";

export function u32(value: number): number {
    return value >>> 0;
}

export {unot};

export function ucmp(value: number): number {
    return (~value) >>> 0;
}

export function umul(a: number, b: number): number {
    return imul(a >>> 0, b >>> 0) >>> 0;
}

export function udiv(a: number, b: number): number {
    return ((a >>> 0) / (b >>> 0)) >>> 0;
}