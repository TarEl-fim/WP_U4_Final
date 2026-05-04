

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
                row.appendChild(tile);
            }
            board.appendChild(row);
        }
        return board
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