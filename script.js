// Server proxy: bypass cors   
let my_cors_proxy = 'https://github.com/Jomh87/CORS:1987';  //https://programar.cloud/post/configurar-cors-en-apache-server/
// URL to be fetched: CHANGE IT
let my_url = 'https://www.bicimarket.com/es/461-mtb-29';

fetch(`${my_cors_proxy}/${my_url}`, {
        method: 'get',
        redirect: 'follow',
        headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => {
        return response.text();

    }).then(data => {
        main(data);
    })
    .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message + error);
    });

function main(data) {
    xmlDoc = parseHTML(data);
    draw(xmlDoc);        
}

function parseHTML(data) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(data, 'text/html');
    return xmlDoc;
}

function draw(xmlDoc) {
    let container = document.getElementById('container');

    let resultBike = xmlDoc.evaluate('//div[@class="product-miniature js-product-miniature pp-3"]', xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    let node = null;

    while (node = resultBike.iterateNext()) {
        let col = document.createElement('div');
        col.className = 'col';

        let divCard = document.createElement('div');
        divCard.className = 'card'; // style="width: 18rem;"

        let imgCard = document.createElement('img');
        imgCard.className = 'card-img-top';

        let resultImg = xmlDoc.evaluate('./a/img', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        let bikeImgSrc = resultImg.singleNodeValue.src;
        //imgCard.src = bikeImgSrc.replace('mtiny', 'large');
        divCard.appendChild(imgCard);

        let divCardBody = document.createElement('div');
        divCardBody.className = 'card-body';
        let divCardTitle = document.createElement('h5');
        divCardTitle.className = 'card-title';
        let resultTitleLink = xmlDoc.evaluate('./div/a/img[@alt]', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        //console.log(resultTitle);
        divCardTitle.textContent = resultTitleLink.singleNodeValue.title;
        divCardBody.appendChild(divCardTitle);

        let divCardLink = document.createElement('a');
        divCardLink.className = 'btn btn-primary';
        divCardLink.href = resultTitleLink.singleNodeValue.href;
        divCardLink.target = '_blank'
        divCardLink.textContent = 'Especificacions';
        divCardBody.appendChild(divCardLink);

        divCard.appendChild(divCardBody);

        col.appendChild(divCard);
        container.appendChild(col);
        
    }
}
