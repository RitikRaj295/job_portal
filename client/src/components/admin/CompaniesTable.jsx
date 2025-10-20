import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter(company => {
        if (!searchCompanyByText) return true
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <Table>
        <TableCaption className="text-gray-600 text-sm mt-3">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="text-center font-semibold">Logo</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="text-right font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map(company => (
            <TableRow
              key={company._id}
              className="hover:bg-blue-50 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <TableCell className="text-center">
                <Avatar className="w-10 h-10 border border-gray-200 shadow-sm">
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-gray-800">{company.name}</TableCell>
              <TableCell className="text-gray-500">{company.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded-full hover:bg-gray-200 transition">
                    <MoreHorizontal className="text-gray-600" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white border border-gray-200 shadow-lg rounded-lg p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-blue-50 transition cursor-pointer"
                    >
                      <Edit2 className="w-4 text-blue-600" />
                      <span className="text-gray-800 font-medium text-sm">Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
