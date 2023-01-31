export default function(data){
   return Object.keys(data).map(key=> {
        return{
            id:key,
            ...data[key],
        }
    })
    .sort((a, b) =>{ return   new Date(b.date) - new Date(a.date)}
    );

}