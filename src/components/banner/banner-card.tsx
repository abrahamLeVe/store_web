import { Card, CardContent } from "@/components/ui/card";

interface BannerCardProps {
  url: string;
  title: string;
  isVideo: boolean;
}

export function BannerCard({ url, title, isVideo }: BannerCardProps) {
  return (
    <div className="p-1">
      <Card>
        <CardContent className="p-6 max-h-[550px] overflow-hidden">
          {isVideo ? (
            <video
              src={url}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <img src={url} alt={title} className="w-full h-full object-cover" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
