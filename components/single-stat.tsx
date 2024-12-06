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
  title,
  className,
}: {
  data: number | string;
  title: string;
  className?: string;
}) => {
  return (
    <Card className={`${className} h-full`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full text-5xl font-bold">
        <p>{data}</p>
      </CardContent>
    </Card>
  );
};

export default SingleStat;
