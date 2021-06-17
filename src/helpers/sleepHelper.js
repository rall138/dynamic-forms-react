
/*

    sleep(3500).then(res => {
        // do somthing
    })

*/

export const sleep = (ms) =>{
    return new Promise(resolve => setTimeout(resolve, ms))
}