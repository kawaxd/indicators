

/**
 * 
 * @param source 
 * @param period 
 * @param size
 * @returns 
 */
export async function lag(
    source: Array<number>, period: number,
    size: number = source.length
) {

    const output: Array<number> = []

    // if (period < 0) throw new Error("Invalid Options")
    // if (size <= period) throw new Error("Out of range")

    for (let i = period; i < size; ++i) {
        output.push(source[i - period])
    }

    return output
}