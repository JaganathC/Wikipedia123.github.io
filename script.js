let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");

function create(result) {
    let {
        title,
        link,
        description
    } = result;
 
    let res = document.createElement("div");
    res.classList.add("result-item");
    searchResultsEl.appendChild(res);

    
    let resTitleEl = document.createElement("a");
    resTitleEl.classList.add("result-item");
    resTitleEl.textContent = title;
    resTitleEl.href = link;
    resTitleEl.target = "_blank";
    res.appendChild(resTitleEl);
    
    let titleBreak = document.createElement("br");
    res.appendChild(titleBreak);
   
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    res.appendChild(urlEl);

    
    let lineBr = document.createElement("br");
    res.appendChild(lineBr);
    
    let paraEl = document.createElement("p");
    paraEl.classList.add("line-description");
    paraEl.textContent = description;
    res.appendChild(paraEl);
}

function displayResults(searchResults) {
    for (let result of searchResults) {
        create(result);
    }
}

function search(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        let searchInp = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInp;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();

            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", search);
