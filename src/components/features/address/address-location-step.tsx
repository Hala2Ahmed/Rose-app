"use client";

import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { APIProvider, Map, AdvancedMarker, MapMouseEvent } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import type { AddressFields } from "@/lib/types/addresses";

const DEFAULT_CENTER = { lat: 30.0444, lng: 31.2357 };

type Props = {
    editingAddressId?: string | null;
    isPending: boolean;
};

export default function AddressLocationStep({ isPending, editingAddressId }: Props) {
    // Form context
    const form = useFormContext<AddressFields>();
    const latStr = form.watch("lat");
    const lngStr = form.watch("long");

    // Variables
    const initialCenter = useMemo(() => {
        const lat = Number(latStr);
        const lng = Number(lngStr);
        if (Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0) return { lat, lng };
        return DEFAULT_CENTER;
    }, [latStr, lngStr]);

    //States
    const [cameraProps, setCameraProps] = useState({
        center: initialCenter,
        zoom: 14,
    });

    //variables
    const setLocation = useCallback(
        (lat: number, lng: number) => {
            form.setValue("lat", String(lat), { shouldValidate: true, shouldDirty: true });
            form.setValue("long", String(lng), { shouldValidate: true, shouldDirty: true });
            setCameraProps((prev) => ({ ...prev, center: { lat, lng } }));
        },
        [form]
    );

    // Functions
    const handleMapClick = useCallback(
        (e: MapMouseEvent) => {
            if (!e.detail.latLng) return;
            setLocation(e.detail.latLng.lat, e.detail.latLng.lng);
        },
        [setLocation]
    );

    const handleCameraChange = useCallback(
        (ev: { detail: { center: { lat: number; lng: number }; zoom: number } }) => {
            setCameraProps({ center: ev.detail.center, zoom: ev.detail.zoom });
        },
        []
    );

    const selectedLocation = useMemo(() => {
        const lat = Number(latStr);
        const lng = Number(lngStr);
        if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat === 0) return null;
        return { lat, lng };
    }, [latStr, lngStr]);

    return (
        <>
            <div className="relative h-[349px] rounded-xl overflow-hidden my-4 border border-gray-200 dark:border-zinc-600">
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
                    <Map
                        style={{ width: "100%", height: "100%" }}
                        {...cameraProps}
                        onCameraChanged={handleCameraChange}
                        onClick={handleMapClick}
                        gestureHandling="greedy"
                        disableDefaultUI={false}
                        mapId="DEMO_MAP_ID"
                    >
                        {selectedLocation && <AdvancedMarker position={selectedLocation} />}
                    </Map>
                </APIProvider>
            </div>

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-lg"
            >
                {isPending ? "saving" : editingAddressId ? "update" : "add"}
            </Button>
        </>
    );
}