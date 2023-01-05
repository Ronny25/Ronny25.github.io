export type InputOnInputEvent<T> = InputEvent & {
    currentTarget: T;
    target: globalThis.Element;
};

export type InputOnChangeEvent<T> = Event & {
    currentTarget: T;
    target: globalThis.Element;
};
