import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SingleStat = ({
  data,
  className,
}: {
  data: number;
  className: string;
}) => {
  return (
    <Card className={`${className} h-full`}>
      <CardHeader>
        <CardTitle>Overal Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full text-5xl font-bold">
        <p>{data}</p>
      </CardContent>
    </Card>
  );
};

export default SingleStat;
