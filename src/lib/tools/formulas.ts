/**
 * Transparent recreational-planning formulas.
 * None of these are a navigation, engineering, or financial product.
 */

function num(value: number): number {
  return Number.isFinite(value) ? value : NaN;
}

export interface FuelInputs {
  distanceNm: number;
  speedKnots: number;
  gallonsPerHour: number;
  fuelPricePerGallon: number;
  otherFees: number;
  roundTrip: boolean;
  /** Extra fuel to keep aboard as a fraction of underway burn (e.g. 0.2 = 20%). */
  reserveFraction: number;
}

export interface FuelResult {
  legNm: number;
  underwayHours: number;
  gallonsConsumed: number;
  gallonsToCarry: number;
  fuelSpend: number;
  totalCost: number;
  reserveGallons: number;
}

export function calculateFuel(input: FuelInputs): FuelResult | null {
  const distanceNm = num(input.distanceNm);
  const speedKnots = num(input.speedKnots);
  const gph = num(input.gallonsPerHour);
  const price = num(input.fuelPricePerGallon);
  const fees = num(input.otherFees) || 0;
  const reserve = num(input.reserveFraction);
  if (distanceNm <= 0 || speedKnots <= 0 || gph <= 0 || price < 0) return null;
  if (reserve < 0 || reserve > 1) return null;

  const legNm = input.roundTrip ? distanceNm * 2 : distanceNm;
  const underwayHours = legNm / speedKnots;
  const gallonsConsumed = gph * underwayHours;
  const reserveGallons = gallonsConsumed * reserve;
  const gallonsToCarry = gallonsConsumed + reserveGallons;
  const fuelSpend = gallonsConsumed * price;
  return {
    legNm,
    underwayHours,
    gallonsConsumed,
    gallonsToCarry,
    fuelSpend,
    totalCost: fuelSpend + fees,
    reserveGallons,
  };
}

/** Standard amortizing loan payment. */
export function monthlyLoanPayment(
  principal: number,
  annualRatePct: number,
  termMonths: number,
): number | null {
  const P = num(principal);
  const n = num(termMonths);
  const r = num(annualRatePct) / 100 / 12;
  if (P < 0 || n <= 0 || !Number.isInteger(n) || annualRatePct < 0) return null;
  if (r === 0) return P / n;
  return (P * r) / (1 - Math.pow(1 + r, -n));
}

export interface OwnershipInputs {
  purchasePrice: number;
  downPayment: number;
  termYears: number;
  aprPct: number;
  marinaAnnual: number;
  winterStorageAnnual: number;
  insuranceAnnual: number;
  maintenanceAnnual: number;
  fuelAnnual: number;
  otherAnnual: number;
}

export interface OwnershipResult {
  amountFinanced: number;
  monthlyLoan: number;
  annualLoan: number;
  annualOperating: number;
  annualTotal: number;
  monthlyTotal: number;
}

export function calculateOwnership(input: OwnershipInputs): OwnershipResult | null {
  const price = num(input.purchasePrice);
  const down = num(input.downPayment);
  const years = num(input.termYears);
  if (price < 0 || down < 0 || down > price || years <= 0) return null;
  const termMonths = Math.round(years * 12);
  const financed = price - down;
  const monthlyLoan =
    financed === 0
      ? 0
      : monthlyLoanPayment(financed, input.aprPct, termMonths);
  if (monthlyLoan == null || Number.isNaN(monthlyLoan)) return null;

  const ops = [
    input.marinaAnnual,
    input.winterStorageAnnual,
    input.insuranceAnnual,
    input.maintenanceAnnual,
    input.fuelAnnual,
    input.otherAnnual,
  ].map((v) => num(v) || 0);
  if (ops.some((v) => v < 0)) return null;
  const annualOperating = ops.reduce((a, b) => a + b, 0);
  const annualLoan = monthlyLoan * 12;
  const annualTotal = annualLoan + annualOperating;
  return {
    amountFinanced: financed,
    monthlyLoan,
    annualLoan,
    annualOperating,
    annualTotal,
    monthlyTotal: annualTotal / 12,
  };
}

export interface SlipQuote {
  name: string;
  seasonalRate: number;
  monthsCovered: number;
  lengthFeet: number;
  rateIsPerFoot: boolean;
  addOns: number;
}

export interface SlipCompareRow {
  name: string;
  seasonTotal: number;
  monthlyEquivalent: number;
  perFootSeason: number | null;
}

export function compareSlipQuotes(quotes: SlipQuote[]): SlipCompareRow[] {
  return quotes
    .filter((q) => q.name.trim() && num(q.seasonalRate) >= 0 && num(q.monthsCovered) > 0)
    .map((q) => {
      const length = num(q.lengthFeet);
      const base = q.rateIsPerFoot && length > 0 ? q.seasonalRate * length : q.seasonalRate;
      const seasonTotal = base + (num(q.addOns) || 0);
      const months = num(q.monthsCovered);
      return {
        name: q.name.trim(),
        seasonTotal,
        monthlyEquivalent: seasonTotal / months,
        perFootSeason: length > 0 ? seasonTotal / length : null,
      };
    });
}

export interface TripTimeInputs {
  distanceNm: number;
  speedKnots: number;
  extraMinutes: number;
}

export interface TripTimeResult {
  underwayHours: number;
  extraHours: number;
  totalHours: number;
}

export function calculateTripTime(input: TripTimeInputs): TripTimeResult | null {
  const d = num(input.distanceNm);
  const s = num(input.speedKnots);
  const extra = num(input.extraMinutes) || 0;
  if (d <= 0 || s <= 0 || extra < 0) return null;
  const underwayHours = d / s;
  const extraHours = extra / 60;
  return {
    underwayHours,
    extraHours,
    totalHours: underwayHours + extraHours,
  };
}

/** Scope = ratio × depth. Common planning ratios are 5:1 (calm) to 7:1 (typical). */
export function anchorRodeFeet(depthFeet: number, extraFreeboardFeet: number, ratio: number): number | null {
  const depth = num(depthFeet);
  const extra = num(extraFreeboardFeet) || 0;
  const r = num(ratio);
  if (depth <= 0 || extra < 0 || r < 3 || r > 10) return null;
  return (depth + extra) * r;
}

export function knotsToMph(knots: number): number {
  return num(knots) * 1.15078;
}

export function mphToKnots(mph: number): number {
  return num(mph) / 1.15078;
}

export function nmToStatuteMiles(nm: number): number {
  return num(nm) * 1.15078;
}

export function statuteMilesToNm(mi: number): number {
  return num(mi) / 1.15078;
}

/**
 * Tongue-weight planning band as a fraction of trailer + load weight.
 * Typical published range is about 10–15% of GTW — not a rating plate.
 */
export function tongueWeightRange(grossTrailerWeightLbs: number): { low: number; high: number } | null {
  const w = num(grossTrailerWeightLbs);
  if (w <= 0) return null;
  return { low: w * 0.1, high: w * 0.15 };
}

/** Runtime hours = usable watt-hours / load watts. */
export function batteryRuntimeHours(
  ampHours: number,
  voltage: number,
  loadWatts: number,
  usableFraction: number,
): number | null {
  const ah = num(ampHours);
  const v = num(voltage);
  const load = num(loadWatts);
  const usable = num(usableFraction);
  if (ah <= 0 || v <= 0 || load <= 0 || usable <= 0 || usable > 1) return null;
  return (ah * v * usable) / load;
}

export function formatHours(hours: number): string {
  if (!Number.isFinite(hours)) return "—";
  const totalMin = Math.round(hours * 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

export function formatGallons(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(1)} gal`;
}
