import {Loader2} from "lucide-react";

const Loading = () => {
    return <div className="fixed top-0 left-0 bottom-0 right-0 z-50 flex items-center justify-center">
      <Loader2 className="h-5 w-5 animate-spin"/>
    </div>
}

export default Loading
