var images = ['brownies','chicken_nuggets','energy_drink_powder','little_bites','mints','soda','buy'];

function randImage(imgList){
    let numb = Math.random().toFixed(2);
    console.log(numb)
    if(numb <= .16){
        imageClass = imgList[0];
    }else if(.17 <= numb <= .32){
        imageClass = imgList[1];
    }else if(.33 <= numb <= .48){
        imageClass = imgList[2];
    }else if(.49 <= numb <= .64){
        imageClass = imgList[3];
    }else if(.65 <= numb <= .80){
        imageClass = imgList[4];
    }else if(.81 <= numb <= .95){
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

                const reveal = document.createElement('div')
                reveal.className = 'reveal';

                const topLayer = this.genScratcher(tile);
                
                tile.appendChild(topLayer);
                
                tile.appendChild(reveal);

                tile.classList.add(randImage(images));
                row.appendChild(tile);
            }
            board.appendChild(row);
        }
        return board
    }

    genScratcher(tile){
        const topLayer = document.createElement('canvas');

        topLayer.width = tile.offsetWidth;
        topLayer.height = tile.offsetHeight;

        topLayer.className = 'scratch'

        const ctx = topLayer.getContext("2d");

        const gradient = ctx.createLinearGradient(
            0,
            0,
            topLayer.width,
            topLayer.height
        );
        
        //https://webdesign.tutsplus.com/how-to-create-a-scratch-card-effect-in-vanilla-javascript--cms-108922t

        gradient.addColorStop(0, "#240e9e");
        gradient.addColorStop(1, "#3281e7");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, topLayer.width, topLayer.height);

        let isDrawing = false;

        topLayer.addEventListener("mousemove", (e) => {
            isDrawing = true;
            scratch(e)
        });
        topLayer.addEventListener("touchstart", (e) => {
            isDrawing = true;
        });
        topLayer.addEventListener("touchmove", (e) => {

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

        return topLayer
    }

    createTicket(){
        const ticket = document.createElement('div');
        ticket.id = 'scratcher';
        const desc = document.createElement('div');
        desc.id = 'desc';
        
        ticket.appendChild(this.board);
        ticket.appendChild(desc);

        console.log(ticket)

        return ticket
    }
}

function newTicket(){
    const body = document.getElementsByTagName('body')[0];

    var lotto = new Ticket('blank');
    body.appendChild(lotto.ticket);
}

newTicket();