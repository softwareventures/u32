import {fold} from "@softwareventures/array";
import {imul, inot as unot} from "i32";

export function u32(value: number): number {
    return value >>> 0;
}

export {unot};

export function ucmp(value: number): number {
    return (~value) >>> 0;
}

export function upow(a: number, b: number): number {
    // Adapted from https://stackoverflow.com/a/101613/31662
    let base = a >>> 0;
    let exp = b >>> 0;

    if (base === 1) {
        return 1;
    }

    if (exp >= 32) {
        return 0;
    }

    if (base === 2) {
        return (1 << exp) >>> 0;
    }

    let accumulator = 1;
    while (true) {
        if (exp & 1) {
            const next = umul(accumulator, base);
            if ((accumulator > 0xffff || base > 0xffff) && udiv(next, accumulator) !== base) {
                return 0;
            }
            accumulator = next;
        }
        exp = exp >>> 1;
        if (exp === 0) {
            return accumulator;
        }
        if (base > 0xffff) {
            return 0;
        }
        base = umul(base, base);
    }
}

export function umul(a: number, b: number): number {
    return imul(a >>> 0, b >>> 0) >>> 0;
}

export function uproduct(...values: number[]): number {
    return fold(values, umul, 1);
}

export function udiv(a: number, b: number): number {
    return ((a >>> 0) / (b >>> 0)) >>> 0;
}

export function umod(a: number, b: number): number {
    return ((a >>> 0) % (b >>> 0)) >>> 0;
}

export function uadd(a: number, b: number): number {
    return ((a >>> 0) + (b >>> 0)) >>> 0;
}

export function usum(...values: number[]): number {
    return fold(values, uadd, 0);
}

export function usub(a: number, b: number): number {
    return ((a >>> 0) - (b >>> 0)) >>> 0;
}

export function ushl(a: number, b: number): number {
    return (a << b) >>> 0;
}

export function ushr(a: number, b: number): number {
    return a >>> b;
}

export function ult(a: number, b: number): number {
    return (((a >>> 0) < (b >>> 0)) as any) >>> 0;
}

export function ulte(a: number, b: number): number {
    return (((a >>> 0) <= (b >>> 0)) as any) >>> 0;
}