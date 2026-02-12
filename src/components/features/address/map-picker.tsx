"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Props = {
    lat?: number;
    lng?: number;
    onChange: (lat: number, lng: number) => void;
};

const containerStyle = { width: "100%", height: "320px" };

const defaultCenter = { lat: 31.9522, lng: 35.2332 };

export default function MapPicker({ lat, lng, onChange }: Props) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    const center = lat != null && lng != null ? { lat, lng } : defaultCenter;

    if (!isLoaded) return <div className="h-80 rounded-md bg-muted" />;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onClick={(e) => {
                const newLat = e.latLng?.lat();
                const newLng = e.latLng?.lng();
                if (newLat != null && newLng != null) onChange(newLat, newLng);
            }}
            options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            {lat != null && lng != null && (
                <Marker
                    position={{ lat, lng }}
                    draggable
                    onDragEnd={(e) => {
                        const newLat = e.latLng?.lat();
                        const newLng = e.latLng?.lng();
                        if (newLat != null && newLng != null) onChange(newLat, newLng);
                    }}
                />
            )}
        </GoogleMap>
    );
}
