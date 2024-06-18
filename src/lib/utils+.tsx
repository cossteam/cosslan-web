import utils from "@/lib/utils.ts";
import {AvatarFallback} from "@/components/ui/avatar.tsx";

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
