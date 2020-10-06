//  This file is the 'wrapper' for all of the content rendered on the page
import React from 'react'
import Footer from '../Footer/Footer'

const Layout = props => (
  <div>
    <h1>leet hints: for when you need a hint</h1>

    {/* props.children, is the content between the opening and closing tag of
    the layout element you're using */}
    {props.children}

    <Footer />
  </div>
)

export default Layout
