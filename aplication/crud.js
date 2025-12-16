
const url = 'http://localhost:3000'

export async function get(name,lang) {
    try {
    const res = await fetch(`${url}/greet?name=${name}&lang=${lang}`)
    const data = await res.json();
    console.log(data.result);
    } catch (error) {
        console.log(error);   
    }
}


export async function post(numbers){
    let splitNum = numbers.split('')
    const obj = {numbers:splitNum};
    try {
    const res = await fetch(`${url}/math/average`,{
        method : "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(obj)
    })
    const data = await res.json();
    console.log(data.result.average);
} catch (err){
    console.log(err);
    
}
    
}


export async function put(word) {
    try{
    const res = await fetch(`${url}/shout/${word}`,{
        method : 'PUT',
        body : JSON.stringify(word)
    })
    const data = await res.json();
    console.log(data.result)
    } catch (err) {
        console.log(err)
    }
}

export async function del(rol) {
    try{
        const res = await fetch(`${url}/secure/resource`,{
            method : 'DELETE',
            headers:  {
            'Content-Type': 'application/json', 
            'x-role': rol
            }
        })
        const data = await res.json();
        console.log(data);
        
    } catch(err){
        console.log(err);
        
    }
}

export function callAll(name,lang,numbers,word,rol) {
    get(name,lang)
    .then(()=> post(numbers))
    .then(()=> put(word))
    .then (()=> del(rol))
    .then(()=> console.log("finish all CRUD")
    );
} 


export function callAllP(name,lang,numbers,word,rol){
    Promise.all([get(name,lang), post(numbers), put(word), del(rol)])
    console.log("finish all");
    
}

callAllP("yossi", 'he', '12345', 'medina', 'admin')


