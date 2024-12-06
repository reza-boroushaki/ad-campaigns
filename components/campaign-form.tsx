"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, convertDateToMilliseconds } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { addCampaigns } from "@/lib/actions";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  date: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    {
      message: "Start and end date is required",
    }
  ),
  impressions: z
    .string()
    .min(1, "Target impressions is required.")
    .default("")
    .refine((val) => !isNaN(Number(val)), { message: "Only numbers" }),
});

const CampaignForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      impressions: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { date, impressions } = FormSchema.parse(data);
      await addCampaigns({
        id: uuidv4(),
        startDate: convertDateToMilliseconds(date.from),
        endDate: convertDateToMilliseconds(date.to),
        targetImpressions: Number(impressions),
      });
      // revalidate cache to fetch the new campaign
      revalidatePath("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const issue of error.issues) {
          console.error("Validation failed: ", issue.message);
        }
      } else {
        console.error("Unexpected error: ", error);
      }
    }
  }

  return (
    <Card className="w-full sm:w-[350px] !mt-0">
      <CardHeader>
        <CardTitle>Add Campaign</CardTitle>
        <CardDescription>
          All fields are required for adding a campaign
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        // defaultMonth={formattedDate}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="impressions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Target impressions"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CampaignForm;
