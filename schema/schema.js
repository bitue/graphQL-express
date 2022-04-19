const graphql = require('graphql');
const {GraphQLString , GraphQLType, GraphQLSchema, GraphQLInt} = graphql ;
const _ = require('lodash');



//dummy data here 

const booksData =[
    {id:"2" , name:"Love for imperfect thing", genre:"self-motivated", authorHook:"1"},
    {id:"1" , name:"No reason of love", genre:"self-motivated", authorHook:"2"},
    {id:"3" , name:"The thing you can see only when you slow down", genre:"self-motivated", authorHook:"3"}
]

const AuthorData =[
    {id:"2" , name:"Ashik", age:23, hobby:"cricket", bookHook:"2"},
    {id:"1" , name:"Anick", age:24, hobby:"football", bookHook:"3"},
    {id:"3" , name:"Sunny", age:21, hobby:"table-tennis", bookHook:"1"}
]

//type schema 
const BookType = new graphql.GraphQLObjectType({
    name:'Book',
    fields:()=> ({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        authorSearch:{
            type:AuthorType,
            resolve (parent, args){
                console.log(parent)
                return _.find(AuthorData, {id:parent.authorHook})
            }

        }
    })
})

const AuthorType = new graphql.GraphQLObjectType({
    name:"Author",
    fields:()=> ({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        hobby:{type:GraphQLString},
        age:{type:GraphQLInt},
        bookSearch:{
            type:BookType,
            resolve (parent, args){

                console.log(parent);
                return _.find(booksData, {id:parent.bookHook})


            }
        }
    })
})



// type query 
const RootQuery = new graphql.GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType ,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                //code to data to from MongoDB / other sources 
                return _.find(booksData,{id:args.id});
            }
        },
        author:{
            type:AuthorType ,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                return _.find(AuthorData, {id:args.id});
            }
        }
    }
});



module.exports= new GraphQLSchema({
    query:RootQuery
})