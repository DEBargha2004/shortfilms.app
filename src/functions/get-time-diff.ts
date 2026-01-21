import { type TimeUnit } from "@/types/time-unit";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  differenceInSeconds,
} from "date-fns";

export default function getTimeDifference(
  dataLeft: string | number | Date,
  dataRight: string | number | Date,
  unit: TimeUnit
) {
  switch (unit) {
    case "second":
      return differenceInSeconds(dataLeft, dataRight);
      break;
    case "minute":
      return differenceInMinutes(dataLeft, dataRight);
      break;
    case "hour":
      return differenceInHours(dataLeft, dataRight);
      break;
    case "day":
      return differenceInDays(dataLeft, dataRight);
      break;
    case "week":
      return differenceInWeeks(dataLeft, dataRight);
      break;
    case "month":
      return differenceInMonths(dataLeft, dataRight);
      break;
    case "year":
      return differenceInYears(dataLeft, dataRight);
      break;
    default:
      return differenceInSeconds(dataLeft, dataRight);
      break;
  }
}
