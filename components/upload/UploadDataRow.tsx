import { NextPage } from 'next'
import AmazonIconContainer from '../shared/amazon-icon-container'
import MoreDotsIconActionContainer from '../shared/more-dots-icon-action-container'
import CheckboxAction from './CheckboxAction'

interface UploadDataRowProps {
  dataType: string
  value: string
  purchasedDate: string
  uploadedDate: string
  description: string
  onSelect: (isSelected: boolean) => void
  isChecked: boolean
}

const UploadDataRow: NextPage<UploadDataRowProps> = ({
  dataType,
  value,
  purchasedDate,
  uploadedDate,
  description,
  onSelect,
  isChecked
}) => {
  const handleCheckboxChange = () => {
    onSelect(!isChecked)
  }

  return (
    <div className='self-stretch rounded-mini flex flex-row items-start justify-start py-3 px-6 gap-[31px] text-left text-xs text-white-1 font-kumbh-sans'>
      <div className='self-stretch flex flex-row items-start justify-start'>
        <CheckboxAction
          boxSizing='border-box'
          isChecked={isChecked} // pass isChecked state
          handleCheckboxChange={handleCheckboxChange} // pass handleCheckboxChange function
        />
      </div>
      <div className='flex-1 overflow-hidden flex flex-row items-center justify-start py-0 pr-[7px] pl-0'>
        <div className='overflow-hidden flex flex-row items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[20px] max-w-[500px] text-left text-xs text-white-0 font-kumbh-sans flex-1'>
          <AmazonIconContainer
            amazonIconContainerFlexShrink='0'
            amazonIconContainerWidth='46px'
            amazonIconContainerHeight='46px'
          />
          <div className='flex-1 overflow-hidden flex flex-col items-start justify-center gap-[5px]'>
            <div className='relative font-semibold'>{dataType}</div>
            <div className='self-stretch relative text-white-1'>
              {description}
            </div>
          </div>
        </div>
      </div>
      <div className='w-[333px] flex flex-row items-center justify-between'>
        <div className='relative inline-block w-[70px] shrink-0'>{value}</div>
        <div className='relative inline-block w-[90px] shrink-0'>
          {purchasedDate}
        </div>
        <div className='relative inline-block w-[90px] shrink-0'>
          {uploadedDate}
        </div>
        <MoreDotsIconActionContainer moreDotsIconActionContainBoxSizing='border-box' />
      </div>
    </div>
  )
}

export default UploadDataRow