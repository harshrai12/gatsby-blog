const path = require('path');
exports.createPages = ({boundActionCreators,graphql}) => {
 const{createPage} = boundActionCreators
 const postTemplate = path.resolve('src/templates/blog posts.js');

 return graphql(`
 {
  allMarkdownRemark{
   edges{
     node{
      html
      id
       frontmatter{
         path
         title
         date
         author
       }
      
     }
   }
 }
 }`).then(res =>{
  if(res.error){
   return Promise.reject(res.error)
  }
  res.data.allMarkdownRemark.edges.forEach(({node})=>{
   createPage({
    path: node.frontmatter.path,
    component:postTemplate
   })
  })
 })

}