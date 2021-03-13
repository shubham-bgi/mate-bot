module.exports = {
    "wrongAnswerCount" : 1,
    "quiz" : [
        {//0
            "question": "In your clan description there is mention of farming, do you guys do war farming like FWA or GWA?\nIf you don't know what it is, the awnser will be no...\nType ``yes`` or ``no``",
            "positiveAnswer": ["yes","y"],
            "negativeAnswer": ["no", "n"],
            "onWrongReply": "Not a valid option. Type either ``yes`` or ``no``."
        },
        {//1
            "question": "I see your clan only have single Townhall level, Are you guys looking for that TH level only?\nType ``yes`` or ``no``\nTownhall level: ",
            "positiveAnswer": ["yes","y"],
            "negativeAnswer": ["no", "n"],
            "onWrongReply": "Not a valid option. Type either ``yes`` or ``no``."
        },
        {//2
            "question": "What is the minimum townhall level are you guys accepting?\nType any number from ``1`` to ``13``.\nSuggested Townhall: ",
            "answer": ["1","2","3","4","5","6","7","8","9","10","11","12","13"],
            "onWrongReply": "Wrong awnser, Type a number to choose any townhall level between ``1`` to ``13``."
        },
        {//3
            "info": "",
            "question": "Are you okay with rushed players or are you looking for non-rushed only?\nOn a scale of 0 to 10, 0 being totally rushed & 10 being non rushed.Enter a value between ``0`` to ``10``.\nCurrent clan Average: ",
            "answer": ["0","10"],
            "onWrongReply": "Wrong awnser, Type a value between ``0`` and ``10``."
        },
        {//4
            "info": "On a scale of 0 to 10, 0 being newbie & 10 being maxed.",
            "question": "Since most players in your clan are maxed are you looking for max players only?\nEnter a value between ``0`` to ``10``.\nCurrent clan average: ",
            "answer": ["0","10"],
            "onWrongReply": "Wrong awnser, Type a value between ``0`` and ``10``."
        },
        {//5
            "question": "What are minimum home base trophies are you guys accepting?\nPlease type any number between ``0`` to ``5500``.",
            "answer": ["0","5500"],
            "onWrongReply": "Wrong awnser, Type a number between ``0`` to ``5500``."
        },
        {//6
            "question": "What are minimum builder base trophies are you guys accepting?\nPlease type any number between ``0`` to ``5500``",
            "answer": ["0","5500"],
            "onWrongReply": "Wrong awnser, Type a number between ``0`` to ``5500``."
        },
        {//7
            "info": "",
            "question": "Do you want player's attacks won to be greater or equal than your clan's average?\nType ``yes`` or ``no``.",
            "positiveAnswer": ["yes","y"],
            "negativeAnswer": ["no", "n"],
            "onWrongReply":"Wrong awnser, Type either ``yes`` or ``no``."
        },
        {//8
            "question": "Do you wanna filter by hero levels for each townhall level?\nType from any of these options: ``sum of heroes``, ``hero levels``or ``no``.",
            "positiveAnswer1": ["sum of heroes", "soh"],
            "positiveAnswer2": ["hero levels", "hl"],
            "negativeAnswer": ["no", "n"],
            "noHeroes": "Sorry but none of your town hall can have any hero! :/",
            "onWrongReply": "Not a valid option, Type from any of these options: ``sum of heroes``, ``hero levels`` or ``no``."
        },
        {//9
            "info": "Since lower than TH7 player don't have any heroes We are gonna skip them.",
            "question": "What is the total sum of heroes levels are you looking for townhall ",
            "answer": {
                "7": "5",
                "8": "10",
                "9": "60",
                "10": "80",
                "11": "120",
                "12": "170",
                "13": "220"
            },
            "default": [
                {
                    "townHallLevel": "7",
                    "sumOfHeroes": "-1"
                },
                {
                    "townHallLevel": "8",
                    "sumOfHeroes": "-1"
                },
                {
                    "townHallLevel": "9",
                    "sumOfHeroes": "-1"
                },
                {
                    "townHallLevel": "10",
                    "sumOfHeroes": "-1"
                },
                {
                    "townHallLevel": "11",
                    "sumOfHeroes": "-1"
                },
                {
                    "townHallLevel": "12",
                    "sumOfHeroes": "-1"
                },
                {
                    "townHallLevel": "13",
                    "sumOfHeroes": "-1"
                },
            ],
            "onWrongReply": "Not a valid sum of hero levels for that town hall level."
        },
        {//10
            "info": "Type hero levels in this format < King level/Queen level/Warden level/Royal Champ level> Example for a th12 - ``60/60/40``.",
            "question": "What are the hero levels are you looking for townhall ",
            "answer": {
                "7": ["5"],
                "8": ["10"],
                "9": ["30","30"],
                "10": ["40","40"],
                "11": ["50","50","20"],
                "12": ["65","65","40"],
                "13": ["75","75","50","20"]
            },
            "default": [
                {
                    "townHallLevel": "7",
                    "heroLevels": ["-1"]
                },
                {
                    "townHallLevel": "8",
                    "heroLevels": ["-1"]
                },
                {
                    "townHallLevel": "9",
                    "heroLevels": ["-1","-1"]
                },
                {
                    "townHallLevel": "10",
                    "heroLevels": ["-1","-1"]
                },
                {
                    "townHallLevel": "11",
                    "heroLevels": ["-1","-1","-1"]
                },
                {
                    "townHallLevel": "12",
                    "heroLevels": ["-1","-1","-1"]
                },
                {
                    "townHallLevel": "13",
                    "heroLevels": ["-1","-1","-1","-1"]
                }
            ],
            "onWrongReply": "Not valid hero levels, make sure to type hero levels like this <King level/Queen level/Warden level/Royal Champ level>."
        }, 
        {//11
            "question": "Do you want to set minimum war stars for each town hall level?\nType ``yes`` or ``no``?",
            "positiveAnswer": (message)=>{if(["yes","y"].includes(message)) return true; else return false;},
            "negativeAnswer": ["no", "n"],
            "onWrongReply": "Not a valid option. Type either ``yes`` or ``no``"
        },
        {//12
            "info": "Max acceptable war stars for any townhall level are 1500.",
            "question": "What are the minimum war stars do you want for townhall ",
            "answer": ["0", "1500"],
            "default": [
                {
                    "townHallLevel": "7",
                    "warStars": "-1"
                },
                {
                    "townHallLevel": "8",
                    "warStars": "-1"
                },
                {
                    "townHallLevel": "9",
                    "warStars": "-1"
                },
                {
                    "townHallLevel": "10",
                    "warStars": "-1"
                },
                {
                    "townHallLevel": "11",
                    "warStars": "-1"
                },
                {
                    "townHallLevel": "12",
                    "warStars": "-1"
                },
                {
                    "townHallLevel": "13",
                    "warStars": "-1"
                }
            ],
            "onWrongReply": "Not a valid number. Type any number between ``0`` and ``1500``."
        },
        {//13
            "question": "In which channel should I notify if I found someone?\n Type name of the ``#channel``, use '#' in front.",
            "onWrongReply": "Wasn't able to find that channel please make sure to type '#' before typing the name."
        },
        {//14
            "question": "Which role should I ping upon founding someone?\n Type the ``@role``, use '@' in front or ``no``.",
            "negativeAnswer": ["no", "n"],
            "onWrongReply": "Wasn't able to find that role please use '@' before typing the role."
        }
    ],
    "autoCancel": "Due to back to back invalid awnsers, i\'ma stop this.",
    "endText": "Thank you for answering, I have stored all the info, if anyone wants to join the clan, I will ping in this channel."
}