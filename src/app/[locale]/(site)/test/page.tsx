import { Button } from "@/components/ui/button";
import GalleryDialog from "@/components/shared/gallery-dialog";

export default function Page() {
    return (
            <GalleryDialog
                trigger={<Button className="my-7" variant="outline">Open gallery</Button>}
                images={[
                    "/assets/images/image1.png",
                    "/assets/images/image2.png",
                    "/assets/images/image3.png",
                    "/assets/images/image4.png",
                ]}
            />
    )
}
