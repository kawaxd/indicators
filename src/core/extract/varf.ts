

/**
 * 
 * @param source 
 * @param period 
 * @param size 
 * @returns 
 */
export async function varf(
    source: Array<number>, period: number,
    size: number = source.length
) {

    const output: Array<number> = []

    const scale = 1.0 / period

    // if (period < 1) throw new Error("Invalid Options")
    // if (size <= period - 1) throw new Error("Out of range")

    let sum = 0
    let sum2 = 0

    for (let i = 0; i < period; ++i) {
        sum += source[i]
        sum2 += source[i] * source[i]
    }

    output.push(sum2 * scale - (sum * scale) * (sum * scale))

    for (let i = period; i < size; ++i) {
        sum += source[i]
        sum2 += source[i] * source[i]

        sum -= source[i - period]
        sum2 -= source[i - period] * source[i - period]

        output.push(sum2 * scale - (sum * scale) * (sum * scale))
    }

    return output
}