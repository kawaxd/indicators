import { Indicators, IndicatorsNormalized } from "../src"
import { Data } from "./data"

const ta = new Indicators()
const tan = new IndicatorsNormalized()

// Extract OHLCV
const open: number[] = []
const high: number[] = []
const low: number[] = []
const close: number[] = []
const volume: number[] = []

for (let index = 0; index < Data.length; index++) {
    const obj = Data[index]
    open.push(obj.open)
    high.push(obj.high)
    low.push(obj.low)
    close.push(obj.close)
    volume.push(obj.volume)
}

class Helper {
    constructor(private array: number[]) {}

    // Last N(3) Members
    lastN(n: number): this {
        if (n >= this.array.length) {
            return this
        } else {
            this.array = this.array.slice(this.array.length - n)
            return this
        }
    }

    // Last N(3) in Reverse Order
    lastNReverse(n: number): this {
        if (n >= this.array.length) {
            this.array = this.array.slice().reverse()
            return this
        } else {
            this.array = this.array.slice(this.array.length - n).reverse()
            return this
        }
    }

    // Precision
    removeFloat(precision: number): this {
        this.array = this.array.map((num) => parseFloat(num.toFixed(precision)))
        return this
    }

    getResult(): number[] {
        return this.array
    }
}

// ################################# Test
describe('Indicators', () => {

    it("Bollinger Bands Lower ::: bbands 20, 2", async () => {
        const indicator = await ta.bbands(close, 20, 2)
        const result = new Helper(indicator[0]).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([0.07562, 0.07561, 0.07559])
    })

    it("Bollinger Bands Middle ::: bbands 20, 2", async () => {
        const indicator = await ta.bbands(close, 20, 2)
        const result = new Helper(indicator[1]).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([0.07604, 0.07602, 0.07601])
    })

    it("Bollinger Bands Upper ::: bbands 20, 2", async () => {
        const indicator = await ta.bbands(close, 20, 2)
        const result = new Helper(indicator[2]).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([0.07646, 0.07644, 0.07643])
    })


    it("Average True Range ::: atr 14", async () => {
        const indicator = await ta.atr(high, low, close, 14)
        const result = new Helper(indicator).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([0.00021, 0.00022, 0.00023])
    })

    it("Commodity Channel Index ::: cci 20", async () => {
        const indicator = await ta.cci(high ,low, close, 20)
        const result = new Helper(indicator).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([55.33649, 53.82779, 70.93023])
    })
    
    it("Exponential Moving Average ::: ema 10", async () => {
        const indicator = await ta.ema(close, 10)
        const result = new Helper(indicator).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([0.07615, 0.07614, 0.07614])
    })

    it("Hull Moving Average ::: hma 10", async () => {
        const indicator = await ta.hma(close, 10)
        const result = new Helper(indicator).lastNReverse(3).removeFloat(5).getResult()
        expect(result).toEqual([0.07620, 0.07620, 0.07620])
    })
})