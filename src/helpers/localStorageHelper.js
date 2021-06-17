export const loadState = () =>{
    try{

        const serializedData = localStorage.getItem('state')
        if (serializedData === null)
            return undefined

        return JSON.parse(serializedData)

    }catch(err){
        console.log(err.message)
        return undefined
    }
}

export const saveState = (state) =>{
    const serializedJSON = JSON.stringify(state)
    localStorage.setItem('state', serializedJSON)
}