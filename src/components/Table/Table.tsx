import React from 'react'
import './Table.css'
import {City} from '../../types/city'

interface TableProps {
  cities: City[]
  loading: boolean
  itemsPerPage: number
  searchTerm: string
  currentPage: number
}

const Table: React.FC<TableProps> = React.memo(
  ({cities, loading, itemsPerPage, searchTerm, currentPage}) => {
    const displayedCities = cities.slice(0, itemsPerPage)

    return (
      <div className='table-container'>
        {loading && (
          <div className='spinner-container'>
            <div className='spinner'></div>
          </div>
        )}
        {cities.length === 0 && searchTerm && (
          <div className='no-results'>No result found</div>
        )}
        {cities.length === 0 && !searchTerm && (
          <div className='start-searching'>Start searching</div>
        )}
        {cities.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Place Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {displayedCities.map((city, index) => (
                  <tr key={city.id}>
                    <td data-label="#">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td data-label="Place Name">{city.name}</td>
                    <td data-label="Country">
                      <img
                        src={`https://flagsapi.com/${city.countryCode}/flat/64.png`}
                        alt={`${city.country} flag`}
                        width='24'
                        height='24'
                      />
                      {city.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {displayedCities.length < cities.length && (
              <div className='table-footer'>
                Showing {displayedCities.length} of {cities.length} results
              </div>
            )}
          </>
        )}
      </div>
    )
  }
)

export default Table
