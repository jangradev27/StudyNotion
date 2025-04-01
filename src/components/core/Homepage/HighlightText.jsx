import PropTypes from "prop-types"


const HighlightText = (props) => {
  return (
    <span className="font-semibold bg-gradient-to-b from-cyan-600 to-cyan-200 bg-clip-text text-transparent">
        {" "}
        {props.text}
    </span>
  )
}

HighlightText.propTypes = {
    text: PropTypes.string
}

export default HighlightText