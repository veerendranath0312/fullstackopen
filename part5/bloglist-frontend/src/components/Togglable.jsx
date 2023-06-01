import React from 'react'

const Togglable = React.forwardRef((props, refs) => {
  const [visible, setVisible] = React.useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible)
  }

  React.useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="btn" onClick={toggleVisibility}>
          create new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
})

export default Togglable
