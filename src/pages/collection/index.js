import * as React from 'react'
import { graphql, Link } from 'gatsby'

export default function Collection({ data }) {
  const divs = data.allMdx.nodes.map(node => {
    return (
      <div key={node.id} className='col-sm-3'>
        <Link to={`/collection/${node.slug}`} className='mixed-font'>
          {node.frontmatter.title}
        </Link>
        
      </div>
    )
  })
  return (
    <div className='container'>
      <div className='row'>
        {divs}
      </div>
    </div>
  )
}

export const query = graphql`
query {
  allMdx {
    nodes {
      id
      slug
      frontmatter {
        title
      }
    }
  }
}
`