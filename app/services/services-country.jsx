export const countryService = {
  countryAll: "https://restcountries.com/v3.1/all",
  countryFilter: "https://restcountries.com/v3.1/name/",
  countryRegions: "https://restcountries.com/v3.1/region/",
};

export const getAllCountry = async () => {
  return fetch(countryService.countryAll).then((data) => data.json());
};

export const getCountryFilter = async (name) => {
  return fetch(`${countryService.countryFilter}${name}`).then((data) =>
    data.json()
  );
};

export const getCountryRegions = async (region) => {
  return fetch(`${countryService.countryRegions}${region}`).then((data) =>
    data.json()
  );
};
