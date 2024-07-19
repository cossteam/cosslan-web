import utils from "@/lib/utils.ts";
import {AvatarFallback} from "@/components/ui/avatar.tsx";
import {useEffect, useState} from "react";

export function AvatarFallbackByName({name = ''}) {
  return (
    <AvatarFallback style={
      {
        backgroundColor: utils.generateColorByName(name)
      }
    }
    >{utils.abbreviatedName(name)}</AvatarFallback>
  )
}

export function SecondDiff(date: any) {
  const timestamp = new Date(date).getTime();
  const [timeLeft, setTimeLeft] = useState(Date.now() - timestamp);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Date.now() - timestamp);
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return Math.round(timeLeft / 1000)
}
