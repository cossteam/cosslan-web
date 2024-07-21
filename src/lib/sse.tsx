import {ApiUrl} from "@/api";

export type SSEAttributes = {
  url: string;                                // url
  event?: string;                             // 监听事件
  events?: string[];                          // 监听事件
  onMessage: (event: SSEMessage) => void;     // 消息回调
  onOpen?: () => void;                        // 连接成功回调
  keepAlive?: boolean;                        // default: true, 保持连接
  killRepeat?: boolean;                       // default: true, 杀死重复连接
  expired?: number;                           // default: 30 (seconds), 消息超时时间，超过此时间没有消息则重连
  debug?: boolean;                            // default: true, 显示调试信息
}

export type SSEMessage = {
  id: string;
  data: any;
  event: string;
}

export class SSEClass {
  readonly #attributes: SSEAttributes;
  #source: EventSource | null = null;

  #time: number = 0;
  #inter: NodeJS.Timeout | null = null;

  constructor(attributes: SSEAttributes | string) {
    // 初始化参数
    if (typeof attributes === "string") {
      attributes = {
        url: attributes,
        onMessage: () => {
        }
      };
    }
    this.#attributes = Object.assign({
      keepAlive: true,
      killRepeat: true,
      expired: 30,
      debug: false,
    }, attributes);

    // 关闭重复连接
    if (this.#attributes.killRepeat) {
      SSE.remove(this.#attributes.url);
    }

    // 连接
    this.#connect();
  }

  #log(...args: any[]) {
    if (this.#attributes.debug) {
      if (args.length === 0) {
        console.groupCollapsed("[SSE]", new Date().toLocaleString());
        console.log(this.#attributes);
      } else {
        console.groupCollapsed("[SSE]", new Date().toLocaleString(), args[0]);
        console.log(this.#attributes);
        console.log(...args);
      }
      console.groupEnd();
    }
  }

  #events(): string[] {
    const events = this.#attributes.events || [];
    if (this.#attributes.event && !events.includes(this.#attributes.event)) {
      events.push(this.#attributes.event)
    }
    if (events.length === 0) {
      events.push("message")
    }
    return events;
  }

  #onmessage = (message: MessageEvent) => {
    this.#log("onmessage", message);

    const {lastEventId, type} = message;
    let data = message.data;
    if (/^\{/.test(data)) {
      const parseData = JSON.parse(data);
      if (Object.keys(parseData).length > 0) {
        data = parseData;
      }
    }
    this.#attributes.onMessage({
      id: lastEventId,
      data: data,
      event: type,
    });

    this.#time = Date.now();
  }

  #connect() {
    this.#log("connect");

    // 处理超时
    this.#time = Date.now();
    this.#inter && clearInterval(this.#inter);
    const expired = this.#attributes.expired || 0;
    if (expired > 0) {
      this.#inter = setInterval(() => {
        if (Date.now() - this.#time > expired * 1000) {
          this.#inter && clearInterval(this.#inter);
          this.#log("expired");
          this.#close();
        }
      }, Math.min(5000, expired * 1000));
    }

    // 开始连接
    this.#source = new EventSource(ApiUrl(this.#attributes.url));
    this.#source.onopen = () => {
      this.#log("open");
      this.#attributes.onOpen && this.#attributes.onOpen();
    };
    this.#source.onerror = () => {
      this.#log("error");
      this.#close();
    };
    this.#events().forEach((event) => {
      this.#source?.addEventListener(event, this.#onmessage)
    })

    // 添加到全局
    SSE.add(this.#attributes.url, this);
  }

  #close() {
    this.#log("close");

    // 清理关闭
    this.#events().forEach((event) => {
      this.#source?.removeEventListener(event, this.#onmessage)
    })
    this.#source?.close()
    this.#source = null;

    // 保持连接
    if (this.#attributes.keepAlive) {
      setTimeout(() => {
        this.#connect()
      }, 1000)
    }
  }

  remove() {
    this.#log("remove");
    this.#attributes.keepAlive = false;
    this.#close();
  }
}

export const SSE = {
  sseMap: new Map<string, SSEClass>(),

  create(attributes: SSEAttributes | string) {
    return new SSEClass(attributes);
  },

  add(url: string, sse: SSEClass) {
    this.sseMap.set(url, sse);
  },

  remove(url: string) {
    const sse = this.sseMap.get(url);
    if (sse) {
      sse.remove();
    }
    this.sseMap.delete(url);
  }
}
