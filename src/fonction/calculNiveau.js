export default function calculNiveau(timeDefi, timeElapsed){

    let niveau = (timeElapsed * 100) / timeDefi;


    if (niveau === 0 ) {
        niveau = 0
    }

    else if(niveau <= 10){
        niveau = 10
    }

    else if(niveau <= 20){
        niveau = 20
    }

    else if(niveau <= 30){
        niveau = 30
    }

    else if(niveau <= 40){
        niveau = 40
    }

    else if (niveau <= 50){
        niveau = 50
    }

    else if(niveau <= 60){
        niveau = 60
    }

    else if(niveau <= 70){
        niveau = 70
    }

    else if(niveau <= 80){
        niveau = 80
    }

    else if(niveau <= 90){
        niveau = 90
    }

    else {
        niveau = 100
    }

    return niveau
}

