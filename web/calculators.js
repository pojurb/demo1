/**
 * calculators.js — Client-side Quantitative Finance Engine
 * Bound to window for zero-dependency local browser execution.
 */

// Formatting Utilities
function formatIDR(value) {
    if (value === null || value === undefined || isNaN(value)) return 'N/A';
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    
    let formatted = '';
    if (absValue >= 1e12) {
        formatted = `${(absValue / 1e12).toFixed(2)}T`;
    } else if (absValue >= 1e9) {
        formatted = `${(absValue / 1e9).toFixed(2)}B`;
    } else if (absValue >= 1e6) {
        formatted = `${(absValue / 1e6).toFixed(2)}M`;
    } else {
        formatted = absValue.toLocaleString('id-ID');
    }
    
    return `${isNegative ? '-' : '' }Rp ${formatted}`;
}

function formatNum(value, decimals = 2) {
    if (value === null || value === undefined || isNaN(value)) return '0';
    return Number(value).toLocaleString('id-ID', { 
        minimumFractionDigits: decimals, 
        maximumFractionDigits: decimals 
    });
}

// 1. Break-Even Point (BEP)
function calcBEP(fixed, price, variable) {
    const contribution = price - variable;
    const bepUnits = contribution > 0 ? fixed / contribution : 0;
    const bepRevenue = bepUnits * price;
    const marginPct = price > 0 ? (contribution / price) * 100 : 0;

    return {
        fixed,
        price,
        variable,
        contribution,
        marginPct,
        bepUnits,
        bepRevenue
    };
}

// 2. Internal Rate of Return (IRR)
function calcIRR(cashflows) {
    // Newton-Raphson IRR solver
    function npv(rate, cfs) {
        return cfs.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
    }

    function npvDerivative(rate, cfs) {
        return cfs.reduce((sum, cf, t) => sum - (t * cf) / Math.pow(1 + rate, t + 1), 0);
    }

    let rate = 0.1; // Initial guess
    let iterations = 0;
    const MAX_ITER = 1000;
    const TOLERANCE = 1e-7;

    for (let i = 0; i < MAX_ITER; i++) {
        const f = npv(rate, cashflows);
        const df = npvDerivative(rate, cashflows);
        if (Math.abs(df) < 1e-12) break;
        const newRate = rate - f / df;
        if (Math.abs(newRate - rate) < TOLERANCE) {
            rate = newRate;
            break;
        }
        rate = newRate;
    }

    const irrPct = rate * 100;
    const totalInvested = Math.abs(cashflows[0] || 0);
    const totalReturns = cashflows.slice(1).reduce((a, b) => a + b, 0);
    const npvAt15 = npv(0.15, cashflows);

    return {
        irr: irrPct,
        totalInvested,
        totalReturns,
        npvAt15,
        verdict: irrPct > 20 ? 'ABOVE 20% (Strong)' : irrPct > 15 ? 'Marginal (15-20%)' : 'BELOW 15% (Weak)'
    };
}

// 3. Customer Lifetime Value (LTV)
function calcLTV(arpu, margin, churn, cac = null) {
    const avgLifetime = churn > 0 ? 1 / churn : 0;
    const ltv = arpu * margin * avgLifetime;
    const ltvCacRatio = cac && cac > 0 ? ltv / cac : null;

    return {
        arpu,
        margin,
        churn,
        avgLifetime,
        ltv,
        cac,
        ltvCacRatio,
        verdict: ltvCacRatio ? (ltvCacRatio >= 5 ? 'STRONG (≥5x)' : ltvCacRatio >= 3 ? 'HEALTHY (3-5x)' : 'WEAK (<3x)') : null
    };
}

// 4. Customer Acquisition Cost (CAC) Payback
function calcCAC(cac, arpu, margin) {
    const monthlyContrib = arpu * margin;
    const paybackMonths = monthlyContrib > 0 ? cac / monthlyContrib : 0;
    const paybackYears = paybackMonths / 12;

    return {
        cac,
        arpu,
        margin,
        monthlyContrib,
        paybackMonths,
        paybackYears,
        verdict: paybackMonths <= 12 ? 'STRONG (≤12mo)' : paybackMonths <= 18 ? 'ACCEPTABLE (12-18mo)' : 'TOO LONG (>18mo)'
    };
}

// 5. Cash Runway
function calcRunway(cash, burn) {
    const runwayMonths = burn > 0 ? cash / burn : 0;
    
    // safe date calculation
    const safeDate = new Date();
    safeDate.setMonth(safeDate.getMonth() + Math.floor(runwayMonths));

    return {
        cash,
        burn,
        runwayMonths,
        safeDate,
        verdict: runwayMonths >= 18 ? 'SAFE (≥18mo)' : runwayMonths >= 12 ? 'WATCH (12-18mo)' : 'CRITICAL (<12mo)'
    };
}

// 6. Multiple on Invested Capital (MOIC)
function calcMOIC(exit, invested, years = null) {
    const moic = invested > 0 ? exit / invested : 0;
    let impliedIrr = null;

    if (years && years > 0 && moic > 0) {
        impliedIrr = (Math.pow(moic, 1 / years) - 1) * 100;
    }

    return {
        exit,
        invested,
        moic,
        years,
        impliedIrr,
        verdict: moic >= 3 ? 'STRONG (≥3x)' : moic >= 2 ? 'OK (2-3x)' : 'WEAK (<2x)'
    };
}

// 7. P/E Ratio
function calcPE(price, eps, pb = null, roe = null) {
    const pe = eps > 0 ? price / eps : 0;
    const earningsYield = pe > 0 ? (1 / pe) * 100 : 0;
    let peg = null;

    if (roe && roe > 0) {
        peg = pe / roe;
    }

    return {
        price,
        eps,
        pe,
        earningsYield,
        pb,
        roe,
        peg,
        verdict: pe < 13 ? 'DISCOUNT' : pe <= 15 ? 'MARKET' : 'PREMIUM'
    };
}

// 8. Discounted Cash Flow (DCF)
function calcDCF(cashflows, rate, terminalMult, invested = null) {
    const discounted = cashflows.map((cf, t) => cf / Math.pow(1 + rate, t + 1));
    const pvSum = discounted.reduce((a, b) => a + b, 0);
    const lastCF = cashflows[cashflows.length - 1] || 0;
    const terminalVal = (lastCF * terminalMult) / Math.pow(1 + rate, cashflows.length);
    const totalNPV = pvSum + terminalVal;

    let marginOfSafety = null;
    let verdict = null;

    if (invested && invested > 0) {
        marginOfSafety = ((totalNPV - invested) / totalNPV) * 100;
        verdict = totalNPV > invested ? 'NPV POSITIVE' : 'NPV NEGATIVE';
    }

    return {
        rate,
        terminalMult,
        pvSum,
        terminalVal,
        totalNPV,
        invested,
        marginOfSafety,
        verdict,
        discounted
    };
}

// 9. Black-Scholes Options Pricing
function calcBlackScholes(S, K, T, r, sigma) {
    function cdf(x) {
        const a1 =  0.254829592;
        const a2 = -0.284496736;
        const a3 =  1.421413741;
        const a4 = -1.453152027;
        const a5 =  1.061405429;
        const p  =  0.3275911;

        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x) / Math.sqrt(2);

        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

        return 0.5 * (1.0 + sign * y);
    }

    function pdf(x) {
        return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    }

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const callPrice = S * cdf(d1) - K * Math.exp(-r * T) * cdf(d2);
    const putPrice  = K * Math.exp(-r * T) * cdf(-d2) - S * cdf(-d1);

    const sqrtT = Math.sqrt(T);
    const expRT = Math.exp(-r * T);

    const delta_call = cdf(d1);
    const delta_put  = cdf(d1) - 1;
    const gamma      = pdf(d1) / (S * sigma * sqrtT);
    
    const theta_call = -(S * pdf(d1) * sigma / (2 * sqrtT)) - r * K * expRT * cdf(d2);
    const theta_put  = -(S * pdf(d1) * sigma / (2 * sqrtT)) + r * K * expRT * cdf(-d2);
    const theta_call_daily = theta_call / 365;
    const theta_put_daily  = theta_put / 365;

    const vega       = S * pdf(d1) * sqrtT / 100;
    const rho_call   = K * T * expRT * cdf(d2)  / 100;
    const rho_put    = -K * T * expRT * cdf(-d2) / 100;

    return {
        d1, d2,
        callPrice, putPrice,
        deltaCall: delta_call,
        deltaPut: delta_put,
        gamma,
        thetaCallDaily: theta_call_daily,
        thetaPutDaily: theta_put_daily,
        vega,
        rhoCall: rho_call,
        rhoPut: rho_put,
        moneyness: S > K ? 'ITM (In The Money)' : S < K ? 'OTM (Out of The Money)' : 'ATM (At The Money)'
    };
}

// Bind to window object
window.calculators = {
    calcBEP, calcIRR, calcLTV, calcCAC, calcRunway, calcMOIC, calcPE, calcDCF, calcBlackScholes,
    formatIDR, formatNum
};
