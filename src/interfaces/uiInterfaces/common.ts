export interface ISecureInputFieldProps {
  name: string,
  value: string,
  placeholder: string,
  className?: string,
  onChange: (value: any) => void,
  onBlur?: (value: any) => void
}

export interface ISpinnerProps {
  fullscreen?: true
}