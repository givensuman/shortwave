export default function useCountryCode(code: string) {
      return code.toUpperCase().replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0))
  )
}