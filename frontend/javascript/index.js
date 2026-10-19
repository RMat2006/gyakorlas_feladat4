const PostMethod = async (url, data)=>{
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        if(!response.ok){
            throw new Error("POST hiba: ", response.status)
        }
        return await response.json();

    }catch(error){
        throw new Error("HIba: ", error.message);
    }
}

const GetMethod = async (url)=>{
    try{
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("GET hiba: ", response.status)
        }
        return await response.json();
    }catch(error){
        throw new Error("Hiba: ", error.message);
    }
}

document.addEventListener("DOMContentLoaded", async ()=>{

    const PostResponse = await PostMethod("/api/vote", {
        option1: "Orbán Viktor",
        option2: "Magyar Péter"
    });
    console.log(PostResponse);

    const GetResponse = await GetMethod("/api/vote");
    console.log(GetResponse)

    const form1 = document.getElementById("form1");
    const valasztas1 = document.getElementById("option1")
    valasztas1.innerText = PostResponse.option1;
    valasztas1.value = PostResponse.option1;
    const szavazat1 = document.createElement("p");
    let szavazat1Ertek = PostResponse.objektum.option1
    szavazat1.innerText = szavazat1Ertek;
    form1.appendChild(szavazat1);


    const form2 = document.getElementById("form2");
    const valasztas2 = document.getElementById("option2");
    valasztas2.value = PostResponse.option2;
    const szavazat2 = document.createElement("p");
    let szavazat2Ertek = PostResponse.objektum.option2;
    szavazat2.innerText = szavazat2Ertek;
    form2.appendChild(szavazat2);

    document.getElementById("gomb1").addEventListener("click", ()=>{
        
        szavazat1Ertek+=1;
        szavazat1.innerText = szavazat1Ertek;
    })

    document.getElementById("gomb2").addEventListener("click", ()=>{
        szavazat2Ertek+=1;
        szavazat2.innerText = szavazat2Ertek;
    })

})