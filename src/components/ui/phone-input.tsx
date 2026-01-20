"use client";

    //  Imports
import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/tailwind-merge";

/* =========================
   Types
========================= */
type Status = "default" | "error" | "disabled";

interface PhoneInputProps
  extends
    Omit<React.ComponentProps<"input">, "onChange" | "value" | "ref">,
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> {
  onChange?: (value: RPNInput.Value) => void;
  status?: Status;
}

/* =========================
   Phone Input Component
========================= */
const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(
  (
    {
      className,
      onChange,
      value,
      defaultCountry,
      status = "default",
      ...props
    },
    ref,
  ) => {
    const InputWithStatus = React.useMemo(
      () =>
        React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
          (props, ref) => (
            <InputComponent {...props} ref={ref} status={status} />
          ),
        ),
      [status],
    );

    const CountrySelectWithStatus = React.useMemo(
      () => (props: any) => <CountrySelect {...props} status={status} />,
      [status],
    );

    return (
      <div
        className={cn(
          "group flex items-center w-full h-11 rounded-xl border transition-all duration-200",
          "bg-white dark:bg-zinc-700 ",

          status === "default" && [
            "border-zinc-300 dark:border-zinc-700",
            "focus-within:ring-2 focus-within:ring-maroon-100 focus-within:border-maroon-600",
            "dark:focus-within:ring-softpink-400/20 dark:focus-within:border-softpink-400",
          ],

          status === "error" &&
            "border-red-600 ring-2 ring-red-100 dark:ring-red-900/30",

          status === "disabled" &&
            "bg-zinc-50 opacity-60 cursor-not-allowed dark:bg-zinc-800",

          className,
        )}
      >
        <RPNInput.default
          ref={ref}
          className="flex w-full h-full items-center"
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelectWithStatus}
          inputComponent={InputWithStatus}
          smartCaret={false}
          value={value || undefined}
          defaultCountry={defaultCountry}
          onChange={(v) => onChange?.(v || ("" as RPNInput.Value))}
          {...props}
        />
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

/* =========================
   Input Field
========================= */
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { status?: Status }
>(({ className, status, ...props }, ref) => (
  <Input
    ref={ref}
    disabled={status === "disabled"}
    className={cn(
      "h-full w-full border-none bg-transparent px-3 text-sm   ",
      "focus-visible:ring-0 focus-visible:ring-offset-0 dark:focus-visible:ring-0",
      "placeholder:text-zinc-400",
      "text-zinc-800 dark:text-zinc-200 ",
      "disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
));

InputComponent.displayName = "InputComponent";

/* =========================
   Country Select Dropdown
========================= */
type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: { label: string; value: RPNInput.Country | undefined }[];
  onChange: (country: RPNInput.Country) => void;
  status?: Status;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  status,
}: CountrySelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const countryLabel = selectedCountry
    ? `${selectedCountry} (+${RPNInput.getCountryCallingCode(selectedCountry)})`
    : "";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          disabled={disabled || status === "disabled"}
          className={cn(
            "flex items-center gap-2 h-full px-3 ",
            "bg-transparent transition-none",
            "hover:bg-transparent",
            "focus-visible:ring-0 focus-visible:outline-none",
            "dark:bg-zinc-700 dark:text-zinc-50",
          )}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />

          <span
            className={cn(
              "text-xs font-medium whitespace-nowrap",
              status === "error"
                ? "text-red-600"
                : "text-gray-950 dark:text-zinc-50",
            )}
          >
            {countryLabel}
          </span>

          <ChevronsUpDown className="h-3.5 w-3.5 text-gray-950 dark:text-zinc-50 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[300px] p-0 shadow-xl border-zinc-200 dark:border-zinc-800"
      >
        <Command>
          <CommandInput placeholder="Search country..." className="h-10" />

          <CommandList>
            <ScrollArea className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>

              <CommandGroup>
                {countryList.map(
                  ({ value, label }) =>
                    value && (
                      <CommandItem
                        key={value}
                        className="gap-2 cursor-pointer"
                        onSelect={() => {
                          setIsOpen(false);
                          if (onChange) onChange(value);
                        }}
                      >
                        <FlagComponent country={value} countryName={label} />

                        <span className="flex-1 text-sm truncate">{label}</span>

                        <span className="text-xs text-zinc-400">
                          +{RPNInput.getCountryCallingCode(value)}
                        </span>

                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4 text-maroon-600 transition-opacity",
                            value === selectedCountry
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ),
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/* =========================
   Country Flag
========================= */
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-5 w-5 items-center justify-center shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-700">
      {Flag ? (
        <Flag title={countryName} className="h-6 w-6 object-cover" />
      ) : (
        <span className="bg-zinc-200 w-full h-full" />
      )}
    </span>
  );
};

/* =========================
   Export
========================= */
export { PhoneInput };
