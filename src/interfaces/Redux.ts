export interface ActionWithPayLoad {
    type: string;
    payload: any;
}

export type DispatchWithPayload<ActionWithPayLoad> = (value: ActionWithPayLoad) => void;
