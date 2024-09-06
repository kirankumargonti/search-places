import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react'
import SearchBox from './components/SearchBox/SearchBox'
import Table from './components/Table/Table'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Pagination from './components/Pagination/Pagination'
import LimitInput from './components/LimitInput/LimitInput'
import {fetchCities} from './util/api'
import {City} from './types/city'
import useDebounce from './hooks/useDebounce'
import './App.css'

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalCount, setTotalCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [error, setError] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const debouncedLimit = useDebounce(limit, 300)

  const fetchData = useCallback(async () => {
    if (debouncedSearchTerm) {
      setLoading(true)
      try {
        const response = await fetchCities(
          debouncedSearchTerm,
          debouncedLimit,
          (currentPage - 1) * debouncedLimit
        )
        setCities(response.data)
        setTotalCount(response.metadata.totalCount)
        setError('')
      } catch (error) {
        console.error('Error fetching cities:', error)
        setCities([])
        setTotalCount(0)
        setError('Failed to fetch cities. Please try again.')
      } finally {
        setLoading(false)
      }
    } else {
      setCities([])
      setTotalCount(0)
    }
  }, [debouncedSearchTerm, debouncedLimit, currentPage])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchData()
  }

  const memoizedCities = useMemo(() => cities, [cities])

  const setLimitWithValidation = useCallback(
    (newLimit: number) => {
      setLimit(newLimit)
      if (itemsPerPage > newLimit) {
        setItemsPerPage(newLimit)
        setError(
          `Items per page has been adjusted to ${newLimit} to match the new limit.`
        )
      }
    },
    [itemsPerPage]
  )

  const setItemsPerPageWithValidation = useCallback(
    (newItemsPerPage: number) => {
      if (newItemsPerPage > limit) {
        setItemsPerPage(limit)
        setError(`Items per page cannot exceed the current limit (${limit}).`)
      } else {
        setItemsPerPage(newItemsPerPage)
      }
    },
    [limit]
  )

  return (
    <ErrorBoundary>
      <div className='app'>
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmit={handleSearch}
          inputRef={searchInputRef}
        />

        {error && <div className='error-message'>{error}</div>}

        <div className='app-content'>
          <Table
            cities={memoizedCities}
            loading={loading}
            itemsPerPage={itemsPerPage}
            searchTerm={searchTerm}
            currentPage={currentPage}
          />
          <div className='bottom-controls'>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <div className='right-controls'>
              <LimitInput
                value={limit}
                setValue={setLimitWithValidation}
                label='Limit'
                max={10}
                setError={setError}
                defaultValue={5}
                triggerUpdate={fetchData}
              />
              <LimitInput
                value={itemsPerPage}
                setValue={setItemsPerPageWithValidation}
                label='Items per page'
                max={limit}
                setError={setError}
                defaultValue={3}
              />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
