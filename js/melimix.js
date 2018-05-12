$(document).ready(function(){
    
    $(start).click(function(){
        /*
         * On mélange les dés
         */
        function generateLetters() {
            // On supprime les dés existants
            $(".letters").empty();
            
            // On simule les 16 dés du jeu
            var dices = [
                ["E", "T", "U", "K", "N", "O"],
                ["E", "V", "G", "T", "I", "N"],
                ["D", "E", "C", "A", "M", "P"],
                ["I", "E", "L", "R", "U", "W"],
                ["E", "H", "I", "F", "S", "E"],
                ["R", "E", "C", "A", "L", "S"],
                ["E", "N", "T", "D", "O", "S"],
                ["O", "F", "X", "R", "I", "A"],
                ["N", "A", "V", "E", "D", "Z"],
                ["E", "I", "O", "A", "T", "A"],
                ["G", "L", "E", "N", "Y", "U"],
                ["B", "M", "A", "Q", "J", "O"],
                ["T", "L", "I", "B", "R", "A"],
                ["S", "P", "U", "L", "T", "E"],
                ["A", "I", "M", "S", "O", "R"],
                ["E", "N", "H", "R", "I", "S"]
            ];
            
            //Tableau dans lequel nous allons stocker les 16 lettres pour jouer
            var generatedLetters = [];
            
            // On génère les 16 lettres pour jouer
            for (var i = 0; i <= 15; i++ ) {
                // On sélectionne un chiffre entre 0 et 25
                var randomNumber = Math.floor(Math.random() * 5 + 1);
                // On sélectionne la lettre de chaque dé correspondant au chiffre généré aléatoirement
                generatedLetters.push(dices[i][randomNumber]);
            }
            
            return generatedLetters;
        }
        
        generatedLetters = generateLetters();
        for (var i = 0, c = generatedLetters.length; i < c; i++) {
            var div = "<div class='letter'><span>" + generatedLetters[i] + "</span></div>";
            $(".letters").append(div);
        }
        
        /*
         * On lance le timer
         */
        // Initialisation des élements
        var timerContainer = ".timer";
        var start = "#start";
        var remainingTimeContainer = "#remaining_time";
        var end = "#end";
        var bip = document.querySelector("#bip");
        var gong = document.querySelector("#gong");
        
        // On règle le temps par défaut
        var time = 120;
        
        // On masque le bouton « Jouer » et le message « Partie Terminée ! »
        $(this).hide();
        $(end).hide();
        
        // On affiche le timer et le temps restant
        $(timerContainer).show();
        $(remainingTimeContainer).show();
        
        // On calcule le temps restant
        function timer() {
            var remainingMinutes = time / 60;
            remainingMinutes = Math.floor(remainingMinutes);
            var remainingSecondes = time % 60;
            
            // Formatage du temps
            if (remainingSecondes < 10) {
                remainingSecondes = "0" + remainingSecondes;
            }
            
            var remainingTime = remainingMinutes + ":" + remainingSecondes;
            
            // Actions du timer
            if (time > 10) {
                $(remainingTimeContainer).html(remainingTime);
            } else if (time <= 10 && time > 0) {
                bip.play();
                $(remainingTimeContainer).html(remainingTime);
                $(".timer > p").css("color", "#e74c3c");
            } else if(time == 0) {
                gong.play();
                $(remainingTimeContainer).hide();
                $(".timer > p").css("color", "#999999");
                $(end).show();
                $(start).show();
            }
            
            // On enlève une seconde
            time--;
        }
        
        if (time > 0) {
            // On répète la fonction qui calcule le temps restant chaque seconde
            setInterval(timer,1000);
        }
    });
});