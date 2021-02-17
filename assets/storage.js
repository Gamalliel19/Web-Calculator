const CACHE_KEY = 'calculation_history';

function checkForStorage(){
    return typeof(Storage) !== 'undefined';
}

function putHistory(data){
    // memeriksa lokal storage
    if(checkForStorage()){
        let historyData = null;
        if(localStorage.getItem(CACHE_KEY) === null){
            historyData = [];
        }else{
            // JSON parse untuk mengubah nilai objek dalam bentuk string menjadi kembali pada bentuk objek javascript
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        // unshift() digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal indeks 
        historyData.unshift(data);

        if(historyData.length > 5){
            // pop digunakan untuk menghapus indeks terakhir pada array
            historyData.pop()
        }
        // JSON.Stringify() digunakan untuk mengubah objek javascript dalam bentuk string
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData))
    }
}

// Fungsi untuk mendapatkan history data dari local storage
function showHistory(){
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    }else{
        return[];
    }
}

// Fungsi untuk merender pada dokumen HTML
function renderHistory(){
    const historyData = showHistory();
    let historyList = document.querySelector('#historyList');

    // Selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
    for(let history of historyData){
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row)
    }
}

renderHistory()