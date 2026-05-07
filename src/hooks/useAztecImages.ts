import { useState, useEffect } from "react";

const FEATURE_SERVER =
  "https://gis.aztecwww.com/server/rest/services/Hosted/The_Oaks_Filing_2_Parcels/FeatureServer/0";

export interface AztecImage {
  url: string;
  name: string;
}

export function useAztecImages(lat: number | null, lng: number | null) {
  const [images, setImages] = useState<AztecImage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lat == null || lng == null) return;

    let cancelled = false;

    async function run() {
      setLoading(true);
      setImages([]);

      try {
        // STEP 1: spatial query (THIS IS REQUIRED FOR YOUR HOTSPOT SYSTEM)
        const queryUrl =
          `${FEATURE_SERVER}/query` +
          `?geometry=${lng},${lat}` +
          `&geometryType=esriGeometryPoint` +
          `&spatialRel=esriSpatialRelIntersects` +
          `&distance=50` +
          `&units=feet` +
          `&outFields=OBJECTID` +
          `&returnGeometry=false` +
          `&f=json`;

        const res = await fetch(queryUrl);
        const data = await res.json();

        const objectIds =
          data?.features?.map((f: any) => f.attributes.OBJECTID) || [];

        if (!objectIds.length || cancelled) {
          setLoading(false);
          return;
        }

        // STEP 2: attachments
        const attachUrl =
          `${FEATURE_SERVER}/queryAttachments` +
          `?objectIds=${objectIds.join(",")}` +
          `&attachmentTypes=image/jpeg` +
          `&f=json`;

        const attachRes = await fetch(attachUrl);
        const attachData = await attachRes.json();

        if (cancelled) return;

        const imgs: AztecImage[] = [];

        for (const group of attachData?.attachmentGroups ?? []) {
          for (const att of group.attachmentInfos ?? []) {
            imgs.push({
              url: `${FEATURE_SERVER}/${group.parentObjectId}/attachments/${att.id}`,
              name: att.name,
            });
          }
        }

        setImages(imgs);
      } catch (err) {
        console.error("Image error:", err);
      } finally {
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  return { images, loading };
}