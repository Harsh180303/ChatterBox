import { useEffect } from "react"
import debounce from 'lodash.debounce'
import { useState } from "react"

const useDebouncedInput = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = debounce(() => setDebouncedValue(value), delay)
        handler()

        return () => handler.cancel()
    }, [value, delay])

    return debouncedValue
}

export default useDebouncedInput