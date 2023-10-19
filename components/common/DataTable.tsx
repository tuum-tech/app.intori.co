import { NextPage } from 'next'
import { useState } from 'react'
import DataRow from '../common/DataRow'
import CheckboxAction from '../upload/CheckboxAction'

type CredTableProps = {
  title: string
  titleContainers?: JSX.Element[]
  isCredentialType?: boolean
  dataRows?: any[]
  isSelectable?: boolean
}

const CredTable: NextPage<CredTableProps> = ({
  title,
  titleContainers,
  isCredentialType,
  dataRows = [],
  isSelectable
}) => {
  const [allSelected, setAllSelected] = useState(false)
  const [selectedRows, setSelectedRows] = useState<{ [key: string]: boolean }>(
    {}
  )

  const handleRowSelect = (isSelected: boolean, id: string) => {
    setSelectedRows((prevSelected) => ({ ...prevSelected, [id]: isSelected }))
  }

  const handleSelectAll = () => {
    const newAllSelected = !allSelected
    setAllSelected(newAllSelected)

    const newSelectedRows = {}
    dataRows.forEach((row) => (newSelectedRows[row.id] = newAllSelected))
    setSelectedRows(newSelectedRows)
  }

  return (
    <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-xs text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4 Small_Tablet:hidden'>
      <div className='self-stretch h-14 flex flex-row items-center justify-start py-0 pr-0 pl-6 box-border gap-[20px] text-left text-xs text-white-1 font-kumbh-sans'>
        <div className='self-stretch flex-1 flex flex-row items-center justify-start text-left text-3xl text-white-0 font-kumbh-sans Small_Tablet:flex'>
          <h1 className='m-0 relative text-inherit font-semibold font-inherit Small_Tablet:flex'>
            {title}
          </h1>
        </div>
        {titleContainers}
      </div>
      <div className='self-stretch rounded-mini bg-black-2 flex flex-row items-center justify-start py-0 px-6 gap-[31px] text-left text-xs text-grey-1 font-kumbh-sans'>
        {isSelectable && (
          <CheckboxAction
            boxSizing='border-box'
            isChecked={allSelected}
            handleCheckboxChange={handleSelectAll}
          />
        )}

        <div className='flex-1 h-6 overflow-hidden flex flex-row items-center justify-start py-0 pr-[7px] pl-0 box-border'>
          <div className='relative font-semibold'>
            {isCredentialType ? 'Credential' : 'Data'} Type
          </div>
        </div>
        <div className='w-[333px] flex flex-row items-center justify-between Small_Tablet:flex'>
          <div className='relative font-semibold inline-block w-[70px] shrink-0'>
            Value
          </div>
          <div className='relative font-semibold inline-block w-[90px] shrink-0'>
            {isCredentialType ? 'Issued' : 'Purchased'}
          </div>
          <div className='relative font-semibold inline-block w-[90px] shrink-0'>
            {isCredentialType ? 'Expire' : 'Uploaded'}
          </div>
          <div className='rounded-mini' />;
        </div>
      </div>

      <div className='self-stretch flex flex-col items-start justify-start gap-[15px] text-center text-xs text-white-0 font-kumbh-sans'>
        {dataRows.map((row) => (
          <DataRow
            key={row.id}
            credentialOrDataType={row.credentialOrDataType}
            value={row.value}
            issuedOrPurchasedDate={row.issuedOrPurchasedDate}
            expireOrUploadedDate={row.expireOrUploadedDate}
            description={row.description}
            isSelectable={isSelectable}
            onSelect={(isSelected) => handleRowSelect(isSelected, row.id)}
            isChecked={selectedRows[row.id] || false}
          />
        ))}
      </div>
    </div>
  )
}

export default CredTable