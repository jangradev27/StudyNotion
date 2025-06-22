import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active, linkTo}) => {
  return (
    <button className='w-fit'>
        <Link to={linkTo}>
            <div className={`text-center text-[16px] px-6 py-3 rounded-md font-semibold
                ${active ? 'bg-yellow-50 text-black' : 'bg-rich-black-800'} hover:scale-95 transition-all duration-200 shadow-sm shadow-rich-black-600`}>
                {children}
            </div>
        </Link>
    </button>
  )
}

CTAButton.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    linkTo: PropTypes.string
}

export default CTAButton