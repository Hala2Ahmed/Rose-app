"use client";

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useTranslations } from "next-intl";
import MapPicker from "./map-picker";

export default function AddressLocationStep() {
    //Transition
    const t = useTranslations("address");

    //Form
    const form = useFormContext();
    const lat = form.watch("lat");
    const lng = form.watch("long");

    return (
        <div className="mt-4">
            <MapPicker
                lat={lat ? Number(lat) : undefined}
                lng={lng ? Number(lng) : undefined}
                onChange={(newLat, newLng) => {
                    form.setValue("lat", String(newLat), { shouldValidate: true });
                    form.setValue("long", String(newLng), { shouldValidate: true });
                }}
            />

            {/* ✅ lat */}
            <FormField
                control={form.control}
                name="lat"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="sr-only">Lat</FormLabel>
                        <FormControl>
                            <Input type="hidden"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* ✅ long */}
            <FormField
                control={form.control}
                name="long"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="sr-only">Lng</FormLabel>
                        <FormControl>
                            <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button
                className='w-full mt-11'
                type='submit'
            >
                {t("add-address")}
            </Button>
        </div>
    )
}
