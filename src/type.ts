export enum InputType {
    text = "text",
    password = "password",
    email = "email",
    number = "number",
    date = "date",
    time = "time",
    datetime = "datetime",
    search = "search",
    tel = "tel",
    url = "url",
    month = "month",
    week = "week",
    select = "select",
}

export type Option = {
    value: string;
    text: string;
}
