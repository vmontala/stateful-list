interface Filters {
  [key: string]: string
}

export default function useFilters(defaultFilters: Filters = {}) {
  const route = useRoute()
  const router = useRouter()

  const initialFilters = { ...defaultFilters }

  let persistTimeout: ReturnType<typeof setTimeout> = 0

  const query: Filters = Object.entries(route.query).reduce((filtered, [key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(initialFilters, key)) {
      return filtered
    }

    return {
      ...filtered,
      [key]: value,
    }
  }, {})

  const values = ref({
    ...initialFilters,
    ...query,
  })

  // Persists the filters to the URL query string
  const persistFilters = (filters: Filters) => {
    clearTimeout(persistTimeout)

    // Exclude any filters that do not have a value
    const filteredQuery = Object.entries(filters).reduce((filteredFilters, [key, value]) => {
      if (Array.isArray(value) && !value.length) {
        return filteredFilters
      }

      if (value === '' || initialFilters[key] === value) {
        return filteredFilters
      }

      return {
        ...filteredFilters,
        [key]: Array.isArray(value) ? JSON.stringify(value) : value,
      }
    }, {})

    // Filters are not immediately persisted as they can change rapidly
    persistTimeout = setTimeout(() => router.replace({ query: filteredQuery }), 100)
  }

  persistFilters(values.value)

  // Whenever the filters change
  watch(values, (newFilters: Filters) => persistFilters(newFilters), { deep: true })

  return {
    values,
  }
}
