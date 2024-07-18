import {Country} from "./country.model";
import {ValidRegion} from "./region.type";

export interface CacheStoreInterface {
  byCapital: TermCounties;
  byCountry: TermCounties;
  byRegion: RegionCountries;
}

export interface TermCounties {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region?: ValidRegion;
  countries: Country[];
}
