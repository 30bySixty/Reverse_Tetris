//BEGIN SETUP OF GAME BOARD & SCORING
var start = 0;
var width = 10;
var height = 15;
var num = 15;
var rowScore = 0;
var createboard = function() {
    var i = 0;
    var j = 0;
    for (i=start; i<num; i++) {
        $('.board').prepend('<div class="rowT" id="'+i+'"></div>');
        for (j=0; j<width; j++) {
            $('.board').children("#"+i).append('<div id="'+j+'"></div>');
        };
    }
    orderrows();
}
function orderrows() {
    var i = 0;
    $('.board').children().each(function() {
        //get id of each child & replace id with value of i
        $(this).attr("id", i);
        i +=1;
    });
    $('.board').children().children().css("border-top", "1px solid lightslategray");
    $('.board').children('#1').children().css("border-top", "2px solid red");
};
//END SETUP OF GAME BOARD & SCORING

//BEGIN LOGIC FOR PLACING BLOCKS
//DETERMINE PIECE LOGIC BASED ON COLUMN OFFSET OF BLOCK COMPONENTS VS INITIAL BLOCK COMPONENT POSITION
var $pieces = [];
var blockClass;
var blocks = [];
var block;
function myFunction(piece) {
    $pieces.push(piece);
    var choose = piece.id 
    switch (choose) {
        //Shape "|"
        case "A":
            piece = "A";
            blockClass = "A";
            blocks = [[[0,0], [1,0], [2,0], [3,0]], [[0,0], [0,1], [0,2], [0,3]]];
            for (i=0; i<blocks.length; i++) {
                block = blocks[i];
                if (i==0) {
                    pieceLogic(3, 0, 0, 0, 0);
                } else {
                    pieceLogic(0, 0, 0, 0, 1);
                };
            };
            chooseSolution();
            break;
        //Shape "T"
        case "B":
            piece = "B";
            blockClass = "B";
            blocks = [[[0,0], [1,0], [1,1], [2,0]], [[0,0], [0,1], [0,2], [1,1], [1,0]], [[0,0], [0,1], [-1,1], [1,1], [-1,0], [1,0]], [[0,0], [0,1], [0,2], [-1,1], [-1,0]]];
            for (i=0; i<blocks.length; i++) {
                block = blocks[i];
                if (i==0) {
                    pieceLogic(2, 0, 1, 1, 0);
                } else if (i==1) {
                    pieceLogic(0, 0, 1, 0, 1, 1, 2);
                } else if (i==2) {
                    pieceLogic(0, 0, 1, -1, 2);//CHANGED to -1 FROM 1~~
                } else {
                    pieceLogic(0, 0, 0, -1, 3, 2, 2);
                };
            };
            chooseSolution();
            break;
        //Shape "Square"
        case "C":
            piece = "C";
            blockClass = "C";
            blocks = [[[0,0], [1,0], [0,1], [1,1]]];
            block = blocks[0];
            pieceLogic(1, 0, 1, 0, 0);
            chooseSolution();
            break;
        //Shape "S"
        case "D":
            piece = "D";
            blockClass = "D";
            blocks = [[[-1,1], [0,1], [0,0], [1,0], [-1,0]], [[0,0], [0,1], [1,1], [1,2], [1,0]]];
            for (i=0; i<blocks.length; i++) {
                block = blocks[i];
                if (i==0) {
                    pieceLogic(1, 0, 0, -1, 0);
                } else {
                    pieceLogic(0, 0, 1, 0, 1, 2, 2);
                };
            };
            chooseSolution();
            break;
        //Shape "L"
        case "E":
            piece = "E";
            blockClass = "E";
            blocks = [[[0,0], [0,1], [1,0], [2,0]], [[0,0], [0,1], [0,2], [1,2], [1,0], [1,1]], [[0,0], [0,1], [-1,1], [-2,1], [-1,0], [-2,0]], [[0,0], [1,0], [1,1], [1,2]]];
            for (i=0; i<blocks.length; i++) {
                block = blocks[i];
                if (i==0) {
                    pieceLogic(2, 0, 0, 0, 0);
                } else if (i==1) {
                    pieceLogic(0, 0, 1, 0, 1, 1, 1);
                } else if (i==2) {
                    pieceLogic(0, 0, 0, -2, 2);//CHANGED TO -2 from 2~~~
                } else {
                    pieceLogic(1, 0, 1, 1, 3);
                };
            };
            chooseSolution();
            break;
    };
};

//DETERMINE SCORE OF ROTATED PIECES BASED ON HOW MANY EDGES ARE TOUCHING SOMETHING ELSE
var solutions = [];
function pieceLogic(A, B, C, D, E, F, G) {//E for rotation, F-G for unique cases
    var i = 0;
    var j = 0;
    var colOffset = 0;
    var rowOffset = 0;
    var minColOff = 0;
    var initialpositions = [];
    var checkpos = [];
    var indices = [];
    var colOffsets = [];
    findrows();
    //get minimum colOffset
    for (i=0; i<4; i++) {
        colOffset = block[i][0];
        colOffsets.push(colOffset);
    };
    minColOff = Math.min.apply(Math, colOffsets);
    for (j=0; j<rows.length; j++) {
        var id = this.id
    //create array of potential initial positions
    $('.board').children('#'+rows[j]).children().each( function() {
        if (!($(this).hasClass("1"))) {
        if (Math.round($(this).attr('id'))+minColOff >= 0) {
            checkpos = [];
            score = 0;
            for (i=0; i<4; i++) {//4 hard coded b/c every piece has 4 components
                colOffset = block[i][0];
                rowOffset = block[i][1];
                if (!($('.board').children('#'+(rows[j]-rowOffset)).children('#'+(Math.round($(this).attr('id'))+colOffset)).hasClass("1"))) {
                    //if attr id is less than max col id
                    if (Math.round($(this).attr('id'))+ colOffset <= width-1) {
                        checkpos.push("true");
                        if (rowOffset == 0) {
                            checkBottom((rows[j]+1), (Math.round($(this).attr('id')) + colOffset));
                            if (colOffset == A) {
                                checkRight(rows[j], (Math.round($(this).attr('id')) + colOffset + 1));
                            };
                            if (colOffset == B) {
                                checkLeft(rows[j],(Math.round($(this).attr('id')) + colOffset - 1));
                            };
                        } else {
                            if (colOffset == C) {
                                checkRight((rows[j]-rowOffset), (Math.round($(this).attr('id')) + colOffset + 1));
                                if (F == 2) {
                                    if (rowOffset == G) {
                                        checkLeft((rows[j]-rowOffset),(Math.round($(this).attr('id')) + colOffset - 1));
                                    };
                                };
                            };
                            if (colOffset == D) {
                                checkLeft((rows[j]-rowOffset),(Math.round($(this).attr('id')) + colOffset - 1));
                                if (F == 1) {
                                    if (rowOffset == G) {
                                        checkRight((rows[j]-rowOffset), (Math.round($(this).attr('id')) + colOffset + 1));
                                    };
                                };
                            };
                        }
                    };
                    if (checkpos.length == 4) {
                        score += rows[j];
                        initialpositions.push([rows[j],  Math.round($(this).attr('id')), score, E]);
                    };
                };
            };
        };
        };
    });
    };
    if (block.length > 4) {//subtract from score if position leaves empty block
        for (i=0; i<initialpositions.length; i++) {
            if (initialpositions[i][3] == E) {
                for (j=4; j<block.length; j++) {
                    colOffset = block[j][0];
                    rowOffset = block[j][1];
                    if (!($('.board').children('#'+Math.round(initialpositions[i][0]-rowOffset)).children('#'+Math.round(initialpositions[i][1]+colOffset)).hasClass("1"))) {
                        initialpositions[i][2] -= 1;
                    } else {
                        initialpositions[i][2] += 1;
                    };
                };
            };
        }; 
    };
    //prep to run chooseSolution()
    for (i=0; i<initialpositions.length; i++) {
        indices.push(initialpositions[i][2]);
    };
    for (i=0; i<initialpositions.length; i++) {
        if (initialpositions[i][2] == Math.max.apply(Math, indices)) {
            solutions.push(initialpositions[i]);
        };
    };
}; 

//FIND HIGHEST ROW# THAT DOES NOT CONTAIN DIVs WITH CLASSES
var rows = [];
function findrows() {
    var i;
    var divs = [];
    for (i=0; i<height; i++) {
        $('.board').children("#"+i).children().each(function() {
            if ($(this).hasClass("1")) {
                divs.push("true");
            };
        });
        if (divs.length>0) {
            rows.push(i);
            rows.push(i-1);
        } else {
            rows.push((height-1));
        };
    }
    rows = $.unique(rows);
    return rows;
};

//ADD TO SCORE OF VARIOUS INITIAL POSITIONS WHEN BLOCK COMPONENT EDGES TOUCH SOMETHING ELSE
var score;
function checkBottom(X, Y) {
    //~~~THINK HERE CAN IMPROVE ALGO BY ADDING LOOP TO CHECK ALL OTHER ROWS
    if (X > height-1) {
        score += 1;
    } else {
        if ($('.board').children('#'+X).children('#' +Y).hasClass("1")) {
            score +=1;
        } else {
            score -=1;
        };
    };
    return score;
}
function checkRight(X, Y) {
    //if next div is border, add 1
    //else check if div in that position in next col has class "1", if so add 1
    if (Y > width-1) {
        score +=1;
    } else {
        if( $('.board').children('#'+X).children('#'+Y).hasClass("1")) {
            score +=1;
        }
    }
    return score;
}
function checkLeft(X, Y) {
    //else check if div in that position in prev col has class "1", if so add 1
//    console.log("checkLeft") 
//    console.log(X+","+Y);
    if (Y < 0) {
        score +=1;
    } else {
        if( $('.board').children('#'+X).children('#'+Y).hasClass("1")) {
            score +=1;
        }
    }
    return score;
}

//CHOOSE OPTIMAL BLOCK INITIAL POSITION
function chooseSolution() {
    var indices = [];
    var solutions2 = [];
    //get max solution values
    for (i=0; i<solutions.length; i++) {
        indices.push(solutions[i][2]);
    };
    for (i=0; i<solutions.length; i++) {
        if (solutions[i][2] == Math.max.apply(Math, indices)) {
            solutions2.push(solutions[i]);
        };
    };
    for (i=0; i<solutions2.length; i++) {
    };
//    console.log(solutions2);
    //if solutions2 are greater than 1, choose just 1 array at random
    if (solutions2.length > 1) {
        solutions2 = solutions2[Math.round(Math.random() * (solutions2.length - 1))];
        piecestart(solutions2[0],solutions2[1], solutions2[3]);
    } else {
        piecestart(solutions2[0][0],solutions2[0][1], solutions2[0][3]);
    };
    solutions= [];
};

//PLACE THE SOLUTION PIECE ON THE BOARD
var gameOver;
function piecestart(rowi, columnj, permutation) {
    var i = 0;
    var colOffset = 0;
    var rowOffset = 0;
    var findrow = 0;
    var findcol = 0;  
    var chooseBlock = [];
    if (!(gameOver > 0)) {
        switch (permutation) {
            case 0:
                chooseBlock = blocks[0];
                break;
            case 1:
                chooseBlock = blocks[1];
                break;
            case 2:
                chooseBlock = blocks[2];
                break;
            case 3:
                chooseBlock = blocks[3];
                break;
        };
       for (i=0; i<4; i++) {
           colOffset = chooseBlock[i][0];
           rowOffset = chooseBlock[i][1];
           findrow = rowi - rowOffset;
           findcol = columnj + colOffset;
           $('.board').children('#'+findrow).children('#'+findcol).addClass(blockClass).addClass("1");
       };
        setTimeout(function() {clearrow(); }, 250);
    
        //CHECK IF GAME OVER
        var divs = [];
        $('.board').children("#"+0).children().each(function() {
            if ($(this).hasClass("1")) {
                divs.push("true");
            };
        });
        if (divs.length>0) {
            gameOver = 1;
            $(".notice3").remove();
            $("#notes").append('<div class="gameover">Game Over! You Win! Final Score: '+rowScore+'</div>');
        };
    };
}
//END LOGIC FOR PLACING BLOCKS

//REMOVE ANY COMPLETE ROWS FROM THE BOARD
function clearrow() {
    var clearRows = [];
    var i;
    var divs = [];
   for (i=0; i<height; i++) {
        $('.board').children("#"+i).children().each(function() {
            if ($(this).hasClass("1")) {
                divs.push("true");
            };
            if (divs.length==width) {
            clearRows.push(i);
        };
        });
       divs = [];
   };
    clearRows = $.unique(clearRows);
    i = 0;
    if (clearRows.length > 0) {
    for (i=0; i<clearRows.length; i++) {
        var takeOut = $('.board').children("#"+clearRows[i]);
        takeOut.remove();
        $('.board').children("#"+clearRows[i]).remove($(this));
    };
    start = num;
    num += clearRows.length;
    logscore(clearRows.length);
    createboard();
    };
};

//ADD NUMBER OF CLEARED ROWS TO TOTAL USER SCORE
function logscore(X) {
    rowScore += X;
    $(".notice3").remove();
    if (rowScore > 0) {
        $("#notes").append('<div class="notice3">Number of rows cleared: '+rowScore+'</div>');
    };
};

$(document).ready(createboard);
$(document).on('page:load', createboard);
//STEPS TO IMPROVE ALGO FUNCTIONALITY
//Add loop to checkBottom
//Subtracts (a lot) from score for triggering "game over"
//Prohibit ability to place blocks below existing blocks

//THINGS I DON'T NEED ANYMORE: 1. app/models/input.rb (where prev. validators & error message was written); 2. controllers/inputs_controller (where flash notices were written, and form was told to reset or not), 3. views/inputs/create.js.erb (where prev. notices were removed, error & success messages were displayed, pieces array was displayed, and form was reset if needed 
//NOTE: Pressing "enter" when entering input submits the form, which gives it an action of "post". However, it's not possible to make an actionless form with Rails form helpers. Thus, need to replace form_for tag with plain HTML form tags and ignore the action.