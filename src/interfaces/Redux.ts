export interface ActionWithPayLoad {
    type: string;
    payload?: any;
}

export type DispatchWithPayload<ActionWithPayLoad> = (value: ActionWithPayLoad) => void;

export type MiddlewareFunction = (store: any) => (next: any) => (action: any) => any;
