export type SelectInput<T = string> = {
  label: string,
  value: T,
  icon?: string,
  disable?: boolean,
  html?: boolean,
  description?: string,
}
