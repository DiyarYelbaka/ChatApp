export default function(data){
   return Object.keys(data).map(key=> {
        return{
            id:key,
            ...data[key],
        }
    })
    .sort(function(a,b){
        return a.date > a.date ? -1 : a.data > b.date ? 1 : 0;
    })
}