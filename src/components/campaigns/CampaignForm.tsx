import React from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface CampaignFormProps {
  onSubmit?: (data: any) => void;
  initialData?: any;
  isOpen?: boolean;
}

const CampaignForm = ({
  onSubmit = () => {},
  initialData = {},
  isOpen = true,
}: CampaignFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialData,
  });

  const [date, setDate] = React.useState<Date>();

  return (
    <Card className="w-[640px] p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Create Campaign</h2>

          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              placeholder="Enter campaign name"
              {...register("name")}
            />
          </div>

          <div className="space-y-2">
            <Label>Message Template</Label>
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Template</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Campaign Schedule</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Daily Limits</Label>
            <Input
              type="number"
              placeholder="Enter daily message limit"
              {...register("dailyLimit")}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="random-delays" />
            <Label htmlFor="random-delays">Enable Random Delays</Label>
          </div>

          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              placeholder="Enter any additional notes or instructions"
              {...register("notes")}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Create Campaign</Button>
        </div>
      </form>
    </Card>
  );
};

export default CampaignForm;
