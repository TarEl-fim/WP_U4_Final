var images = ['brownies','chicken_nuggets','energy_drink_powder','little_bites','mints','soda','buy'];

function randImage(imgList){
    let numb = Math.random().toFixed(2);
    console.log(numb)
    if(numb <= .16){
        imageClass = imgList[0];
    }else if(numb <= .32){
        imageClass = imgList[1];
    }else if(numb <= .48){
        imageClass = imgList[2];
    }else if(numb <= .64){
        imageClass = imgList[3];
    }else if(numb <= .80){
        imageClass = imgList[4];
    }else if(numb <= .95){
        imageClass = imgList[5];
    }else if(.96 <= numb){
        imageClass = imgList[6];
    }


    return imageClass
}

class Ticket{
    constructor(type){
        this.type = type;
        this.board = this.genBoard();
        this.ticket = this.createTicket();
    }
    genBoard(){
        const board = document.createElement('div');
        board.id = 'board';
        for(let h=0;h<4;h++){
            const row = document.createElement('div');
            row.className = 'invisi';
            for(let w=0;w<6;w++){

                const tile = document.createElement('div')
                tile.className = 'tile';

                const [topLayer, reveal] = this.genScratcher(tile);
                
                tile.appendChild(topLayer);

                
                tile.appendChild(reveal);

                row.appendChild(tile);
            }
            board.appendChild(row);
        }
        return board
    }

    genScratcher(tile){
        
        const topLayer = document.createElement('canvas');

        let imageReveal = randImage(images);

        

        const reveal = document.createElement('div')
        reveal.className = 'reveal';
        const randNum = (Math.random()*100).toFixed();
        reveal.textContent = '$'+randNum;
        reveal.style.backgroundImage = `url('resources/index/${imageReveal}.png')`

        topLayer.width = 80;
        topLayer.height = 80;

        topLayer.className = 'scratch'

        const ctx = topLayer.getContext("2d");

        const gradient = ctx.createLinearGradient(
            0,
            0,
            topLayer.width,
            topLayer.height
        );
        
        //https://webdesign.tutsplus.com/how-to-create-a-scratch-card-effect-in-vanilla-javascript--cms-108922t

        gradient.addColorStop(0, "#1e246f");
        gradient.addColorStop(1, "#5861e3");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, topLayer.width, topLayer.height);

        var isDrawing = false;

        tile.addEventListener('click', (e) =>{


            topLayer.addEventListener("mousemove", (e) => {
                isDrawing = true;
                scratch(e)

            })

            setTimeout(() => {
            console.log('after2sec');
            console.log(imageReveal);
            if (imageReveal == 'buy'){
                console.log(tile.classList);
                if(!tile.classList.contains('used')){
                    this.addValue(randNum);
                    tile.classList.add('used');
                }
            }
            }, 2000);

        });
        topLayer.addEventListener("touchstart", (e) => {
            isDrawing = true;
            scratch(e.touches[0]);
        });
        topLayer.addEventListener("touchmove", (e) => {
            if (isDrawing) {
            scratch(e.touches[0]);
            }
        });

        function scratch(e) {
            const rect = topLayer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2, false);
            ctx.fill();
        }

        return [topLayer,reveal]
    }

    createTicket(){
        const ticket = document.createElement('div');
        ticket.id = 'scratcher';
        const desc = document.createElement('div');
        desc.id = 'desc';
        desc.innerHTML = 
        `<h2>Git a Scratcher!!<h2>
        <br>
        <p>Click and Scratch!<p>
        <p>Reveal<p>
        <img src='resources/index/buy.png' alt='Win Coin'>
        <p>To win the prize shown!<p>
        <p>Current Ticket Value: <p  id='value'>0</p></p>`
        
        ticket.appendChild(this.board);
        ticket.appendChild(desc);

        console.log(ticket)

        return ticket
    }

    addValue(numb){
        const tickValue = document.getElementById('value');
        const totalVal = document.getElementById('total');
        let numVal = Number(tickValue.textContent);
        let totVal = Number(totalVal.textContent);
        console.log(numVal)
        let newVal = numVal+Number(numb);
        
        let newtotVal = totVal+Number(numb);
        console.log(newVal)
        tickValue.textContent = `${newVal}`;
    
        totalVal.textContent = `${newtotVal}`;
    }
}

function newTicket(){
    const body = document.getElementsByTagName('body')[0];
    var poor = false;

    if (PlayedBefore){
        const oldTick = document.getElementById('scratcher');
        body.removeChild(oldTick);
        var totalVal = document.getElementById('total');
        var totVal = Number(totalVal.textContent);
        if (totVal<10){
            poor = true
        }
    }

    if (poor){
        const loserDiv = document.createElement('h5');
        loserDiv.textContent = "HAHA YOU'RE POOR!!!";
        body.appendChild(loserDiv);

    }else{

        var lotto = new Ticket('blank');
        var totalVal = document.getElementById('total');
        var totVal = Number(totalVal.textContent);
        body.appendChild(lotto.ticket);

        let newValue = totVal-10;

        const newHead = document.createElement('h5');
        newHead.id = 'total';
        newHead.textContent = newValue;
        totalVal.replaceWith(newHead);
    }
}

newTicket();
var PlayedBefore = true;