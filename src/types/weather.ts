export type BoatingConditionLevel = "Good" | "Caution" | "Poor";

export interface WeatherSourceRef {
  name: string;
  url: string;
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  severity: string;
  urgency: string;
  description: string;
  instruction: string | null;
  onset: string | null;
  ends: string | null;
  isMarine: boolean;
  sourceUrl: string;
}

export interface HourlyForecastPeriod {
  startTime: string;
  temperatureF: number | null;
  windSpeedMph: number | null;
  windGustMph: number | null;
  windDirection: string | null;
  shortForecast: string | null;
  precipProbabilityPct: number | null;
  isDaytime: boolean;
}

export interface DailyForecastPeriod {
  name: string;
  startTime: string;
  isDaytime: boolean;
  temperatureF: number | null;
  windSpeed: string | null;
  windDirection: string | null;
  shortForecast: string | null;
  detailedForecast: string | null;
  precipProbabilityPct: number | null;
}

export interface CurrentConditions {
  observedAt: string | null;
  stationId: string;
  stationName: string | null;
  temperatureF: number | null;
  feelsLikeF: number | null;
  description: string | null;
  windSpeedMph: number | null;
  windGustMph: number | null;
  windDirectionDeg: number | null;
  windDirectionCardinal: string | null;
  humidityPct: number | null;
  visibilityMiles: number | null;
  precipLastHourIn: number | null;
}

export interface LakeConditionsData {
  waterTempF: number | null;
  waveHeightFt: number | null;
  buoyId: string | null;
  observedAt: string | null;
  notes: string | null;
}

export interface BoatingConditionRating {
  level: BoatingConditionLevel;
  reason: string;
  factors: string[];
}

export interface ChicagoWeatherPayload {
  fetchedAt: string;
  /** Weather location id from src/config/weather-locations.ts */
  locationId: string;
  locationLabel: string;
  current: CurrentConditions | null;
  hourly: HourlyForecastPeriod[];
  daily: DailyForecastPeriod[];
  alerts: WeatherAlert[];
  lake: LakeConditionsData;
  sunriseIso: string | null;
  sunsetIso: string | null;
  marineForecastText: string | null;
  /** Caveat shown with the marine product when it is not local to the selected location */
  marineForecastLabel: string | null;
  rating: BoatingConditionRating;
  sources: WeatherSourceRef[];
  errors: string[];
}
