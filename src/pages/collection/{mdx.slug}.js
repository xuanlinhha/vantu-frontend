import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const BlogPost = ( {data} ) => {
  const updated = data.mdx.frontmatter.updated_date ? <span className='condensed-font text-secondary'> Updated: {data.mdx.frontmatter.updated_date}</span>:''
  return (
    <div className='container'>
      <div className='row pb-sm-2 mb-sm-2'>
        <h3 className='mixed-font'>{data.mdx.frontmatter.title}</h3>
        <div className='condensed-font text-secondary pb-1'>
          Date: {data.mdx.frontmatter.date} <span className='px-2'>|</span> {updated}
        </div>
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </div>
    </div>
  )
}

export const query = graphql`
query ($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
      date
      updated_date
    }
    body
  }
}
`

export default BlogPost
