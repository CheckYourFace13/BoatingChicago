"use client";

import { useMemo, useState } from "react";
import { LocalOnlyForm } from "@/components/tools/PrintableWorksheet";
import {
  Field,
  NumberInput,
  ResultCard,
  ToolEngage,
  ToolPrintBar,
} from "@/components/tools/ToolChrome";
import { trackAnalyticsEvent } from "@/lib/analytics";
import {
  anchorRodeFeet,
  batteryRuntimeHours,
  calculateFuel,
  calculateOwnership,
  calculateTripTime,
  compareSlipQuotes,
  formatGallons,
  formatHours,
  formatMoney,
  knotsToMph,
  mphToKnots,
  nmToStatuteMiles,
  statuteMilesToNm,
  tongueWeightRange,
} from "@/lib/tools/formulas";

const inputClass =
  "w-full rounded-xl border border-sky-blue/30 px-3 py-2.5 text-lake-blue";

export function FuelCalculator() {
  const [distanceNm, setDistanceNm] = useState(18);
  const [speedKnots, setSpeedKnots] = useState(12);
  const [gph, setGph] = useState(6);
  const [price, setPrice] = useState(4.5);
  const [fees, setFees] = useState(0);
  const [roundTrip, setRoundTrip] = useState(true);
  const [reservePct, setReservePct] = useState(20);

  const result = useMemo(
    () =>
      calculateFuel({
        distanceNm,
        speedKnots,
        gallonsPerHour: gph,
        fuelPricePerGallon: price,
        otherFees: fees,
        roundTrip,
        reserveFraction: reservePct / 100,
      }),
    [distanceNm, speedKnots, gph, price, fees, roundTrip, reservePct],
  );

  return (
    <div>
      <ToolEngage tool="fuel" />
      <ToolPrintBar tool="fuel" />
      <LocalOnlyForm ariaLabel="Boat trip fuel calculator">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Charted distance (nautical miles)"
            hint="Use a measured route on a chart, not a straight line across land or shoals."
          >
            <NumberInput
              value={distanceNm}
              min={0}
              step="0.1"
              onChange={(e) => setDistanceNm(Number(e.target.value))}
            />
          </Field>
          <Field label="Cruising speed (knots)" hint="Your typical speed through the water, not GPS SOG in current.">
            <NumberInput
              value={speedKnots}
              min={0}
              step="0.1"
              onChange={(e) => setSpeedKnots(Number(e.target.value))}
            />
          </Field>
          <Field
            label="Measured gallons per hour"
            hint="From your engine log at that speed. Brochure GPH is often optimistic."
          >
            <NumberInput
              value={gph}
              min={0}
              step="0.1"
              onChange={(e) => setGph(Number(e.target.value))}
            />
          </Field>
          <Field label="Fuel price you will pay ($ / gallon)" hint="Enter the posted price. We never invent a Chicago fuel average.">
            <NumberInput
              value={price}
              min={0}
              step="0.01"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Field>
          <Field label="Other fees ($)" hint="Optional launch, lock, or dockage you already know.">
            <NumberInput
              value={fees}
              min={0}
              step="0.01"
              onChange={(e) => setFees(Number(e.target.value))}
            />
          </Field>
          <Field label="Reserve (% of underway burn)">
            <NumberInput
              value={reservePct}
              min={0}
              max={100}
              step="1"
              onChange={(e) => setReservePct(Number(e.target.value))}
            />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-lake-blue">
          <input
            type="checkbox"
            checked={roundTrip}
            onChange={(e) => setRoundTrip(e.target.checked)}
          />
          Round trip (double the charted distance)
        </label>
        <button
          type="button"
          className="sr-only"
          onClick={() => trackAnalyticsEvent("tool_calculate", { tool: "fuel" })}
        >
          Calculate
        </button>
      </LocalOnlyForm>
      {result ? (
        <div className="mt-6 space-y-3">
          <ResultCard
            title="Underway"
            items={[
              { label: "Distance used", value: `${result.legNm.toFixed(1)} nm` },
              { label: "Time underway", value: formatHours(result.underwayHours) },
            ]}
          />
          <ResultCard
            title="Fuel"
            items={[
              { label: "Gallons consumed", value: formatGallons(result.gallonsConsumed) },
              { label: "Reserve to keep aboard", value: formatGallons(result.reserveGallons) },
              { label: "Fuel needed aboard", value: formatGallons(result.gallonsToCarry) },
            ]}
          />
          <ResultCard
            title="Cost"
            items={[
              { label: "Fuel expenditure", value: formatMoney(result.fuelSpend) },
              { label: "Total with other fees", value: formatMoney(result.totalCost) },
            ]}
          />
          <p className="text-sm text-gray-600 leading-relaxed">
            Consumed fuel is what the trip burns. Fuel needed aboard is burn plus
            the reserve you chose. This is not a range, tank, or weather forecast.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Enter positive distance, speed, and GPH.</p>
      )}
    </div>
  );
}

export function OwnershipCalculator() {
  const [price, setPrice] = useState(35000);
  const [down, setDown] = useState(7000);
  const [years, setYears] = useState(10);
  const [apr, setApr] = useState(7.5);
  const [marina, setMarina] = useState(0);
  const [storage, setStorage] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [maint, setMaint] = useState(0);
  const [fuel, setFuel] = useState(0);
  const [other, setOther] = useState(0);

  const result = useMemo(
    () =>
      calculateOwnership({
        purchasePrice: price,
        downPayment: down,
        termYears: years,
        aprPct: apr,
        marinaAnnual: marina,
        winterStorageAnnual: storage,
        insuranceAnnual: insurance,
        maintenanceAnnual: maint,
        fuelAnnual: fuel,
        otherAnnual: other,
      }),
    [price, down, years, apr, marina, storage, insurance, maint, fuel, other],
  );

  return (
    <div>
      <ToolEngage tool="ownership-cost" />
      <ToolPrintBar tool="ownership-cost" />
      <LocalOnlyForm ariaLabel="Boat ownership cost calculator">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Purchase price ($)">
            <NumberInput value={price} min={0} onChange={(e) => setPrice(Number(e.target.value))} />
          </Field>
          <Field label="Down payment ($)">
            <NumberInput value={down} min={0} onChange={(e) => setDown(Number(e.target.value))} />
          </Field>
          <Field label="Loan term (years)">
            <NumberInput value={years} min={1} step="1" onChange={(e) => setYears(Number(e.target.value))} />
          </Field>
          <Field label="APR (%)" hint="From a written lender quote, not a guessed market rate.">
            <NumberInput value={apr} min={0} step="0.01" onChange={(e) => setApr(Number(e.target.value))} />
          </Field>
          <Field label="Marina / slip (annual $)">
            <NumberInput value={marina} min={0} onChange={(e) => setMarina(Number(e.target.value))} />
          </Field>
          <Field label="Winter storage (annual $)">
            <NumberInput value={storage} min={0} onChange={(e) => setStorage(Number(e.target.value))} />
          </Field>
          <Field label="Insurance (annual $)">
            <NumberInput value={insurance} min={0} onChange={(e) => setInsurance(Number(e.target.value))} />
          </Field>
          <Field label="Maintenance (annual $)">
            <NumberInput value={maint} min={0} onChange={(e) => setMaint(Number(e.target.value))} />
          </Field>
          <Field label="Fuel (annual $)">
            <NumberInput value={fuel} min={0} onChange={(e) => setFuel(Number(e.target.value))} />
          </Field>
          <Field label="Other (annual $)">
            <NumberInput value={other} min={0} onChange={(e) => setOther(Number(e.target.value))} />
          </Field>
        </div>
      </LocalOnlyForm>
      {result ? (
        <div className="mt-6 space-y-3">
          <ResultCard
            title="Loan"
            items={[
              { label: "Amount financed", value: formatMoney(result.amountFinanced) },
              { label: "Monthly loan payment", value: formatMoney(result.monthlyLoan) },
            ]}
          />
          <ResultCard
            title="Operating"
            items={[
              { label: "Annual operating", value: formatMoney(result.annualOperating) },
              { label: "Annual total (loan + ops)", value: formatMoney(result.annualTotal) },
              { label: "Monthly total", value: formatMoney(result.monthlyTotal) },
            ]}
          />
          <p className="text-sm text-gray-600">
            Payment uses a standard amortizing formula. Operating lines are exactly
            what you typed — zeros mean you have not entered that cost yet.
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Check that down payment is not larger than price and the term is positive.</p>
      )}
    </div>
  );
}

export function SlipCompareCalculator() {
  const empty = {
    name: "",
    seasonalRate: 0,
    monthsCovered: 6,
    lengthFeet: 30,
    rateIsPerFoot: false,
    addOns: 0,
  };
  const [rows, setRows] = useState([
    { ...empty, name: "Quote A" },
    { ...empty, name: "Quote B" },
  ]);

  const compared = useMemo(() => compareSlipQuotes(rows), [rows]);

  return (
    <div>
      <ToolEngage tool="slip-compare" />
      <ToolPrintBar tool="slip-compare" />
      <LocalOnlyForm ariaLabel="Slip and storage quote comparison">
        <div className="space-y-6">
          {rows.map((row, i) => (
            <fieldset key={i} className="rounded-2xl border border-sky-blue/20 p-4 space-y-3">
              <legend className="font-extrabold text-lake-blue px-1">Quote {i + 1}</legend>
              <Field label="Operator / marina name">
                <input
                  className={inputClass}
                  value={row.name}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...row, name: e.target.value };
                    setRows(next);
                  }}
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Quoted seasonal rate ($)">
                  <NumberInput
                    value={row.seasonalRate}
                    min={0}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...row, seasonalRate: Number(e.target.value) };
                      setRows(next);
                    }}
                  />
                </Field>
                <Field label="Boat length (ft)">
                  <NumberInput
                    value={row.lengthFeet}
                    min={0}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...row, lengthFeet: Number(e.target.value) };
                      setRows(next);
                    }}
                  />
                </Field>
                <Field label="Season length (months)">
                  <NumberInput
                    value={row.monthsCovered}
                    min={1}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...row, monthsCovered: Number(e.target.value) };
                      setRows(next);
                    }}
                  />
                </Field>
                <Field label="Add-on charges ($)">
                  <NumberInput
                    value={row.addOns}
                    min={0}
                    onChange={(e) => {
                      const next = [...rows];
                      next[i] = { ...row, addOns: Number(e.target.value) };
                      setRows(next);
                    }}
                  />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm font-semibold text-lake-blue">
                <input
                  type="checkbox"
                  checked={row.rateIsPerFoot}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...row, rateIsPerFoot: e.target.checked };
                    setRows(next);
                  }}
                />
                Rate is per foot of boat/slip length
              </label>
            </fieldset>
          ))}
        </div>
      </LocalOnlyForm>
      {compared.length > 0 ? (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-lake-blue">
                <th className="py-2 pr-4">Quote</th>
                <th className="py-2 pr-4">Season total</th>
                <th className="py-2 pr-4">Monthly equivalent</th>
                <th className="py-2">Per foot (season)</th>
              </tr>
            </thead>
            <tbody>
              {compared.map((row) => (
                <tr key={row.name} className="border-t border-sky-blue/20">
                  <td className="py-2 pr-4 font-semibold">{row.name}</td>
                  <td className="py-2 pr-4">{formatMoney(row.seasonTotal)}</td>
                  <td className="py-2 pr-4">{formatMoney(row.monthlyEquivalent)}</td>
                  <td className="py-2">
                    {row.perFootSeason == null ? "—" : formatMoney(row.perFootSeason)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Add names and the quotes you actually received.</p>
      )}
    </div>
  );
}

export function TripTimeCalculator() {
  const [distanceNm, setDistanceNm] = useState(14);
  const [speed, setSpeed] = useState(8);
  const [extra, setExtra] = useState(20);
  const result = useMemo(
    () => calculateTripTime({ distanceNm, speedKnots: speed, extraMinutes: extra }),
    [distanceNm, speed, extra],
  );

  return (
    <div>
      <ToolEngage tool="trip-time" />
      <ToolPrintBar tool="trip-time" />
      <LocalOnlyForm ariaLabel="Trip time calculator">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Route distance (nautical miles)"
            hint="Measure the intended channel or lake route. Do not use a straight line that crosses land, piers, or restricted areas."
          >
            <NumberInput value={distanceNm} min={0} step="0.1" onChange={(e) => setDistanceNm(Number(e.target.value))} />
          </Field>
          <Field label="Cruising speed (knots)">
            <NumberInput value={speed} min={0} step="0.1" onChange={(e) => setSpeed(Number(e.target.value))} />
          </Field>
          <Field label="Extra time (minutes)" hint="Locks, no-wake, fuel dock, or waiting weather — not part of the distance.">
            <NumberInput value={extra} min={0} onChange={(e) => setExtra(Number(e.target.value))} />
          </Field>
        </div>
      </LocalOnlyForm>
      {result ? (
        <div className="mt-6">
          <ResultCard
            title="Time"
            items={[
              { label: "Underway at cruising speed", value: formatHours(result.underwayHours) },
              { label: "Extra time", value: formatHours(result.extraHours) },
              { label: "Total planning time", value: formatHours(result.totalHours) },
            ]}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Enter a positive distance and speed.</p>
      )}
    </div>
  );
}

export function AnchorCalculator() {
  const [depth, setDepth] = useState(15);
  const [freeboard, setFreeboard] = useState(4);
  const [ratio, setRatio] = useState(7);
  const rode = anchorRodeFeet(depth, freeboard, ratio);

  return (
    <div>
      <ToolEngage tool="anchor-scope" />
      <ToolPrintBar tool="anchor-scope" />
      <LocalOnlyForm ariaLabel="Anchor scope planner">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Depth (ft)">
            <NumberInput value={depth} min={0} onChange={(e) => setDepth(Number(e.target.value))} />
          </Field>
          <Field label="Bow height / freeboard (ft)">
            <NumberInput value={freeboard} min={0} onChange={(e) => setFreeboard(Number(e.target.value))} />
          </Field>
          <Field label="Scope ratio" hint="Common planning ratios are 5:1 in settled weather and 7:1 more generally.">
            <NumberInput value={ratio} min={3} max={10} step="0.5" onChange={(e) => setRatio(Number(e.target.value))} />
          </Field>
        </div>
      </LocalOnlyForm>
      {rode != null ? (
        <div className="mt-6">
          <ResultCard
            title="Rode length"
            items={[{ label: "Minimum rode to put out", value: `${rode.toFixed(0)} ft` }]}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Use a ratio between 3:1 and 10:1.</p>
      )}
    </div>
  );
}

export function ConversionCalculator() {
  const [knots, setKnots] = useState(8);
  const [mph, setMph] = useState(knotsToMph(8));
  const [nm, setNm] = useState(10);
  const [mi, setMi] = useState(nmToStatuteMiles(10));

  return (
    <div>
      <ToolEngage tool="conversions" />
      <ToolPrintBar tool="conversions" />
      <LocalOnlyForm ariaLabel="Speed and distance conversions">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Knots">
            <NumberInput
              value={Number(knots.toFixed(2))}
              onChange={(e) => {
                const v = Number(e.target.value);
                setKnots(v);
                setMph(knotsToMph(v));
              }}
            />
          </Field>
          <Field label="Miles per hour">
            <NumberInput
              value={Number(mph.toFixed(2))}
              onChange={(e) => {
                const v = Number(e.target.value);
                setMph(v);
                setKnots(mphToKnots(v));
              }}
            />
          </Field>
          <Field label="Nautical miles">
            <NumberInput
              value={Number(nm.toFixed(2))}
              onChange={(e) => {
                const v = Number(e.target.value);
                setNm(v);
                setMi(nmToStatuteMiles(v));
              }}
            />
          </Field>
          <Field label="Statute miles">
            <NumberInput
              value={Number(mi.toFixed(2))}
              onChange={(e) => {
                const v = Number(e.target.value);
                setMi(v);
                setNm(statuteMilesToNm(v));
              }}
            />
          </Field>
        </div>
      </LocalOnlyForm>
      <p className="mt-4 text-sm text-gray-600">
        1 nautical mile = 1.15078 statute miles; 1 knot = 1 nautical mile per hour.
      </p>
    </div>
  );
}

export function TowingCalculator() {
  const [weight, setWeight] = useState(2500);
  const band = tongueWeightRange(weight);
  return (
    <div>
      <ToolEngage tool="towing" />
      <ToolPrintBar tool="towing" />
      <LocalOnlyForm ariaLabel="Trailer tongue weight band">
        <Field
          label="Gross trailer weight (lbs)"
          hint="Trailer plus boat and gear as you will tow it — not the hitch rating."
        >
          <NumberInput value={weight} min={0} onChange={(e) => setWeight(Number(e.target.value))} />
        </Field>
      </LocalOnlyForm>
      {band ? (
        <div className="mt-6">
          <ResultCard
            title="Planning band (10–15%)"
            items={[
              { label: "Lower (10%)", value: `${Math.round(band.low)} lb` },
              { label: "Upper (15%)", value: `${Math.round(band.high)} lb` },
            ]}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Enter a positive trailer weight.</p>
      )}
    </div>
  );
}

export function BatteryCalculator() {
  const [ah, setAh] = useState(100);
  const [volts, setVolts] = useState(12);
  const [load, setLoad] = useState(60);
  const [usable, setUsable] = useState(50);
  const hours = batteryRuntimeHours(ah, volts, load, usable / 100);

  return (
    <div>
      <ToolEngage tool="battery" />
      <ToolPrintBar tool="battery" />
      <LocalOnlyForm ariaLabel="Battery runtime estimator">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Battery capacity (amp-hours)">
            <NumberInput value={ah} min={0} onChange={(e) => setAh(Number(e.target.value))} />
          </Field>
          <Field label="System voltage">
            <NumberInput value={volts} min={0} onChange={(e) => setVolts(Number(e.target.value))} />
          </Field>
          <Field label="Load (watts)">
            <NumberInput value={load} min={0} onChange={(e) => setLoad(Number(e.target.value))} />
          </Field>
          <Field label="Usable capacity (%)" hint="Lead-acid banks are often planned around 50% depth of discharge; lithium can be higher if the maker allows it.">
            <NumberInput value={usable} min={1} max={100} onChange={(e) => setUsable(Number(e.target.value))} />
          </Field>
        </div>
      </LocalOnlyForm>
      {hours != null ? (
        <div className="mt-6">
          <ResultCard
            title="Estimated runtime"
            items={[{ label: "Hours at this load", value: formatHours(hours) }]}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Enter positive capacity, voltage, and load.</p>
      )}
    </div>
  );
}
