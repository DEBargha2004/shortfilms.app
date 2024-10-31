import { forwardRef, HTMLProps, useState } from "react";
import {
  type CountryCallingCode,
  type E164Number,
  getExampleNumber,
  isValidPhoneNumber as matchIsValidPhoneNumber,
  parsePhoneNumber,
} from "libphonenumber-js";
import i18nIsoCountries from "i18n-iso-countries";
import enCountries from "i18n-iso-countries/langs/en.json";
import PhoneInput, { type Country } from "react-phone-number-input/input";
import examples from "libphonenumber-js/mobile/examples";
import { Input } from "../ui/input";

import { ComboboxCountryInput } from "./phone-input-combobox";
import {
  getCountriesOptions,
  isoToEmoji,
  replaceNumbersWithZeros,
} from "@/lib/phone-input-helpers";

type CountryOption = {
  value: Country;
  label: string;
  indicatif: CountryCallingCode;
};

i18nIsoCountries.registerLocale(enCountries);

const InputPhone = forwardRef<
  HTMLInputElement,
  {
    value: string | undefined;
    onChange: (value: string | undefined) => void;
  }
>(({ value, onChange }, ref) => {
  const options = getCountriesOptions();

  // You can use a the country of the phone number to set the default country
  const defaultCountry = parsePhoneNumber("+911234567890")?.country;
  const defaultCountryOption = options.find(
    (option) => option.value === defaultCountry,
  );

  const [country, setCountry] = useState<CountryOption>(
    defaultCountryOption || options[0]!,
  );

  const placeholder = replaceNumbersWithZeros(
    getExampleNumber(country.value, examples)!.formatInternational(),
  );

  const onCountryChange = (value: CountryOption) => {
    onChange(undefined);
    setCountry(value);
  };

  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <div className="flex gap-2">
        <ComboboxCountryInput
          value={country}
          onValueChange={onCountryChange}
          options={options}
          placeholder="Find your country..."
          renderOption={({ option }) =>
            `${isoToEmoji(option.value)} ${option.label}`
          }
          renderValue={(option) => option.label}
          emptyMessage="No country found."
        />
        <PhoneInput
          international
          withCountryCallingCode
          country={country.value.toUpperCase() as Country}
          inputComponent={Input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
        />
      </div>
    </div>
  );
});

InputPhone.displayName = "InputPhone";

export { InputPhone };
