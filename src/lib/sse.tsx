import utils from "@/lib/utils.ts";
import {ApiUrl} from "@/api";

export type SSEOptions = {
  debug?: boolean;
  retry?: number | boolean;
  interval?: number;
}

export type SSECallback = (type: string, event: MessageEvent) => void;

export class SSEClient {
  url: any;
  es: EventSource | null;
  options: SSEOptions;
  timer: NodeJS.Timeout | null;

  defaultOptions: SSEOptions = {
    debug: true,
    interval: 3 * 1000,
    retry: 5,
  }

  constructor(url: any, options: SSEOptions | undefined = undefined) {
    if (options == undefined) {
      options = this.defaultOptions;
    }
    this.url = url;
    this.es = null;
    this.options = Object.assign({}, this.defaultOptions, options);
    this.timer = null;
  }

  _onOpen() {
    return () => {
      if (this.options.debug) {
        console.log("SSE open: " + this.url);
      }
    };
  }

  _onMessage(type: any, handler: SSECallback) {
    return (event: any) => {
      if (typeof handler === "function") {
        handler(type, event);
      }
    };
  }

  _onError(type: any, handler: SSECallback) {
    return () => {
      if (this.options.debug) {
        console.log("SSE retry: " + this.url);
      }
      if (this.es) {
        this._removeAllEvent(type, handler);
        this.unsubscribe();
      }

      if (typeof this.options.retry === "number") {
        if (this.options.retry <= 0) {
          return
        }
        this.options.retry--;
      } else if (!this.options.retry) {
        return
      }
      this.timer = setTimeout(() => {
        this.subscribe(type, handler);
      }, this.options.interval);
    };
  }

  _removeAllEvent(type: any, handler: SSECallback) {
    type = utils.isArray(type) ? type : [type]
    this.es?.removeEventListener("open", this._onOpen());
    this.es?.removeEventListener("error", this._onError(type, handler));
    type.some((item: any) => {
      this.es?.removeEventListener(item, this._onMessage(item, handler));
    })
  }

  subscribe(type: any, handler: SSECallback) {
    type = utils.isArray(type) ? type : [type]
    this.es = new EventSource(ApiUrl(this.url));
    this.es.addEventListener("open", this._onOpen());
    this.es.addEventListener("error", this._onError(type, handler));
    type.some((item: any) => {
      this.es?.addEventListener(item, this._onMessage(item, handler));
    })
  }

  unsubscribe() {
    if (this.es) {
      this.es.close();
      this.es = null;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.options.debug) {
      console.log("SSE cancel: " + this.url);
    }
  }
}
