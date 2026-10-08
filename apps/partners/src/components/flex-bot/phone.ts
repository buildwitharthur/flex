export const digitsOnly = (value: string) => value.replace(/\D/g, '')

// Mesma regra da API: 10 a 13 dígitos.
export const isValidPhone = (value: string) => {
  const length = digitsOnly(value).length
  return length >= 10 && length <= 13
}

export function formatPhone(value: string) {
  const digits = digitsOnly(value)
  const hasCountry = digits.length > 11
  const local = hasCountry ? digits.slice(2) : digits
  const prefix = hasCountry ? `+${digits.slice(0, 2)} ` : ''

  if (local.length === 11) {
    return `${prefix}(${local.slice(0, 2)}) ${local.slice(2, 7)}-${local.slice(7)}`
  }
  if (local.length === 10) {
    return `${prefix}(${local.slice(0, 2)}) ${local.slice(2, 6)}-${local.slice(6)}`
  }
  return digits
}
